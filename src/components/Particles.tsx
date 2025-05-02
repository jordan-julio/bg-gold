// components/Particles.tsx
'use client'

import React, { useRef, useEffect } from 'react'

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // helper to draw a star shape
  function drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ) {
    let rot = Math.PI / 2 * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    type Star = { x:number, y:number, outer:number, inner:number, spikes:number, vx:number, vy:number }
    const stars: Star[] = []

    // spawn ~30 random stars
    for (let i = 0; i < 30; i++) {
      const outer = 2 + Math.random() * 4
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        outer,
        inner: outer * 0.5,
        spikes: 5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      })
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(245,200,40,0.4)'  // soft golden
      stars.forEach(s => {
        // move
        s.x += s.vx
        s.y += s.vy
        // bounce
        if (s.x < 0 || s.x > width)   s.vx *= -1
        if (s.y < 0 || s.y > height)  s.vy *= -1
        // draw star
        drawStar(ctx, s.x, s.y, s.spikes, s.outer, s.inner)
      })
      requestAnimationFrame(animate)
    }
    animate()

    // handle resize
    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  )
}
