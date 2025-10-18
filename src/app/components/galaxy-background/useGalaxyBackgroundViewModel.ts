"use client"

import { useEffect, useRef } from "react"
import { Nullable } from "@/app/utils"
import {
  PARTICLE_DENSITY_DIVISOR,
  VELOCITY_VARIANCE,
  PARTICLE_MIN_SIZE,
  PARTICLE_MAX_RANDOM_SIZE,
  PARTICLE_OPACITY_VARIANCE,
  PARTICLE_OPACITY_MIN,
  MOUSE_MAX_DISTANCE,
  MOUSE_FORCE_MULTIPLIER,
  ATTRACTION_FORCE,
  DISPERSION_FORCE,
  DISPERSION_TIMER,
  MAX_SPEED_ATTRACTION,
  MAX_SPEED_DISPERSE,
  VELOCITY_DAMPING,
  VELOCITY_RANDOM_THRESHOLD,
  VELOCITY_RANDOM_MAG,
  CONNECTION_DISTANCE,
  CONNECTION_ALPHA_FACTOR,
  CONNECTION_LINE_WIDTH,
} from "./constants"
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export interface GalaxyBackgroundViewModel {
  canvasRef: React.RefObject <Nullable<HTMLCanvasElement>>
}

export const useGalaxyBackgroundViewModel = (): GalaxyBackgroundViewModel => {
  const canvasRef = useRef<Nullable<HTMLCanvasElement>>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const attractionPointRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })
  const lastAttractionPointRef = useRef<Nullable<{ x: number; y: number }>>(null)
  const dispersingRef = useRef(false)
  const disperseTimerRef = useRef<number>(0)
  const animationFrameRef = useRef<Nullable<number>>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
  const particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY_DIVISOR)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * VELOCITY_VARIANCE,
          vy: (Math.random() - 0.5) * VELOCITY_VARIANCE,
          size: Math.random() * PARTICLE_MAX_RANDOM_SIZE + PARTICLE_MIN_SIZE,
          opacity: Math.random() * PARTICLE_OPACITY_VARIANCE + PARTICLE_OPACITY_MIN,
        })
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }
    }

    const handleButtonAttraction = (event: Event) => {
      const ev = event as CustomEvent<{ x: number; y: number; active: boolean }>
      const wasActive = attractionPointRef.current.active
      const isNowActive = ev.detail.active

      if (wasActive && !isNowActive) {
        lastAttractionPointRef.current = {
          x: attractionPointRef.current.x,
          y: attractionPointRef.current.y,
        }
  dispersingRef.current = true
  disperseTimerRef.current = DISPERSION_TIMER
      }

      attractionPointRef.current = {
        x: ev.detail.x,
        y: ev.detail.y,
        active: ev.detail.active,
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        if (dispersingRef.current && lastAttractionPointRef.current) {
          const dx = particle.x - lastAttractionPointRef.current.x
          const dy = particle.y - lastAttractionPointRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const disperseForce = DISPERSION_FORCE

          if (distance > 0) {
            particle.vx += (dx / distance) * disperseForce
            particle.vy += (dy / distance) * disperseForce
          }

          const maxSpeed = MAX_SPEED_DISPERSE
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed
            particle.vy = (particle.vy / speed) * maxSpeed
          }
        } else if (attractionPointRef.current.active) {
          const dx = attractionPointRef.current.x - particle.x
          const dy = attractionPointRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          particle.vx += (dx / distance) * ATTRACTION_FORCE
          particle.vy += (dy / distance) * ATTRACTION_FORCE

          const maxSpeed = MAX_SPEED_ATTRACTION
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed
            particle.vy = (particle.vy / speed) * maxSpeed
          }
        } else if (!dispersingRef.current) {
          particle.vx *= VELOCITY_DAMPING
          particle.vy *= VELOCITY_DAMPING

          if (Math.abs(particle.vx) < VELOCITY_RANDOM_THRESHOLD) particle.vx += (Math.random() - 0.5) * VELOCITY_RANDOM_MAG
          if (Math.abs(particle.vy) < VELOCITY_RANDOM_THRESHOLD) particle.vy += (Math.random() - 0.5) * VELOCITY_RANDOM_MAG
        }

        particle.x += particle.vx
        particle.y += particle.vy

        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < MOUSE_MAX_DISTANCE && !attractionPointRef.current.active && !dispersingRef.current) {
          const force = (MOUSE_MAX_DISTANCE - distance) / MOUSE_MAX_DISTANCE
          const angle = Math.atan2(dy, dx)
          particle.x -= Math.cos(angle) * force * MOUSE_FORCE_MULTIPLIER
          particle.y -= Math.sin(angle) * force * MOUSE_FORCE_MULTIPLIER
        }

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()

        if (particle.size > 1.5) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.1})`
          ctx.fill()
        }
      })

      if (dispersingRef.current) {
        disperseTimerRef.current--
        if (disperseTimerRef.current <= 0) {
          dispersingRef.current = false
          lastAttractionPointRef.current = null
        }
      }

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${CONNECTION_ALPHA_FACTOR * (1 - distance / CONNECTION_DISTANCE)})`
            ctx.lineWidth = CONNECTION_LINE_WIDTH
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("buttonAttraction", handleButtonAttraction as EventListener)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("buttonAttraction", handleButtonAttraction as EventListener)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return { canvasRef }
}
