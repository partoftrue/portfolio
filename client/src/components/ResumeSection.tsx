import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Code, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Education, Experience, Skill } from "@shared/schema";
import { formatDate } from "@/lib/utils";
// Fallback data in case API fails
import { educationData, experienceData, skillsData } from "@/data/resumeData";

export default function ResumeSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Fetch education, experiences and skills data
  const { data: educationApiData, isLoading: isLoadingEducation } = useQuery<{ success: boolean, data: Education[] }>({
    queryKey: ['/api/education'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  const { data: experiencesApiData, isLoading: isLoadingExperiences } = useQuery<{ success: boolean, data: Experience[] }>({
    queryKey: ['/api/experiences'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  const { data: skillsApiData, isLoading: isLoadingSkills } = useQuery<{ success: boolean, data: Skill[] }>({
    queryKey: ['/api/skills'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  // Use API data or fallback to static data
  const education = educationApiData?.data || [];
  const experiences = experiencesApiData?.data || [];
  const skills = skillsApiData?.data || [];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  // Format date range for education/experience
  const getDateRange = (startDate: string, endDate: string | null): string => {
    const start = formatDate(startDate, 'yyyy');
    const end = endDate ? formatDate(endDate, 'yyyy') : t('common.present');
    return `${start} - ${end}`;
  };

  // Loading state for all sections
  const isLoading = isLoadingEducation || isLoadingExperiences || isLoadingSkills;
  
  return (
    <section id="resume" className="py-16 md:py-24 bg-muted/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced section header with animated underline */}
        <motion.div 
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            {t("resume.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight relative inline-block">
            <span className="gradient-text">{t("resume.title")}</span>
            <motion.div 
              className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mt-4">
            {t("resume.subtitle")}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Loader2 className="h-12 w-12 text-primary" />
            </motion.div>
            <p className="text-muted-foreground mt-4 animate-pulse">Loading resume details...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Education Section with Enhanced Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <Card className="border border-border/40 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                <CardContent className="pt-6 pb-4 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t("resume.education")}</h3>
                  </div>
                  
                  <div className="flex-grow space-y-6 overflow-y-auto custom-scrollbar max-h-[500px] pr-2">
                    {education.length > 0 ? (
                      education.map((item, idx) => (
                        <motion.div 
                          key={item.id} 
                          className="border-l-2 border-primary/30 pl-4 ml-1 relative group"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        >
                          {/* Decorative dot */}
                          <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300" />
                          
                          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 mb-2 border border-primary/10 shadow-sm">
                            <span className="text-primary text-sm font-medium">
                              {getDateRange(item.startDate, item.endDate)}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                            {item.degree}
                          </h4>
                          
                          <div className="flex items-start space-x-1 mb-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-muted-foreground">
                              {item.school}
                            </p>
                          </div>
                          
                          {item.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      // Fallback to static data if API returned no results
                      ((t('resume.educationData', { returnObjects: true }) || []) as any[]).map((item: any, idx: number) => (
                        <motion.div 
                          key={idx} 
                          className="border-l-2 border-primary/30 pl-4 ml-1 relative group"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        >
                          <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300" />
                          
                          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 mb-2 border border-primary/10 shadow-sm">
                            <span className="text-primary text-sm font-medium">
                              {item.date}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                            {item.degree}
                          </h4>
                          
                          <div className="flex items-start space-x-1 mb-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-muted-foreground">
                              {item.school}
                            </p>
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience Section with Enhanced Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <Card className="border border-border/40 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                <CardContent className="pt-6 pb-4 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t("resume.experience")}</h3>
                  </div>
                  
                  <div className="flex-grow space-y-6 overflow-y-auto custom-scrollbar max-h-[500px] pr-2">
                    {experiences.length > 0 ? (
                      experiences.map((item, idx) => (
                        <motion.div 
                          key={item.id} 
                          className="border-l-2 border-primary/30 pl-4 ml-1 relative group"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        >
                          <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300" />
                          
                          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 mb-2 border border-primary/10 shadow-sm">
                            <span className="text-primary text-sm font-medium">
                              {getDateRange(item.startDate, item.endDate)}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h4>
                          
                          <div className="flex items-start space-x-1 mb-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-muted-foreground">
                              {item.company}{item.location ? `, ${item.location}` : ''}
                            </p>
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ))
                    ) : (
                      ((t('resume.experienceData', { returnObjects: true }) || []) as any[]).map((item: any, idx: number) => (
                        <motion.div 
                          key={idx} 
                          className="border-l-2 border-primary/30 pl-4 ml-1 relative group"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        >
                          <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300" />
                          
                          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 mb-2 border border-primary/10 shadow-sm">
                            <span className="text-primary text-sm font-medium">
                              {item.date}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h4>
                          
                          <div className="flex items-start space-x-1 mb-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-muted-foreground">
                              {item.company}
                            </p>
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Section with Enhanced Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col h-full"
            >
              <Card className="border border-border/40 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                <CardContent className="pt-6 pb-4 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t("resume.skills")}</h3>
                  </div>
                  
                  <div className="flex-grow space-y-6 overflow-y-auto custom-scrollbar max-h-[500px] pr-2">
                    {skills.length > 0 ? (
                      // Display API data with enhanced UI
                      <>
                        {/* Frontend Skills */}
                        {groupedSkills.frontend && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                          >
                            <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <Code className="h-3.5 w-3.5 text-primary" />
                              </div>
                              {t("resume.skills.frontend")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {groupedSkills.frontend.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                >
                                  <Badge 
                                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Backend Skills */}
                        {groupedSkills.backend && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <Briefcase className="h-3.5 w-3.5 text-primary" />
                              </div>
                              {t("resume.skills.backend")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {groupedSkills.backend.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                >
                                  <Badge 
                                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Database Skills */}
                        {groupedSkills.database && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                          >
                            <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <Code className="h-3.5 w-3.5 text-primary" />
                              </div>
                              {t("resume.skills.database")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {groupedSkills.database.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                >
                                  <Badge 
                                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Tools & Others */}
                        {groupedSkills.tools && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                          >
                            <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <Code className="h-3.5 w-3.5 text-primary" />
                              </div>
                              {t("resume.skills.tools")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {groupedSkills.tools.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.4 + (index * 0.05), duration: 0.3 }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                >
                                  <Badge 
                                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      // Fallback to static data with enhanced UI
                      <>
                        {/* Frontend Skills */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                        >
                          <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <Code className="h-3.5 w-3.5 text-primary" />
                            </div>
                            {t("resume.skills.frontend")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {((t('resume.skillsData.frontend', { returnObjects: true }) || []) as string[]).map((skill, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                <Badge 
                                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                        
                        {/* Backend Skills */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <Briefcase className="h-3.5 w-3.5 text-primary" />
                            </div>
                            {t("resume.skills.backend")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {((t('resume.skillsData.backend', { returnObjects: true }) || []) as string[]).map((skill, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                <Badge 
                                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                        
                        {/* Tools & Others */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          <h4 className="font-medium mb-3 text-primary/80 flex items-center">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <Code className="h-3.5 w-3.5 text-primary" />
                            </div>
                            {t("resume.skills.tools")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {((t('resume.skillsData.tools', { returnObjects: true }) || []) as string[]).map((skill, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                <Badge 
                                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-sm transition-colors duration-300"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                    
                    {/* Languages with enhanced UI */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/40 mt-8"
                    >
                      <h4 className="font-medium mb-4 text-primary/80 flex items-center">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        </div>
                        {t("resume.skills.languages")}
                      </h4>
                      <div className="space-y-3">
                        {((t('resume.skillsData.languages', { returnObjects: true }) || []) as any[]).map((lang, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                {lang.name}
                              </span>
                              <Badge variant="outline" className="text-xs font-medium text-primary bg-primary/5">
                                {lang.level}
                              </Badge>
                            </div>
                            <div className="relative pt-1">
                              <motion.div
                                className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (index * 0.1) + 0.3, duration: 0.8, ease: "easeOut" }}
                              >
                                <motion.div 
                                  className="shadow-md rounded-full h-2 bg-gradient-to-r from-primary/60 to-primary" 
                                  initial={{ width: "0%" }}
                                  whileInView={{ width: `${lang.proficiency}%` }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.4 + (index * 0.1) + 0.4, duration: 1, ease: "easeOut" }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
        
        {/* Download CV button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              size="lg"
              className="rounded-full px-8 group shadow-md hover:shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
            >
              <span>{t("resume.download_cv") || "Download CV"}</span>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  repeatDelay: 3
                }}
                className="ml-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Custom scrollbar styles added via global CSS */}
    </section>
  );
}
