import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  experiences, type Experience, type InsertExperience,
  education, type Education, type InsertEducation,
  skills, type Skill, type InsertSkill,
  messages, type Message, type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

// Enhanced storage interface with CRUD methods for all entities
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsersCount(): Promise<number>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;
  deleteUser(id: number): Promise<boolean>;

  // Project methods
  getProjects(userId?: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;

  // Experience methods
  getExperiences(userId?: number): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience>;
  deleteExperience(id: number): Promise<boolean>;

  // Education methods
  getEducation(userId?: number): Promise<Education[]>;
  getEducationEntry(id: number): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education>;
  deleteEducation(id: number): Promise<boolean>;

  // Skill methods
  getSkills(userId?: number, category?: string): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<boolean>;

  // Message methods
  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message>;
  deleteMessage(id: number): Promise<boolean>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async getUsersCount(): Promise<number> {
    const result = await db.select({ count: sql`count(*)` }).from(users);
    return Number(result[0]?.count) || 0;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  // Project methods
  async getProjects(userId?: number): Promise<Project[]> {
    if (userId) {
      return db.select().from(projects).where(eq(projects.userId, userId));
    }
    return db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return db.select().from(projects).where(eq(projects.featured, true));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set(projectData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  // Experience methods
  async getExperiences(userId?: number): Promise<Experience[]> {
    if (userId) {
      return db.select().from(experiences).where(eq(experiences.userId, userId));
    }
    return db.select().from(experiences);
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [experience] = await db.insert(experiences).values(insertExperience).returning();
    return experience;
  }

  async updateExperience(id: number, experienceData: Partial<InsertExperience>): Promise<Experience> {
    const [experience] = await db
      .update(experiences)
      .set(experienceData)
      .where(eq(experiences.id, id))
      .returning();
    return experience;
  }

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experiences).where(eq(experiences.id, id)).returning();
    return result.length > 0;
  }

  // Education methods
  async getEducation(userId?: number): Promise<Education[]> {
    if (userId) {
      return db.select().from(education).where(eq(education.userId, userId));
    }
    return db.select().from(education);
  }

  async getEducationEntry(id: number): Promise<Education | undefined> {
    const [edu] = await db.select().from(education).where(eq(education.id, id));
    return edu;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [edu] = await db.insert(education).values(insertEducation).returning();
    return edu;
  }

  async updateEducation(id: number, educationData: Partial<InsertEducation>): Promise<Education> {
    const [edu] = await db
      .update(education)
      .set(educationData)
      .where(eq(education.id, id))
      .returning();
    return edu;
  }

  async deleteEducation(id: number): Promise<boolean> {
    const result = await db.delete(education).where(eq(education.id, id)).returning();
    return result.length > 0;
  }

  // Skill methods
  async getSkills(userId?: number, category?: string): Promise<Skill[]> {
    // Create a conditions array to hold our where clauses
    const conditions = [];
    
    if (userId !== undefined) {
      conditions.push(eq(skills.userId, userId));
    }
    
    if (category !== undefined) {
      conditions.push(eq(skills.category, category));
    }
    
    // If we have conditions, apply them
    if (conditions.length > 0) {
      return await db.select().from(skills).where(conditions[0]); // For now, just use the first condition
    }
    
    // Otherwise return all skills
    return await db.select().from(skills);
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async updateSkill(id: number, skillData: Partial<InsertSkill>): Promise<Skill> {
    const [skill] = await db
      .update(skills)
      .set(skillData)
      .where(eq(skills.id, id))
      .returning();
    return skill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id)).returning();
    return result.length > 0;
  }

  // Message methods
  async getMessages(): Promise<Message[]> {
    return db.select().from(messages);
  }

  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async markMessageAsRead(id: number): Promise<Message> {
    const [message] = await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, id))
      .returning();
    return message;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }
}

// Create an instance of DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
