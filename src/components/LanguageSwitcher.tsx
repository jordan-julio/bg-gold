'use client';
  
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
//import { ExpandMore } from '@mui/icons-material';
import Flag from 'react-world-flags'

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
        className="flex items-center gap-2 min-w-fit min-h-full rounded-md border border-white/20 bg-amber-400 backdrop-blur-sm text-[#e3e3e3] hover:bg-white/20 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLang?.flag === 'us' ? <Flag style={{
                  width: '40px',
                  height: 'fit',
                  borderRadius: '3px'
                }} code="us" /> : <Flag style={{
                  width: '40px',
                  height: 'fit',
                  borderRadius: '3px'
                }} code="id" /> }</span>
        {/**<span className="text-sm font-medium">{currentLang?.code.toUpperCase()}</span>
        <ExpandMore 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        />**/}
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
                {lang.flag === 'us' ? <Flag style={{
                  width: '40px',
                  height: 'fit',
                  borderRadius: '3px'
                }} code="us" /> : <Flag style={{
                  width: '40px',
                  height: 'fit',
                  borderRadius: '3px'
                }} code="id" /> }
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}