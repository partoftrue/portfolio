import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Code, Briefcase, GraduationCap } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 60,
      duration: 0.8 
    }
  }
};

// Badge component with animation
const AnimatedBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 15
    }}
  >
    {children}
  </motion.div>
);

export default function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="pt-24 pb-20 md:pt-32 md:pb-28 container mx-auto px-4 md:px-6 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          className="order-2 md:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting badge with glow effect */}
          <motion.div className="mb-6" variants={itemVariants}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-sm relative">
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl"></div>
              <span className="relative text-primary text-sm font-medium flex items-center gap-2">
                {t("hero.greeting")}
                <motion.div 
                  className="w-1 h-1 rounded-full bg-primary"
                  animate={{ 
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                />
              </span>
            </div>
          </motion.div>
          
          {/* Name with animated underline */}
          <motion.div className="relative mb-3">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              variants={itemVariants}
            >
              <span className="gradient-text">{t("hero.name")}</span>
            </motion.h1>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ 
                delay: 0.5, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
            />
          </motion.div>
          
          {/* Title with floating animation */}
          <motion.h2 
            className="text-xl md:text-2xl font-medium mb-4 text-muted-foreground"
            variants={itemVariants}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          >
            {t("hero.title")}
          </motion.h2>
          
          {/* Bio with animated reveal */}
          <motion.p 
            className="text-base md:text-lg mb-8 max-w-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {t("hero.bio").replace("GitHub: partoftrue", "")}
            <a 
              href="https://github.com/partoftrue" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium ml-1"
            >
              GitHub: partoftrue
            </a>
          </motion.p>
          
          {/* Staggered skill badges */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {["React.js", "TypeScript", "Node.js", "PostgreSQL"].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + (index * 0.1),
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150
                }}
              >
                <AnimatedBadge>
                  <Code className="h-3.5 w-3.5 mr-1" />
                  <span>{skill}</span>
                </AnimatedBadge>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Animated CTA Buttons with hover effects */}
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                size="lg" 
                className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:translate-y-[-2px] transition-all group bg-gradient-to-r from-primary to-primary/80"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  {t("hero.contactMe")}
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  >
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-xl border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
                asChild
              >
                <a href="#portfolio">{t("hero.viewWork")}</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Profile Image with decorative elements */}
        <motion.div 
          className="order-1 md:order-2 flex justify-center md:justify-end relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated background decorative elements */}
          <div className="absolute inset-0 -z-10">
            <motion.div 
              className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.6, 0.4],
                rotate: [0, -15, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Enhanced Profile image with shadow and animation */}
          <motion.div 
            className="relative z-10"
            whileHover={{ scale: 1.03, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <motion.div 
                className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30 z-0"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 60, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
              
              {/* Avatar */}
              <Avatar className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-background shadow-[0_0_30px_rgba(0,0,0,0.2)] relative z-10">
                <AvatarImage 
                  src="/avatar-placeholder.jpg" 
                  alt="TUYIZERE ERIC" 
                  className="object-cover" 
                />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/20 to-accent/20">TE</AvatarFallback>
              </Avatar>
              
              {/* Floating decoration elements */}
              <motion.div 
                className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 backdrop-blur-md border border-primary/20 flex items-center justify-center text-lg font-bold"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
              >
                <Code className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
            
            {/* Decorative dots with staggered animation */}
            <div className="absolute -top-3 -left-3 flex space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 1 + (i * 0.2),
                    duration: 0.4
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
