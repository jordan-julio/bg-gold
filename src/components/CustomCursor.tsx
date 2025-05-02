'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const blob = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const b = blob.current!
    const r = ring.current!
    document.body.style.cursor = 'none'

    const HOVER_TAGS = new Set([
      'a','button','input','textarea','select','label',
      'p','span','li','h1','h2','h3','h4','h5','h6','img'
    ])

    const onMouseMove = (e: MouseEvent) => {
      b.style.left = r.style.left = `${e.clientX}px`
      b.style.top  = r.style.top  = `${e.clientY}px`
    }

    const onMouseOver = (e: MouseEvent) => {
      if (HOVER_TAGS.has((e.target as HTMLElement).tagName.toLowerCase())) {
        b.classList.add('cursor--hover')
        r.classList.add('cursor--hover')
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      if (HOVER_TAGS.has((e.target as HTMLElement).tagName.toLowerCase())) {
        b.classList.remove('cursor--hover')
        r.classList.remove('cursor--hover')
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={blob} className="custom-cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
