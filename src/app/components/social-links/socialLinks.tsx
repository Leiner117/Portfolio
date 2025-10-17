"use client"

import { Github, Linkedin, Mail, FileText } from "lucide-react"

export const SocialLinks = () => {
  const socials = [
    { icon: Github, href: "https://github.com/leiner117", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/leiner-alvarado-357725247", label: "LinkedIn" },
    { icon: Mail, href: "mailto:leineralvarador117@gmail.com", label: "Email" },
    { icon: FileText, href: "/cv.pdf", label: "CV" },
  ]

  return (
    <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-400">
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            aria-label={social.label}
          >
            <Icon className="w-6 h-6" />
          </a>
        )
      })}
    </div>
  )
}
