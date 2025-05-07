import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { Menu, X, ArrowRight, Code, Home, BookOpen, BriefcaseBusiness, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useScrollSpy from "@/hooks/useScrollSpy";
import useMobile from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "#about", key: "nav.about", icon: Home },
  { href: "#resume", key: "nav.resume", icon: BookOpen },
  { href: "#portfolio", key: "nav.portfolio", icon: Code },
  { href: "#contact", key: "nav.contact", icon: MailIcon },
];

// Animation variants for navbar items
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobile();
  const activeSection = useScrollSpy(
    navItems.map((item) => item.href.substring(1)),
    {
      rootMargin: "-100px 0px -80% 0px",
    }
  );
  
  // Check scroll position to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClick = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isMenuOpen]);
  
  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };
  
  return (
    <motion.header 
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "shadow-md" : "border-b border-border/50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Enhanced Logo with Animation */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <motion.div 
              className="absolute -left-1.5 -top-1.5 h-10 w-10 bg-primary/10 rounded-lg"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <span className="gradient-text font-bold text-2xl relative z-10">T.ERIC</span>
            <Badge 
              variant="secondary" 
              className="absolute -right-6 -top-2 bg-primary/10 text-primary text-[10px] px-1.5 py-0 font-semibold"
            >
              dev
            </Badge>
          </div>
          <motion.div 
            className="ml-2 h-2 w-2 rounded-full bg-primary" 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
        
        {/* Mobile Menu Toggle Button with Enhanced Animation */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full border border-border/40 transition-colors ${isMenuOpen ? 'bg-primary/5 border-primary/20' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }} 
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
        
        {/* Desktop Navigation with Hover Effects */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.substring(1);
            
            return (
              <motion.a
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-muted/50 group"
              >
                <div className={`${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors duration-200`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className={`${isActive ? 'text-primary font-semibold' : 'group-hover:text-foreground'} transition-colors duration-200`}>
                  {t(item.key)}
                </span>
                
                {/* Animated underline indicator */}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                  initial={{ width: isActive ? '100%' : '0%' }}
                  animate={{ width: isActive ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            );
          })}
          
          {/* Divider */}
          <div className="h-6 w-px bg-border/60 mx-1" />
          
          {/* Theme Toggle */}
          <motion.div 
            custom={navItems.length}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            className="px-1"
          >
            <ThemeToggle />
          </motion.div>
          
          {/* Language Selector */}
          <motion.div 
            custom={navItems.length + 1}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            className="px-1"
          >
            <LanguageSelector />
          </motion.div>
        </nav>
      </div>
      
      {/* Enhanced Mobile Menu with Icons and Better Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6 space-y-3 border-t border-border/50">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center px-4 py-3.5 rounded-xl ${
                      isActive 
                        ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                        : "hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <div className={`${isActive ? 'bg-primary/20' : 'bg-muted'} h-8 w-8 rounded-full flex items-center justify-center mr-3 transition-colors`}>
                      <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span>{t(item.key)}</span>
                    {isActive && (
                      <motion.div 
                        className="ml-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.a>
                );
              })}
              
              {/* Theme Toggle in Mobile Menu */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                className="flex items-center px-4 py-3.5 rounded-xl hover:bg-muted/50 border border-transparent"
              >
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">{t("theme")}</span>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </motion.div>
              
              {/* Language Selector in Mobile Menu */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.1, duration: 0.3 }}
                className="flex items-center px-4 py-3.5 rounded-xl hover:bg-muted/50 border border-transparent"
              >
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m2 12 20 0"></path>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">{t("language")}</span>
                <div className="ml-auto">
                  <LanguageSelector />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
