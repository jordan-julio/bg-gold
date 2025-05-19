// src/context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Languages supported by the website
export type Language = 'en' | 'id';

// Create the language context
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.ecatalog': 'E-Catalog',
    'nav.products': 'Products',
    'nav.howtoshop': 'How To Shop',
    'nav.careers': 'Careers',
    
    // Hero section
    'hero.title':    'Dare to Shine with Luxury Gold Jewelry',
    'hero.subtitle': 'Embrace Confidence and Timeless Elegance',
    'hero.tagline':  'Be Bold. Be Gold.',
    'hero.discover': 'Explore Collection',
    'hero.contact':  'Get in Touch',
    'hero.scroll':   'Scroll to Discover',
        
    // About section
    'about.title': 'Our Story',
    'about.paragraph1': 'PT Bagong Sejahtera Abadi (BG Gold) has been crafting exquisite gold jewelry since 2003. Nestled in Surabaya, we combine time-honored techniques with forward-looking design to deliver pieces that become lifelong treasures.',
    'about.paragraph2': 'Quality is our cornerstone: every link, stone, and setting undergoes rigorous inspection by our master craftsmen. With over {years} years of passion and precision, BG Gold remains the benchmark in Indonesian fine jewelry.',
    'about.years': 'Years of Excellence',
    'about.button': 'Discover More',
    
    // Events section
    'events.title': 'Upcoming Events',
    
    // Newsletter section
    'newsletter.title': 'Latest from BG Gold',
    'newsletter.description': 'Enter your email to subscribe to the latest information from BG Gold.',
    'newsletter.placeholder': 'Your Email',
    'newsletter.email': 'Email address',
    'newsletter.button': 'Subscribe',
    'newsletter.success': 'Thank you! Your email has been received.',
    
    // Footer section
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.integrations': 'Integrations',
    'footer.demo': 'Demo',
    
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.blog': 'Blog',
    
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.contactUs': 'Contact Us',
    'footer.apiDocs': 'API Docs',
    'footer.status': 'Status',
    
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    
    'footer.facebook': 'Visit our Facebook page',
    'footer.twitter': 'Follow us on Twitter',
    'footer.instagram': 'Follow us on Instagram',
    'footer.linkedin': 'Connect with us on LinkedIn',
    
    'footer.logoAlt': 'BG Gold Logo',
    'footer.copyright': '© {year} BG Gold. All rights reserved.',

    'announcements.previous': 'Previous announcement',
    'announcements.next': 'Next announcement',
  },
  id: {
    // Header
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.contact': 'Hubungi Kami',
    'nav.ecatalog': 'E-Katalog',
    'nav.products': 'Produk',
    'nav.howtoshop': 'Cara Belanja',
    'nav.careers': 'Karir',
    
    // Hero section
    'hero.title':    'Berani Bersinar dengan Perhiasan Emas Mewah',
    'hero.subtitle': 'Rangkul Kepercayaan Diri dan Keanggunan Abadi',
    'hero.tagline':  'Be Bold. Be Gold.',
    'hero.discover': 'Jelajahi Koleksi',
    'hero.contact':  'Hubungi Kami',
    'hero.scroll': 'Gulir Ke Bawah',
    
    // About section
    'about.title': 'Cerita Kami',
    'about.paragraph1': 'PT Bagong Sejahtera Abadi (BG Gold) telah membuat perhiasan emas mewah sejak 2003. Berlokasi di Surabaya, kami menggabungkan teknik lama yang terpercaya dengan desain masa kini untuk menghasilkan karya yang menjadi harta seumur hidup.',
    'about.paragraph2': 'Kualitas adalah landasan kami: setiap rangkaian, batu, dan pengaturan menjalani pemeriksaan ketat oleh pengrajin ahli kami. Dengan lebih dari {years} tahun dedikasi dan presisi, BG Gold tetap menjadi tolok ukur dalam perhiasan halus Indonesia.',
    'about.years': 'Tahun Keunggulan',
    'about.button': 'Temukan Lebih Banyak',
    
    // Events section
    'events.title': 'Acara Mendatang',
    
    // Newsletter section
    'newsletter.title': 'Terbaru dari BG Gold',
    'newsletter.description': 'Masukkan email untuk berlangganan informasi terbaru dari BG Gold.',
    'newsletter.placeholder': 'Email Anda',
    'newsletter.email': 'Alamat email',
    'newsletter.button': 'Berlangganan',
    'newsletter.success': 'Terima kasih! Email Anda telah diterima.',
    
    // Footer
    'footer.product': 'Produk',
    'footer.features': 'Fitur',
    'footer.pricing': 'Harga',
    'footer.integrations': 'Integrasi',
    'footer.demo': 'Demo',
    
    'footer.company': 'Perusahaan',
    'footer.aboutUs': 'Tentang Kami',
    'footer.careers': 'Karir',
    'footer.press': 'Pers',
    'footer.blog': 'Blog',
    
    'footer.support': 'Dukungan',
    'footer.helpCenter': 'Pusat Bantuan',
    'footer.contactUs': 'Hubungi Kami',
    'footer.apiDocs': 'Dokumentasi API',
    'footer.status': 'Status',
    
    'footer.legal': 'Hukum',
    'footer.terms': 'Syarat Layanan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.cookies': 'Kebijakan Cookie',
    
    'footer.facebook': 'Kunjungi halaman Facebook kami',
    'footer.twitter': 'Ikuti kami di Twitter',
    'footer.instagram': 'Ikuti kami di Instagram',
    'footer.linkedin': 'Terhubung dengan kami di LinkedIn',
    
    'footer.logoAlt': 'Logo BG Gold',
    'footer.copyright': '© {year} BG Gold. Seluruh hak cipta dilindungi undang-undang.',

    // announcements
    'announcements.previous': 'Pengumuman sebelumnya',
    'announcements.next': 'Pengumuman berikutnya',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is Indonesian, but check localStorage if available
  const [language, setLanguageState] = useState<Language>('id');
  
  // Function to translate text
  const translate = (key: string): string => {
    // If the key doesn't exist in translations, return the key itself
    const translation = (translations[language] as Record<string, string>)[key] || key;
    
    // Handle replacements like {year} or {years}
    return translation.replace(/\{([^}]+)\}/g, (_, match) => {
      if (match === 'year') return new Date().getFullYear().toString();
      if (match === 'years') {
        const foundingYear = 2003;
        const currentYear = new Date().getFullYear();
        return (currentYear - foundingYear).toString();
      }
      return match;
    });
  };
  
  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bgGoldLanguage', lang);
    }
  };
  
  // Load language from localStorage on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('bgGoldLanguage') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language in components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};