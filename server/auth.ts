import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { Pool, neonConfig } from '@neondatabase/serverless';
import connectPg from "connect-pg-simple";
import { db } from "./db";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

const PostgresSessionStore = connectPg(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const sessionStore = new PostgresSessionStore({ pool, createTableIfMissing: true });

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  // @ts-ignore
  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(403).json({ success: false, message: 'You must be an admin to access this resource' });
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'portfolio-session-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }

      const hashedPassword = await hashPassword(req.body.password);
      
      // Create user data from request
      const userData = {
        ...req.body,
        password: hashedPassword,
      };

      // For testing: Set isAdmin explicitly if it's part of the request
      // Otherwise, make the first user an admin
      if (req.body.isAdmin !== undefined) {
        userData.isAdmin = Boolean(req.body.isAdmin);
      } else {
        const usersCount = await storage.getUsersCount();
        if (usersCount === 0) {
          userData.isAdmin = true;
        }
      }

      console.log("Creating user with data:", { ...userData, password: "[REDACTED]" });
      const user = await storage.createUser(userData);
      console.log("User created:", { ...user, password: "[REDACTED]" });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({ success: true, user });
      });
    } catch (error) {
      console.error("Error registering user:", error);
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error, user: Express.User) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
      
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ success: true, user });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ success: true, message: "Logged out successfully" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    res.json({ success: true, user: req.user });
  });
}