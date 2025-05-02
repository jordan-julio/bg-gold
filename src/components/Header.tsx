'use client'

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = ["Home", "About", "Contact", "E-Catalog"];

  return (
    <header
      className="
        relative z-20 flex items-center justify-between
        px-4 md:px-8 lg:px-24 py-4
        h-24 bg-transparent
      "
    >
      {/* MOBILE: hamburger */}
      <button
        className="lg:hidden p-2 text-white"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* CENTERED LOGO */}
      <Link href="/" aria-label="Go to homepage">
        <Image
          src="/Logo-BSA-New-removebg-preview.png"
          alt="BG Gold Logo"
          width={112}
          height={112}
          className="object-contain drop-shadow-lg"
        />
      </Link>

      {/* DESKTOP: primary nav */}
      <nav className="hidden lg:flex space-x-12">
        {navItems.map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="
              nav-link text-white text-sm font-medium uppercase
              tracking-wider relative group flex flex-col
              items-center py-2
            "
          >
            <span>{item}</span>
            <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300" />
          </Link>
        ))}
      </nav>

      {/* MOBILE DRAWER */}
      {/* backdrop */}
      <div
        className={`padding-top-6
          fixed inset-0 bg-black/50 z-40
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          transition-opacity duration-300
        `}
        onClick={() => setOpen(false)}
      />

      {/* drawer panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-white/90 backdrop-blur-sm
          transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          flex flex-col
        `}
      >
        {/* close button */}
        <button
          className="self-end p-4 text-gray-800"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>

        {/* mobile nav links */}
        <nav className="flex-1 flex flex-col px-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-gray-800 text-lg font-semibold uppercase"
            >
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* spacer (to keep header balanced) */}
      <div className="lg:hidden w-10" />
    </header>
  );
}
