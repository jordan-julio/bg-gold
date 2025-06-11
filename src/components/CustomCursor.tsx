'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const blob = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const dot  = useRef<HTMLDivElement>(null)      // ← New

  useEffect(() => {
    const b = blob.current!
    const r = ring.current!
    const d = dot.current!                       // ← New
    document.body.style.cursor = 'none'

    const HOVER_TAGS = new Set([
      'a','button','input','textarea','select','label',
      'p','span','li','h1','h2','h3','h4','h5','h6','img'
    ])

    function onMouseMove(e: MouseEvent) {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
    
      // dot jumps immediately under the real mouse
      d.style.left = x;
      d.style.top  = y;
    
      // blob & ring smoothly trail behind
      b.style.left = r.style.left = x;
      b.style.top  = r.style.top  = y;
    }
    

    function onMouseOver(e: MouseEvent) {
      if (HOVER_TAGS.has((e.target as HTMLElement).tagName.toLowerCase())) {
        b.classList.add('cursor--hover')
        r.classList.add('cursor--hover')
        d.classList.add('cursor--hover')       // ← optional if you want dot hover effects
      }
    }

    function onMouseOut(e: MouseEvent) {
      if (HOVER_TAGS.has((e.target as HTMLElement).tagName.toLowerCase())) {
        b.classList.remove('cursor--hover')
        r.classList.remove('cursor--hover')
        d.classList.remove('cursor--hover')
      }
    }

    function onMouseDown() {
      b.classList.add('cursor--active')
      r.classList.add('cursor--active')
      d.classList.add('cursor--active')        // ← so dot trails on click too
    }
    function onMouseUp() {
      b.classList.remove('cursor--active')
      r.classList.remove('cursor--active')
      d.classList.remove('cursor--active')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup',   onMouseUp)

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup',   onMouseUp)
    }
  }, [])

  return (
    <div className=''>
      <div ref={blob} className="custom-cursor" />
      <div ref={ring} className="cursor-ring" />
      <div ref={dot}  className="cursor-dot" />    {/* New */}
      <style jsx>{
      `
        @media (hover: none) and (pointer: coarse) {
        .custom-cursor,
        .cursor-ring,
        .cursor-dot {
          display: none !important;
        }
      }
      `  
      }</style>
    </div>
  )
}
