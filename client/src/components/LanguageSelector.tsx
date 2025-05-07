import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
}

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const prevLangRef = useRef<string>(i18n.language);
  
  const languages: LanguageOption[] = [
    {
      code: "en",
      label: "English",
      nativeLabel: "English",
      flag: "🇺🇸"
    },
    {
      code: "ko",
      label: "Korean",
      nativeLabel: "한국어",
      flag: "🇰🇷"
    }
  ];
  
  const isKorean = i18n.language === "ko";
  
  const toggleLanguage = () => {
    const newLang = isKorean ? "en" : "ko";
    prevLangRef.current = i18n.language;
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };
  
  // Handle initial language from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
  }, []);
  
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="relative flex h-5 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i18n.language}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.2
            }}
            className="flex items-center gap-1"
          >
            <span className="text-lg leading-none">{isKorean ? "🇰🇷" : "🇺🇸"}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="inline-flex items-center">
        <Switch
          id="language-toggle"
          checked={isKorean}
          onCheckedChange={toggleLanguage}
          className="relative h-[22px] w-[42px] cursor-pointer rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary/80 data-[state=unchecked]:bg-primary/80"
          thumbClassName="block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        />
        <Label
          htmlFor="language-toggle"
          className="text-xs font-medium ml-1 select-none cursor-pointer"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={i18n.language}
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
              {isKorean ? "한국어" : "English"}
            </motion.span>
          </AnimatePresence>
        </Label>
      </div>
    </div>
  );
}
