'use client'

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  // Define nav items with translation keys
  const navItems = [
    { key: 'nav.home', href: '/', label: 'Home' },
    { key: 'nav.about', href: '/about-us', label: 'About Us' },
    { key: 'nav.products', href: '/products', label: 'Our Product' },
    { key: 'nav.howtoshop', href: '/how-to-shop', label: 'How To Shop' },
    { key: 'nav.careers', href: '/careers', label: 'Careers' },
    { key: 'nav.contact', href: '/contact-us', label: 'Contact Us' }
  ];

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
        className="lg:hidden p-2 text-[#e3e3e3]"
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
      <nav className="hidden lg:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="
              nav-link text-amber-100 text-sm font-medium uppercase
              tracking-wider relative group flex flex-col
              items-center py-2
            "
          >
            <span>{t(item.key)}</span>
            <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300" />
          </Link>
        ))}
        
        {/* Add Language Switcher */}
        <LanguageSwitcher />
      </nav>

      {/* MOBILE DRAWER */}
      {/* backdrop */}
      <div
        className={`padding-top-6
          fixed inset-0 bg-black/30 backdrop-blur-sm z-40
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          transition-opacity duration-300
        `}
        onClick={() => setOpen(false)}
      />

      {/* drawer panel */}
      <aside
        className={`
          backdrop-blur-sm
          fixed inset-y-0 left-0 z-50 w-64
        bg-white shadow-xl
          transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          flex flex-col overflow-y-auto
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
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
                text-[#2c3e50]  /* deep navy text */
                hover:text-[#edca89] /* gold on hover */
                text-lg font-semibold uppercase
                transition-colors duration-200
              "
            >
              {t(item.key)}
            </Link>
          ))}
          {/* Add Language Switcher to mobile menu */}
          <div className="mt-4 self-start rounded-lg">
            <LanguageSwitcher />
          </div>
        </nav>
      </aside>

      {/* spacer (to keep header balanced) */}
      <div className="lg:hidden w-10" />
    </header>
  );
}