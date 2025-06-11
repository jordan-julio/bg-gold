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
    // Header NAVIGATION
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.ecatalog': 'E-Catalog',
    'nav.products': 'Products',
    'nav.howtoshop': 'How To Shop',
    'nav.careers': 'Careers',
    
    ////////////////////////////////////////
    // About section HOME PAGE ////////////
    // Hero section ///////////////////////
    'hero.title':    'Dare to Shine with Luxury Gold Jewelry',
    'hero.subtitle': 'Embrace Confidence and Timeless Elegance',
    'hero.tagline':  'Be Bold. Be Gold.',
    'hero.discover': 'Explore Collection',
    'hero.contact':  'Get in Touch',
    'hero.scroll':   'Scroll to Discover',
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
    //////////////// END /////////////////////
    /////////////////////////////////////////


    //////////////////////////////////////////////////
    ////////// ABOUT US PAGE //////////////////////////
    // about us page
    'about.hero.title': 'About BG Gold',
    'about.hero.description': 'Bringing high-quality jewelry beauty with Indonesian craftsmanship heritage since 2003',
    'about.hero.imageAlt': 'Gold jewelry craftsmanship',

    // About Section
    'about.section.title': 'About Us at a Glance',
    'about.section.paragraph1': 'BG GOLD Indonesia is a leading jewelry manufacturer committed to producing high-quality, elegantly designed pieces. Established in 2003, we have grown into one of Indonesia’s top jewelry producers, renowned locally and internationally.',
    'about.section.paragraph2': 'We prioritize quality, precision, and beauty in every item we create. With over 20 years of experience, our skilled team is dedicated to crafting stunning, durable, and valuable jewelry.',
    'about.section.experienceNumber': '22+',
    'about.section.experienceLabel': 'Years of Experience',
    'about.section.quote': '"Every piece is crafted with full dedication by the skilled hands of our artisans."',

    // Timeline Section
    'timeline.title': 'Our Journey',
    'timeline.yearLabel': 'Year',
    'timeline.2003.title': 'Founding',
    'timeline.2003.description': 'PT Bagong Sejahtera Abadi (BG Gold) was founded in Surabaya',
    'timeline.2009.title': 'Growth',
    'timeline.2009.description': 'Expanded production and opened our first showroom',
    'timeline.2013.title': 'Innovation',
    'timeline.2013.description': 'Introduced contemporary design collections',
    'timeline.2018.title': 'Milestone',
    'timeline.2018.description': 'Celebrated 15 years with our 50,000th customer',
    'timeline.2023.title': 'Today',
    'timeline.2023.description': 'Over 20 years of dedication to jewelry excellence',

    // Vision Section
    'vision.title': 'Company Vision',
    'vision.quote': '"To become a leader in the jewelry industry, delivering added value through innovative products, and continuously evolving to meet global market needs with the highest quality standards."',
    'vision.imageAlt': 'BG Gold jewelry display',

    // Mission Section
    'mission.title': 'Company Mission',
    'mission.quality.title': 'Quality Excellence',
    'mission.quality.description': 'Produce jewelry of the highest quality that meets customer expectations and needs.',
    'mission.innovation.title': 'Innovative Design',
    'mission.innovation.description': 'Embrace unique and innovative designs using top-quality materials.',
    'mission.integrity.title': 'Integrity & Trust',
    'mission.integrity.description': 'Maintain integrity, trust, and customer satisfaction through professional and friendly service.',
    'mission.responsibility.title': 'Social Responsibility',
    'mission.responsibility.description': 'Be a company that is socially and environmentally responsible.',

    // Gallery Section
    'aboutus.gallery.title': 'Our Product Highlights',
    /// END //////////////////////////////
    ////////////////////////////////////////////////


    /////////////////////////////////////////////
    // Hero section (HOW TO SHOP PAGE) //////////////////////
    'howtoshop.hero.title': 'SHOP WITH BG GOLD',
    'howtoshop.hero.description': 'Shop premium jewelry from the comfort of your home or visit our showroom in person.',
    'howtoshop.hero.button.howtoshop': 'Cara Belanja',
    'howtoshop.hero.button.products': 'Lihat Koleksi',
    
    // Features Section
    'howtoshop.card.online.title': 'Belanja Online',
    'howtoshop.card.online.description': 'Shop now on Tokopedia or Shopee for special discounts and low shipping rates!',
    'howtoshop.card.showroom.title': 'Our Showroom',
    'howtoshop.card.partner.title': 'Partner Stores',
    'howtoshop.everyday': 'everyday',
    'howtoshop.liatpetakontak': 'Open Map & Contact',
    ///////////////////////////////////////////////////

    // PRODUCT PAGE ///////////////////////////////
    ///////////////////////////////////////////////
    // Product Showcase Page
    'product.hero.logoText': 'BAGONG GOLD',
    'product.hero.subtitle': 'Redefining luxury through exceptional craft',
    'product.hero.ctaExplore': 'Explore Collections',

    // Types Section
    'product.types.title': 'Choose Your',
    'product.types.expression': 'Expression',
    'product.types.description': 'Four distinct manifestations of precious metal artistry',
    'product.types.yellow.title': 'Yellow Gold',
    'product.types.yellow.subtitle': 'Warm. Rich. Regal.',
    'product.types.rose.title': 'Rose Gold',
    'product.types.rose.subtitle': 'Romantic Radiance.',
    'product.types.white.title': 'White Gold',
    'product.types.white.subtitle': 'Modern. Elegance.',
    'product.types.black.title': 'Black Gold',
    'product.types.black.subtitle': 'Mystery. Sophistication.',

    // Collections Section
    'product.collections.title': 'Our',
    'product.collections.title2': 'Collections',
    'product.collections.description': 'Three distinct philosophies, unified by excellence and timeless beauty.',
    'product.collections.bgClassic.title': 'BG Classic',
    'product.collections.bgClassic.description': 'Timeless elegance for every occasion',
    'product.collections.bgSignature.title': 'BG Signature',
    'product.collections.bgSignature.description': 'Distinctive pieces that define luxury',
    'product.collections.bgDaily.title': 'BG Daily',
    'product.collections.bgDaily.description': 'Effortless sophistication for everyday',
    'product.collections.ctaExplore': 'Explore Collection',

    // CTA Section
    'product.cta.title': 'Ready to',
    'product.cta.title2': 'Begin?',
    'product.cta.description': 'Your journey into luxury begins with a single step. Let our artisans craft your story.',
    'product.cta.button.shop': 'Shop Collections',
    'product.cta.button.book': 'Book Consultation',

    //////// END /////////////////////////////////////
    ///////////////////////////////////////////////////
    
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
    ////////////////////////////////
    // Header NAVIGATION ///////////
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.contact': 'Hubungi Kami',
    'nav.ecatalog': 'E-Katalog',
    'nav.products': 'Produk',
    'nav.howtoshop': 'Cara Belanja',
    'nav.careers': 'Karir',
    // END /////////////
    //////////////////

    /////////////////
    // Hero section (HOME MAIN PAGE)
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
    //////////////////////
    //// END /////////////
    //////////////////////

    /////////////////////////////////////////////////
    // Hero section HOW TO SHOP PAGE ///////////////
    'howtoshop.hero.title': 'SHOP WITH BG GOLD',
    'howtoshop.hero.description': 'Belanja produk perhiasan premium dari kenyamanan rumahmu atau kunjungi langsung showroom kami.',
    'howtoshop.hero.button.howtoshop': 'Cara Belanja',
    'howtoshop.hero.button.products': 'Lihat Koleksi',
    
    // Features Section
    'howtoshop.card.online.title': 'Belanja Online',
    'howtoshop.card.online.description': 'Belanja sekarang di Tokopedia atau Shopee, dapatkan diskon spesial dan ongkir ringan!',
    'howtoshop.card.showroom.title': 'Our Showroom',
    'howtoshop.card.partner.title': 'Partner Stores',
    'howtoshop.everyday': 'tiap hari',
    'howtoshop.liatpetakontak': 'Lihat Peta & Kontak',
    /////////////////////////////////////////
    // END///////////////////////////////////
    /////////////////////////////////////////


    //////////////////////////////////////
    // About Us PAGE/////////////////////
     'about.hero.title': 'Tentang BG Gold',
     'about.hero.description': 'Menghadirkan keindahan perhiasan berkualitas tinggi dengan warisan keahlian Indonesia sejak 2003',
     'about.hero.imageAlt': 'Kerajinan perhiasan emas',
 
     // About Section
     'about.section.title': 'Sekilas Tentang Kami',
     'about.section.paragraph1': 'BG GOLD Indonesia adalah pabrik perhiasan terkemuka yang berkomitmen untuk menghasilkan produk berkualitas tinggi dengan desain elegan dan inovatif. Berdiri sejak 2003, kami telah berkembang menjadi salah satu produsen perhiasan terbaik di Indonesia dengan reputasi kuat di pasar lokal dan internasional.',
     'about.section.paragraph2': 'Kami mengutamakan kualitas, ketelitian, dan keindahan dalam setiap produk. Dengan pengalaman lebih dari 20 tahun, tim terampil kami berdedikasi menghasilkan perhiasan yang mempesona, tahan lama, dan bernilai tinggi.',
     'about.section.experienceNumber': '22+',
     'about.section.experienceLabel': 'Tahun Pengalaman',
     'about.section.quote': '"Setiap perhiasan dibuat dengan dedikasi penuh oleh tangan-tangan terampil pengrajin kami."',
 
     // Timeline Section
     'timeline.title': 'Perjalanan Kami',
     'timeline.yearLabel': 'Tahun',
     'timeline.2003.title': 'Pendirian',
     'timeline.2003.description': 'PT Bagong Sejahtera Abadi (BG Gold) didirikan di Surabaya',
     'timeline.2009.title': 'Pertumbuhan',
     'timeline.2009.description': 'Ekspansi produksi dan pembukaan showroom pertama',
     'timeline.2013.title': 'Inovasi',
     'timeline.2013.description': 'Pengenalan koleksi desain kontemporer',
     'timeline.2018.title': 'Pencapaian',
     'timeline.2018.description': 'Merayakan 15 tahun dengan pelanggan ke-50.000',
     'timeline.2023.title': 'Saat Ini',
     'timeline.2023.description': '20+ tahun dedikasi dalam keunggulan perhiasan',
 
     // Vision Section
     'vision.title': 'Visi Perusahaan',
     'vision.quote': '"Menjadi pemimpin dalam industri perhiasan, memberikan nilai tambah melalui produk yang inovatif, dan terus berkembang untuk memenuhi kebutuhan pasar global dengan standar kualitas terbaik."',
     'vision.imageAlt': 'Tampilan perhiasan BG Gold',
 
     // Mission Section
     'mission.title': 'Misi Perusahaan',
     'mission.quality.title': 'Kualitas Terbaik',
     'mission.quality.description': 'Menghasilkan perhiasan dengan kualitas terbaik yang memenuhi harapan dan kebutuhan pelanggan.',
     'mission.innovation.title': 'Desain Inovatif',
     'mission.innovation.description': 'Mengedepankan desain yang inovatif dan unik dengan menggunakan bahan baku berkualitas tinggi.',
     'mission.integrity.title': 'Integritas & Kepercayaan',
     'mission.integrity.description': 'Berkomitmen untuk menjaga integritas, kepercayaan, dan kepuasan pelanggan melalui layanan yang profesional dan ramah.',
     'mission.responsibility.title': 'Tanggung Jawab Sosial',
     'mission.responsibility.description': 'Menjadi perusahaan yang bertanggung jawab secara sosial dan lingkungan.',

     // Gallery Section
    'aboutus.gallery.title': 'Keunggulan Produk Kami',
     // END
    ////////////////////////////////////////////


    //////////////////////////////////////////////
    // Product Showcase Page //////////////////////
    'product.hero.logoText': 'BAGONG GOLD',
    'product.hero.subtitle': 'Mendefinisikan ulang kemewahan melalui kerajinan istimewa',
    'product.hero.ctaExplore': 'Jelajahi Koleksi',

    // Types Section
    'product.types.title': 'Pilih Ekspresimu',
    'product.types.description': 'Empat manifestasi berbeda dari seni logam mulia',
    'product.types.yellow.title': 'Emas Kuning',
    'product.types.yellow.subtitle': 'Hangat. Kaya. Agung.',
    'product.types.rose.title': 'Emas Mawar',
    'product.types.rose.subtitle': 'Romantis Berseri.',
    'product.types.white.title': 'Emas Putih',
    'product.types.white.subtitle': 'Kekinian. Elegan.',
    'product.types.black.title': 'Emas Hitam',
    'product.types.black.subtitle': 'Misteri. Canggih.',

    // Collections Section
    'product.collections.title': 'Koleksi',
    'product.collections.title2': 'Kami',
    'product.collections.description': 'Tiga filosofi berbeda, dipersatukan oleh keunggulan dan keindahan abadi.',
    'product.collections.bgClassic.title': 'BG Classic',
    'product.collections.bgClassic.description': 'Keanggunan abadi untuk setiap kesempatan',
    'product.collections.bgSignature.title': 'BG Signature',
    'product.collections.bgSignature.description': 'Potongan khas yang mendefinisikan kemewahan',
    'product.collections.bgDaily.title': 'BG Daily',
    'product.collections.bgDaily.description': 'Kesederhanaan elegan untuk setiap hari',
    'product.collections.ctaExplore': 'Jelajahi Koleksi',

    // CTA Section
    'product.cta.title': 'Siap Memulai?',
    'product.cta.description': 'Perjalananmu menuju kemewahan dimulai dengan satu langkah. Biarkan pengrajin kami merancang ceritamu.',
    'product.cta.button.shop': 'Belanja Koleksi',
    'product.cta.button.book': 'Pesan Konsultasi',
    //////////////////////////////
    /////////// END ////////////
    //////////////////////////


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