// components/AnimatedStarButton.tsx
'use client'

import React from 'react'

export interface AnimatedStarButtonProps {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  /** Button fill / background */
  backgroundColor?: string
  /** Border colour */
  borderColor?: string
  /** Text colour (normal + hover) */
  textColor?: string
  /** Star / sparkle colour */
  starColor?: string
  /** Glow colour (box-shadow) */
  glowColor?: string
}

const AnimatedStarButton: React.FC<AnimatedStarButtonProps> = ({
  text,
  onClick,
  className = '',
  backgroundColor = '#fec195',
  borderColor,
  textColor = '#181818',
  starColor = '#fffdef',
  glowColor = 'rgba(254,193,149,0.5)',
}) => {
  const border = borderColor || backgroundColor
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`relative px-6 py-3 font-medium rounded-lg overflow-hidden transition-all duration-300 cursor-none
          text-[${textColor}] 
          bg-[${backgroundColor}] 
          border-2 border-[${border}]
          hover:bg-transparent hover:text-[${border}] 
          hover:shadow-[0_0_15px_${glowColor}] 
          ${className}`}
      >
        {text}

        {/* single star SVG, centered */}
        <svg
          className="absolute inset-0 m-auto w-6 h-6 opacity-0 transition-all duration-500 ease-out
            group-hover:opacity-100 group-hover:scale-150"
          viewBox="0 0 24 24"
          fill={starColor}
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01z" />
        </svg>
      </button>
    </>
  )
}

export default AnimatedStarButton
