'use client'

import { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AnnouncementBar from "./AnnouncementBar";
import { ArrowBack } from "@mui/icons-material";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [, setScrollDirection] = useState("up");
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [useWhiteText, setUseWhiteText] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
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

  // Function to determine if we need white text based on background
  const determineTextColor = (scrollPosition: number) => {
    // At the top (first 100px), use white text for dark hero backgrounds
    if (scrollPosition < 100) {
      return true;
    }
    
    // When scrolling down with header background showing, use dark text
    return false;
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      setScrollDirection(direction);
      
      // Set scroll position for calculations
      setScrollY(currentScrollY);
      
      // Calculate header opacity based on scroll
      if (direction === "down") {
        // When scrolling down, gradually decrease opacity
        // Start fading after 100px of scroll
        const fadeStart = 100;
        const fadeEnd = 300;
        
        if (currentScrollY <= fadeStart) {
          // At the very top, keep header transparent
          setHeaderOpacity(0);
        } else {
          // Between start and end, calculate opacity for background
          const opacity = Math.min(1, (currentScrollY - fadeStart) / (fadeEnd - fadeStart));
          setHeaderOpacity(opacity);
          
          // If we've scrolled way down, hide header completely
          if (currentScrollY > fadeEnd + 300) {
            if (headerRef.current) {
              headerRef.current.style.transform = 'translateY(-100%)';
            }
          }
        }
      } else {
        // When scrolling up, show header with appropriate opacity
        // Immediately restore visibility
        if (headerRef.current) {
          headerRef.current.style.transform = 'translateY(0)';
        }
        
        if (currentScrollY <= 100) {
          // At the top, keep header transparent
          setHeaderOpacity(0);
        } else {
          // When scrolled down, add background opacity
          setHeaderOpacity(0.9);
        }
      }
      
      // Determine text color based on scroll position
      setUseWhiteText(determineTextColor(currentScrollY));
      
      lastScrollY.current = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get text color class based on state
  const textColorClass = useWhiteText ? "text-amber-100" : "text-amber-100";
  const mobileIconClass = useWhiteText ? "text-amber-100" : "text-amber-100";

  const headerStyle = {
    backgroundColor: headerOpacity > 0 
      ? `rgba(58, 24, 18, ${headerOpacity * 0.95})` // Dark brown from your brand
      : 'transparent',
    backdropFilter: headerOpacity > 0 ? `blur(10px)` : 'none',
    boxShadow: headerOpacity > 0.5 ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
    transition: "background-color 0.3s ease, transform 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 w-full">
      {/* Announcement Bar */}
      <div className="w-full">
        <AnnouncementBar />
      </div>
      
      {/* Main Header */}
      <header
        ref={headerRef}
        className="w-full flex items-center justify-between px-4 md:px-8 lg:px-24 py-4 h-24"
        style={headerStyle}
      >
        {/* MOBILE: hamburger */}
        <button
          className={`lg:hidden p-2 ${mobileIconClass}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon fontSize="large" />
        </button>

        {/* CENTERED LOGO */}
        <Link href="/" aria-label="Go to homepage" className="">
          <Image
            src="/Logo-BSA-New-removebg-preview.png"
            alt="BG Gold Logo"
            width={112}
            height={112}
            className="object-contain drop-shadow-lg"
          />
        </Link>

        {/* DESKTOP: primary nav */}
        <nav className="hidden lg:flex items-center space-x-8 ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`
                nav-link ${textColorClass} text-sm font-medium uppercase
                tracking-wider relative group flex flex-col
                items-center py-2
              `}
            >
              <span>{t(item.key)}</span>
              <span className={`nav-underline absolute bottom-0 left-0 w-0 h-0.5 ${useWhiteText ? 'bg-white' : 'bg-[#9d8858]'} transition-all duration-300 group-hover:w-full`} />
            </Link>
          ))}
          
          {/* Add Language Switcher with appropriate color */}
          <div className={textColorClass}>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* MOBILE DRAWER */}
        {/* backdrop */}
        <div
          className={`
            min-h-screen
            fixed inset-0 bg-black/50 backdrop-blur-sm z-40
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            transition-opacity duration-300
          `}
          onClick={() => setOpen(false)}
        />

        {/* drawer panel */}
        <aside
          className={`
            min-h-screen
            backdrop-blur-sm
            fixed inset-y-0 left-0 z-50 w-64
            bg-[#3a1812] shadow-xl
            transform
            ${open ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300
            flex flex-col overflow-y-auto
          `}
        >
          {/* close button */}
          <button
            className="self-end p-4 text-amber-100"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <ArrowBack />
          </button>

          {/* mobile nav links */}
          <nav className="flex-1 flex flex-col px-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  text-amber-100
                  hover:text-[#9d8858]
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
    </div>
  );
}