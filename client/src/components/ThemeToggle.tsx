import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  // When mounted on client, we can show the UI
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  const isDark = theme === "dark";
  
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  const getThemeLabel = (isDark: boolean): string => {
    return isDark 
      ? (i18n.language === "ko" ? "다크" : "Dark")
      : (i18n.language === "ko" ? "라이트" : "Light");
  };
  
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="relative flex h-5 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.2
            }}
            className="flex items-center justify-center"
          >
            {isDark 
              ? <Moon className="h-4 w-4 text-primary" /> 
              : <Sun className="h-4 w-4 text-primary" />
            }
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="inline-flex items-center">
        <Switch
          id="theme-toggle"
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="relative h-[22px] w-[42px] cursor-pointer rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary/80 data-[state=unchecked]:bg-primary/80"
          thumbClassName="block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        />
        <Label
          htmlFor="theme-toggle"
          className="text-xs font-medium ml-1 select-none cursor-pointer"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={theme}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.2,
                delay: 0.05
              }}
              className="inline-block"
            >
              {getThemeLabel(isDark)}
            </motion.span>
          </AnimatePresence>
        </Label>
      </div>
    </div>
  );
}
