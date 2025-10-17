"use client"

import { useLanguage } from "@/app/context/LanguageContext"

export const ScrollIndicator = () => {
  const { t } = useLanguage()

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
      <div className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
        <span className="text-sm font-medium">{t.hero.scroll}</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </div>
  )
}
