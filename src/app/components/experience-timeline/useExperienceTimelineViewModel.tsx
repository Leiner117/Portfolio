"use client"

import { useEffect, useRef, useState } from "react"
import enData from "@/app/data/en.json"
import { useLanguage } from "@/app/context/LanguageContext"

type Experience = (typeof enData)["experience"][number]

export const useExperienceTimelineViewModel = () => {
  const { t } = useLanguage()
  const experiences: Experience[] = t.experience as Experience[]

  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [lineProgress, setLineProgress] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const timelineHeight = rect.height

      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (timelineHeight + windowHeight)))

      setLineProgress(scrollProgress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return {
    experiences,
    visibleItems,
    lineProgress,
    itemRefs,
    timelineRef,
  }
}

export default useExperienceTimelineViewModel
