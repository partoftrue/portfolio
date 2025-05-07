import { Request, Response, NextFunction, type Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { setupAuth, isAdmin } from "./auth";
import { 
  insertMessageSchema, 
  insertProjectSchema,
  insertExperienceSchema,
  insertEducationSchema,
  insertSkillSchema
} from "@shared/schema";

// Error handler
const handleError = (error: Error, res: Response) => {
  console.error('API Error:', error);
  return res.status(500).json({ 
    success: false, 
    message: 'Internal server error'
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  // ----- Contact Form API Routes -----
  
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate input using Zod schema
      const messageData = insertMessageSchema.parse(req.body);
      
      // Store the message in the database
      const savedMessage = await storage.createMessage(messageData);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received successfully',
        data: savedMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      return handleError(error as Error, res);
    }
  });

  app.get('/api/messages', isAdmin, async (req, res) => {
    try {
      const messages = await storage.getMessages();
      return res.status(200).json({ success: true, data: messages });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.get('/api/messages/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.getMessage(id);
      
      if (!message) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      
      return res.status(200).json({ success: true, data: message });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.patch('/api/messages/:id/read', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.markMessageAsRead(id);
      
      if (!message) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      
      return res.status(200).json({ success: true, data: message });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  // ----- Portfolio Project API Routes -----
  
  app.get('/api/projects', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const projects = await storage.getProjects(userId);
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.get('/api/projects/featured', async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.post('/api/projects', isAdmin, async (req, res) => {
    try {
      // Validate input using Zod schema
      const projectData = insertProjectSchema.parse(req.body);
      
      // Store the project in the database
      const savedProject = await storage.createProject(projectData);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Project created successfully',
        data: savedProject
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      return handleError(error as Error, res);
    }
  });

  app.patch('/api/projects/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Update the project in the database
      const updatedProject = await storage.updateProject(id, req.body);
      
      if (!updatedProject) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Project updated successfully',
        data: updatedProject
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.delete('/api/projects/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Project deleted successfully'
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  // ----- Experience API Routes -----
  
  app.get('/api/experiences', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const experiences = await storage.getExperiences(userId);
      return res.status(200).json({ success: true, data: experiences });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.get('/api/experiences/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getExperience(id);
      
      if (!experience) {
        return res.status(404).json({ success: false, message: 'Experience not found' });
      }
      
      return res.status(200).json({ success: true, data: experience });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.post('/api/experiences', isAdmin, async (req, res) => {
    try {
      // Validate input using Zod schema
      const experienceData = insertExperienceSchema.parse(req.body);
      
      // Store the experience in the database
      const savedExperience = await storage.createExperience(experienceData);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Experience created successfully',
        data: savedExperience
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      return handleError(error as Error, res);
    }
  });

  app.patch('/api/experiences/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Update the experience in the database
      const updatedExperience = await storage.updateExperience(id, req.body);
      
      if (!updatedExperience) {
        return res.status(404).json({ success: false, message: 'Experience not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Experience updated successfully',
        data: updatedExperience
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.delete('/api/experiences/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteExperience(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Experience not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Experience deleted successfully'
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  // ----- Education API Routes -----
  
  app.get('/api/education', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const educationList = await storage.getEducation(userId);
      return res.status(200).json({ success: true, data: educationList });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.get('/api/education/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const education = await storage.getEducationEntry(id);
      
      if (!education) {
        return res.status(404).json({ success: false, message: 'Education entry not found' });
      }
      
      return res.status(200).json({ success: true, data: education });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.post('/api/education', isAdmin, async (req, res) => {
    try {
      // Validate input using Zod schema
      const educationData = insertEducationSchema.parse(req.body);
      
      // Store the education in the database
      const savedEducation = await storage.createEducation(educationData);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Education entry created successfully',
        data: savedEducation
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      return handleError(error as Error, res);
    }
  });

  app.patch('/api/education/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Update the education in the database
      const updatedEducation = await storage.updateEducation(id, req.body);
      
      if (!updatedEducation) {
        return res.status(404).json({ success: false, message: 'Education entry not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Education entry updated successfully',
        data: updatedEducation
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.delete('/api/education/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteEducation(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Education entry not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Education entry deleted successfully'
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  // ----- Skills API Routes -----
  
  app.get('/api/skills', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const category = req.query.category as string | undefined;
      
      const skills = await storage.getSkills(userId, category);
      return res.status(200).json({ success: true, data: skills });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.get('/api/skills/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const skill = await storage.getSkill(id);
      
      if (!skill) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }
      
      return res.status(200).json({ success: true, data: skill });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.post('/api/skills', isAdmin, async (req, res) => {
    try {
      // Validate input using Zod schema
      const skillData = insertSkillSchema.parse(req.body);
      
      // Store the skill in the database
      const savedSkill = await storage.createSkill(skillData);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Skill created successfully',
        data: savedSkill
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      return handleError(error as Error, res);
    }
  });

  app.patch('/api/skills/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Update the skill in the database
      const updatedSkill = await storage.updateSkill(id, req.body);
      
      if (!updatedSkill) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Skill updated successfully',
        data: updatedSkill
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  app.delete('/api/skills/:id', isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSkill(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Skill not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Skill deleted successfully'
      });
    } catch (error) {
      return handleError(error as Error, res);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
