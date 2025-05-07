import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Github, Linkedin, Twitter, Mail, Heart, ArrowRight, 
  BookOpen, Code, Home, MessageCircle, MapPin, Phone, Send 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50 }
  }
};

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/partoftrue", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:partoftrue@gmail.com", label: "Email" },
  ];
  
  const navLinks = [
    { href: "#about", label: t("nav.about"), icon: Home },
    { href: "#resume", label: t("nav.resume"), icon: BookOpen },
    { href: "#portfolio", label: t("nav.portfolio"), icon: Code },
    { href: "#contact", label: t("nav.contact"), icon: MessageCircle },
  ];
  
  return (
    <footer className="pt-16 pb-8 bg-background border-t border-border/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70">
        <div className="absolute -bottom-48 left-1/4 w-96 h-96 bg-primary/5 blur-3xl rounded-full"></div>
        <div className="absolute -top-48 right-1/4 w-96 h-96 bg-primary/5 blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand/Logo Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4"
          >
            <div className="relative mb-5">
              <motion.div 
                className="absolute -left-1.5 -top-1.5 h-10 w-10 bg-primary/10 rounded-lg"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex items-center">
                <span className="gradient-text font-bold text-2xl relative z-10 mr-2">T.ERIC</span>
                <Badge 
                  variant="secondary" 
                  className="relative z-10 bg-primary/10 text-primary text-[10px] px-1.5 py-0 font-semibold"
                >
                  dev
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            
            {/* Social icons with enhanced animations */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full h-10 w-10 border-border/60 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-300 shadow-sm"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Navigation Links */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 md:ml-auto lg:ml-0"
          >
            <h3 className="font-semibold mb-5 text-lg flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <ArrowRight className="h-3 w-3 text-primary" />
              </div>
              {t("footer.links")}
            </h3>
            
            <ul className="space-y-3.5">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                
                return (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="group"
                  >
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                    >
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted mr-2 group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <h3 className="font-semibold mb-5 text-lg flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Phone className="h-3 w-3 text-primary" />
              </div>
              {t("footer.contact")}
            </h3>
            
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-primary/10 transition-colors duration-300">
                  <MapPin className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  South Korea
                </span>
              </motion.li>
              
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-primary/10 transition-colors duration-300">
                  <Mail className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </span>
                <a 
                  href="mailto:partoftrue@gmail.com" 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                >
                  partoftrue@gmail.com
                </a>
              </motion.li>
              
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-primary/10 transition-colors duration-300">
                  <Phone className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </span>
                <a 
                  href="tel:+1234567890" 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </motion.li>
            </ul>
          </motion.div>
          
          {/* Newsletter Section with Enhanced Input */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <h3 className="font-semibold mb-5 text-lg flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Send className="h-3 w-3 text-primary" />
              </div>
              {t("footer.newsletter")}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-5">
              {t("footer.subscribeText")}
            </p>
            
            <div className="relative">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-full pr-12 py-5 h-11 border-border/40 focus:border-primary/40 transition-all duration-300 bg-muted/50 focus:ring-1 focus:ring-primary/20"
              />
              <Button 
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 p-0 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                size="icon"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer Bottom Section */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  repeatDelay: 5,
                  ease: "easeInOut" 
                }}
                className="mr-3"
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.div>
              <p className="text-muted-foreground text-sm">
                © {currentYear} {t("footer.copyright")}
              </p>
            </div>
            
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap justify-center">
              <Badge variant="outline" className="rounded-full bg-background hover:bg-muted/50 transition-colors text-xs">
                <a href="#" className="px-1 py-0.5 text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
              </Badge>
              <Badge variant="outline" className="rounded-full bg-background hover:bg-muted/50 transition-colors text-xs">
                <a href="#" className="px-1 py-0.5 text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
              </Badge>
              <Badge variant="outline" className="rounded-full bg-background hover:bg-muted/50 transition-colors text-xs">
                <a href="#" className="px-1 py-0.5 text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </a>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
