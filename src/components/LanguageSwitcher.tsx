'use client';
  
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { ExpandMore } from '@mui/icons-material';

const languages = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'id', name: 'Indonesia', flag: 'id' }
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown open/closed
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  const currentLang = languages.find(lang => lang.code === language);
  
  return (
    <div className="language-switcher relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 rounded-md border border-white/20 bg-amber-400 backdrop-blur-sm text-[#e3e3e3] hover:bg-white/20 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLang?.flag}</span>
        <span className="text-sm font-medium">{currentLang?.code.toUpperCase()}</span>
        <ExpandMore 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-10 w-40 rounded-md shadow-lg bg-white/90 backdrop-blur-md z-50 overflow-hidden">
          <div className="">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code as Language)}
                className={`
                  w-full text-left px-4 py-2 text-sm flex items-center gap-2
                  ${language === lang.code ? 'bg-amber-100 text-amber-900' : 'text-gray-800 hover:bg-amber-50'}
                `}
              >
                {lang.flag === 'us' ? <svg className="w-5 h-5 rounded-full me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlinkHref="#a" y="420"/><use xlinkHref="#a" y="840"/><use xlinkHref="#a" y="1260"/></g><use xlinkHref="#a" y="1680"/></g><use xlinkHref="#b" x="247" y="210"/></g><use xlinkHref="#c" x="494"/></g><use xlinkHref="#d" x="988"/><use xlinkHref="#c" x="1976"/><use xlinkHref="#e" x="2470"/></g></svg> : <span>{lang.flag}</span>}
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}