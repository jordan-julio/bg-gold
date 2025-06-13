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

    //////////////////////////////////////////////////////
    ////////////// CAREERS PAGE //////////////////////////
    // Careers Hero Section
    'careers.hero.title1': 'Build Your Career',
    'careers.hero.title2': 'With BG Gold',
    'careers.hero.description': 'Join Indonesia\'s premier luxury jewelry company and be part of a legacy that spans over 25 years of excellence in craftsmanship and innovation.',
    'careers.hero.cta.positions': 'View Open Positions',
    'careers.hero.cta.whyjoin': 'Why Join Us',

    // Company Values Section
    'careers.values.title': 'Why Choose BG Gold?',
    'careers.values.description': 'Discover what makes BG Gold an exceptional place to build your career',
    'careers.values.excellence.title': 'Excellence in Craftsmanship',
    'careers.values.excellence.description': 'We maintain the highest standards in jewelry design and production, combining traditional techniques with modern innovation.',
    'careers.values.growth.title': 'Professional Growth',
    'careers.values.growth.description': 'Continuous learning and development opportunities to advance your career in the luxury jewelry industry.',
    'careers.values.collaborative.title': 'Collaborative Environment',
    'careers.values.collaborative.description': 'Work alongside talented professionals in a supportive, team-oriented atmosphere.',
    'careers.values.innovation.title': 'Innovation & Tradition',
    'careers.values.innovation.description': 'Balance cutting-edge technology with time-honored craftsmanship techniques.',

    // Statistics Section
    'careers.stats.years': 'Years of Excellence',
    'careers.stats.team': 'Team Members',
    'careers.stats.locations': 'Showroom Locations',
    'careers.stats.customers': 'Happy Customers Daily',

    // Open Positions Section
    'careers.positions.title': 'Open Positions',
    'careers.positions.description': 'Explore our current opportunities and find your perfect role',
    'careers.positions.viewDetails': 'View Details',
    'careers.positions.hideDetails': 'Hide Details',
    'careers.positions.requirements': 'Requirements',
    'careers.positions.benefits': 'What We Offer',
    'careers.positions.apply': 'Apply for This Position',

    // Job Positions
    'careers.job.accounting.title': 'Accounting Staff',
    'careers.job.accounting.department': 'Finance',
    'careers.job.accounting.type': 'Full-time',
    'careers.job.accounting.location': 'Surabaya, Indonesia',
    'careers.job.accounting.description': 'We are seeking a detail-oriented Accounting Staff to join our finance team and help maintain our financial excellence.',
    'careers.job.accounting.req1': 'Female, maximum age 27 years',
    'careers.job.accounting.req2': 'Graduate of D3/S1 Accounting with minimum GPA 3.0',
    'careers.job.accounting.req3': 'Fresh graduate / experience >1 year preferred',
    'careers.job.accounting.req4': 'Understanding of General Ledger, Subsidiary Books, Inventory, Bank Register, Tax, and Excel',
    'careers.job.accounting.req5': 'Mandarin & English language skills (passive & active)',
    'careers.job.accounting.req6': 'Proficient in MS Word, Excel, and Internet',
    'careers.job.accounting.req7': 'Physically and mentally healthy',
    'careers.job.accounting.req8': 'Honest, disciplined, adaptable, responsible, detail-oriented, team player',

    'careers.job.ppic.title': 'PPIC Staff',
    'careers.job.ppic.department': 'Operations',
    'careers.job.ppic.type': 'Full-time',
    'careers.job.ppic.location': 'Surabaya, Indonesia',
    'careers.job.ppic.description': 'Join our operations team as a PPIC Staff to optimize production planning and inventory control processes.',
    'careers.job.ppic.req1': 'Female, maximum age 27 years',
    'careers.job.ppic.req2': 'Graduate of S1 Industrial Engineering / other majors with minimum GPA 3.0',
    'careers.job.ppic.req3': 'Fresh graduate / experience >1 year preferred',
    'careers.job.ppic.req4': 'Proficient in spoken and written English preferred',
    'careers.job.ppic.req5': 'Proficient in MS Word, Excel, and Internet',
    'careers.job.ppic.req6': 'Physically and mentally healthy',
    'careers.job.ppic.req7': 'Honest, disciplined, adaptable, responsible, detail-oriented, team player',

    // Benefits (common for all positions)
    'careers.benefits.salary': 'Competitive salary package',
    'careers.benefits.health': 'Comprehensive health insurance',
    'careers.benefits.bonus': 'Annual performance bonus',
    'careers.benefits.development': 'Professional development programs',
    'careers.benefits.advancement': 'Career advancement opportunities',
    'careers.benefits.environment': 'Positive work environment',
    'careers.benefits.compensation': 'Competitive compensation',
    'careers.benefits.wellness': 'Health and wellness benefits',
    'careers.benefits.incentives': 'Performance-based incentives',
    'careers.benefits.training': 'Training and development',
    'careers.benefits.teambuilding': 'Team building activities',
    'careers.benefits.culture': 'Dynamic work culture',

    // Employee Testimonials
    'careers.testimonials.title': 'What Our Team Says',
    'careers.testimonials.description': 'Hear from our employees about their experience at BG Gold',
    'careers.testimonials.quote1': 'Working at BG Gold has been an incredible journey. The company truly values craftsmanship and innovation.',
    'careers.testimonials.author1': 'ANON',
    'careers.testimonials.role1': 'Senior Designer',
    'careers.testimonials.years1': '5 years at BG Gold',
    'careers.testimonials.quote2': 'The supportive team environment and growth opportunities have helped me advance my career significantly.',
    'careers.testimonials.author2': 'ANON',
    'careers.testimonials.role2': 'Production Manager',
    'careers.testimonials.years2': '3 years at BG Gold',
    'careers.testimonials.quote3': 'BG Gold\'s commitment to excellence and professional development makes it an ideal workplace.',
    'careers.testimonials.author3': 'ANON',
    'careers.testimonials.role3': 'Finance Lead',
    'careers.testimonials.years3': '7 years at BG Gold',

    // CTA Section
    'careers.cta.title': 'Ready to Start Your Journey?',
    'careers.cta.description': 'Take the first step towards a rewarding career with BG Gold. We\'re excited to hear from you.',
    'careers.cta.apply': 'Send Your Application',
    'careers.cta.contact': 'Contact HR Department',
    /////////////// END //////////////////////////////
    //////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    /////////////// CONTACT US PAGE ///////////////////
    'contactus.contactUs': 'CONTACT US',
    'contactus.heroTitle': 'Let\'s Create Something',
    'contactus.heroTitleHighlight': 'Extraordinary',
    'contactus.heroSubtitle': 'Connect with our master craftsmen and jewelry consultants for a personalized experience that brings your vision to life.',
    'contactus.startConversation': 'Start a Conversation',
    'contactus.visitShowrooms': 'Visit Our Showrooms',

    // Contact Methods
    'contactus.multipleWaysTitle': 'Multiple Ways to',
    'contactus.multipleWaysHighlight': 'Connect',
    'contactus.multipleWaysSubtitle': 'Choose your preferred method of communication and let us assist you with your jewelry needs',

    // Contact Cards
    'contactus.visitShowroomsTitle': 'Visit Our Showrooms',
    'contactus.visitShowroomsSubtitle': 'Experience luxury in person',
    'contactus.visitShowroomsDesc': 'Browse our exquisite collection at our premium locations',

    'contactus.whatsappTitle': 'WhatsApp Chat',
    'contactus.whatsappSubtitle': '+62 813 3333 8888',
    'contactus.whatsappDesc': 'Get instant support and personalized assistance',

    'contactus.emailTitle': 'Email Us',
    'contactus.emailSubtitle': 'info@bggold.co.id',
    'contactus.emailDesc': 'Send us your inquiries and we\'ll respond promptly',

    'contactus.callTitle': 'Call Us',
    'contactus.callSubtitle': '+62 31 5912988',
    'contactus.callDesc': 'Speak directly with our jewelry consultants',

    'contactus.getInTouch': 'Get in touch',

    // Contact Form
    'contactus.sendMessageTitle': 'Send Us a',
    'contactus.sendMessageHighlight': 'Message',
    'contactus.sendMessageSubtitle': 'Share your jewelry dreams with us, and we\'ll make them a reality.',
    'contactus.fullName': 'Full Name',
    'contactus.fullNamePlaceholder': 'Enter your full name',
    'contactus.emailAddress': 'Email Address',
    'contactus.emailPlaceholder': 'your@email.com',
    'contactus.yourMessage': 'Your Message',
    'contactus.messagePlaceholder': 'Tell us about your jewelry needs, custom design ideas, or any questions you have...',
    'contactus.sendMessage': 'Send Message',

    // Success Message
    'contactus.successTitle': 'Message Sent Successfully!',
    'contactus.successSubtitle': 'Thank you for reaching out. Our team will contact you within 24 hours.',

    // Office Information
    'contactus.mainOffice': 'Main Office',
    'contactus.officeAddress': 'Jl. Tidar No.23',
    'contactus.officeCity': 'Surabaya 60252, East Java',
    'contactus.officeSchedule': 'Monday - Saturday: 10:00 AM - 9:00 PM',
    'contactus.officeScheduleSunday': 'Sunday: 10:00 AM - 8:00 PM',

    // Social Media
    'contactus.followUs': 'Follow Us',

    // Showrooms Modal
    'contactus.premiumShowrooms': 'Our Premium Showrooms',
    'contactus.royalPlazaName': 'Royal Plaza Showroom',
    'contactus.royalPlazaAddress': 'Ground Floor, Block C Units 12, 15, 22, 26',
    'contactus.royalPlazaFullAddress': 'Royal Plaza Surabaya, Jl. Ahmad Yani No.16-18, Surabaya',
    'contactus.royalPlazaHours': '10:00 AM - 9:00 PM Daily',

    'contactus.pasarAtomName': 'Pasar Atom Showroom',
    'contactus.pasarAtomAddress': '1st Floor, Block A No.59-60',
    'contactus.pasarAtomFullAddress': 'Pasar Atom Mall, Jl. Bunguran No.99, Surabaya',
    'contactus.pasarAtomHours': '10:00 AM - 4:00 PM Daily',

    // Features
    'contactus.premiumCollection': 'Premium Collection',
    'contactus.customDesignStudio': 'Custom Design Studio',
    'contactus.vipConsultation': 'VIP Consultation',
    'contactus.classicCollection': 'Classic Collection',
    'contactus.repairServices': 'Repair Services',
    'contactus.goldTrading': 'Gold Trading',

    'contactus.availableServices': 'Available Services:',
    'contactus.viewOnMap': 'View on Map',

    // Private Consultation  
    'contactus.bookPrivateConsultation': 'Book a Private Consultation',
    'contactus.bookPrivateDesc': 'Schedule a one-on-one appointment with our jewelry experts for personalized service and exclusive access to our premium collections.',
    'contactus.bookNowWhatsApp': 'Book Now via WhatsApp',
    
    // WhatsApp Messages
    'contactus.whatsappHello': 'Hello, I\'m interested in your jewelry collection',
    'contactus.whatsappConsultation': 'Hello, I\'d like to book a private consultation at your showroom',
    
    // Email Subject
    'contactus.emailSubject': 'Jewelry Inquiry',

    ///////////////////////////////////
    ///////////////// END /////////////

        
    // Events section
    'events.title': 'Upcoming Events',
    'events.feature': 'Featured',
    'events.nextevent': 'Next Event',
    
    // Footer section
    'footer.collections': 'Collections',
    'footer.classicCollection': 'BG Classic',
    'footer.signatureCollection': 'BG Signature',
    'footer.dailyCollection': 'BG Daily',
    'footer.customDesign': 'Custom Design',
    'footer.weddingRings': 'Wedding Rings',
    
    'footer.services': 'Services',
    'footer.customJewelry': 'Custom Jewelry',
    'footer.jewelryRepair': 'Jewelry Repair',
    'footer.goldTrading': 'Gold Trading',
    'footer.appraisal': 'Jewelry Appraisal',
    'footer.consultation': 'Consultation',
    
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.ourStory': 'Our Story',
    'footer.careers': 'Careers',
    'footer.showrooms': 'Showrooms',
    'footer.news': 'News & Events',
    
    'footer.support': 'Customer Care',
    'footer.contactUs': 'Contact Us',
    'footer.howtoshop': 'How to Shop',
    'footer.careGuide': 'Jewelry Care',
    'footer.sizeGuide': 'Size Guide',
    'footer.warranty': 'Warranty',
    
    'footer.newsletter.title': 'Stay Connected with BG Gold',
    'footer.newsletter.description': 'Subscribe to receive exclusive updates about new collections, special offers, and jewelry care tips.',
    'footer.newsletter.placeholder': 'Enter your email address',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.newsletter.privacy': 'We respect your privacy and will never share your information.',
    
    'footer.tagline': 'Crafting Excellence Since 2003',
    'footer.description': 'BG Gold has been Indonesia\'s premier jewelry manufacturer for over 20 years, creating exquisite gold jewelry that combines traditional craftsmanship with contemporary design.',
    
    'footer.contact.office': 'Head Office',
    'footer.contact.phone': 'Phone & WhatsApp',
    'footer.contact.email': 'Email & Hours',
    'footer.contact.hours': 'Mon-Sat: 10AM-9PM',
    
    'footer.followUs': 'Follow Us',
    'footer.certifications.authentic': 'Authentic Gold',
    'footer.certifications.secure': 'Secure Shopping',
    'footer.certifications.since2003': 'Trusted Since 2003',
    
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    
    'footer.facebook': 'Visit our Facebook page',
    'footer.twitter': 'Follow us on Twitter',
    'footer.instagram': 'Follow us on Instagram',
    'footer.linkedin': 'Connect with us on LinkedIn',
    
    'footer.logoAlt': 'BG Gold Logo',
    'footer.copyright': '© {year} PT. Bagong Sejahtera Abadi. All rights reserved.',

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
     'timeline.2025.title': 'Saat Ini',
     'timeline.2025.description': '22+ tahun dedikasi dalam keunggulan perhiasan',
 
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
    'product.types.expression': ' ',
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
    'product.cta.title2': ' ',
    'product.cta.description': 'Perjalananmu menuju kemewahan dimulai dengan satu langkah. Biarkan pengrajin kami merancang ceritamu.',
    'product.cta.button.shop': 'Belanja Koleksi',
    'product.cta.button.book': 'Pesan Konsultasi',
    //////////////////////////////
    /////////// END ////////////
    //////////////////////////

    //////////////////////////////////////////////////////
    ////////////// CAREERS PAGE //////////////////////////
    // Careers Hero Section
    'careers.hero.title1': 'Bangun Karirmu',
    'careers.hero.title2': 'Bersama BG Gold',
    'careers.hero.description': 'Bergabunglah dengan perusahaan perhiasan mewah terkemuka di Indonesia dan jadilah bagian dari warisan yang telah membentang lebih dari 25 tahun keunggulan dalam kerajinan dan inovasi.',
    'careers.hero.cta.positions': 'Lihat Posisi Terbuka',
    'careers.hero.cta.whyjoin': 'Mengapa Bergabung',

    // Company Values Section
    'careers.values.title': 'Mengapa Memilih BG Gold?',
    'careers.values.description': 'Temukan apa yang membuat BG Gold menjadi tempat yang luar biasa untuk membangun karir Anda',
    'careers.values.excellence.title': 'Keunggulan dalam Kerajinan',
    'careers.values.excellence.description': 'Kami mempertahankan standar tertinggi dalam desain dan produksi perhiasan, menggabungkan teknik tradisional dengan inovasi modern.',
    'careers.values.growth.title': 'Pertumbuhan Profesional',
    'careers.values.growth.description': 'Kesempatan pembelajaran dan pengembangan berkelanjutan untuk memajukan karir Anda di industri perhiasan mewah.',
    'careers.values.collaborative.title': 'Lingkungan Kolaboratif',
    'careers.values.collaborative.description': 'Bekerja bersama profesional berbakat dalam suasana yang mendukung dan berorientasi tim.',
    'careers.values.innovation.title': 'Inovasi & Tradisi',
    'careers.values.innovation.description': 'Menyeimbangkan teknologi canggih dengan teknik kerajinan yang telah teruji waktu.',

    // Statistics Section
    'careers.stats.years': 'Tahun Keunggulan',
    'careers.stats.team': 'Anggota Tim',
    'careers.stats.locations': 'Lokasi Showroom',
    'careers.stats.customers': 'Pelanggan Senang Setiap Hari',

    // Open Positions Section
    'careers.positions.title': 'Posisi Terbuka',
    'careers.positions.description': 'Jelajahi peluang terkini kami dan temukan peran yang sempurna untuk Anda',
    'careers.positions.viewDetails': 'Lihat Detail',
    'careers.positions.hideDetails': 'Sembunyikan Detail',
    'careers.positions.requirements': 'Persyaratan',
    'careers.positions.benefits': 'Yang Kami Tawarkan',
    'careers.positions.apply': 'Lamar Posisi Ini',

    // Job Positions
    'careers.job.accounting.title': 'Staff Akuntansi',
    'careers.job.accounting.department': 'Keuangan',
    'careers.job.accounting.type': 'Penuh Waktu',
    'careers.job.accounting.location': 'Surabaya, Indonesia',
    'careers.job.accounting.description': 'Kami mencari Staff Akuntansi yang detail untuk bergabung dengan tim keuangan kami dan membantu mempertahankan keunggulan finansial kami.',
    'careers.job.accounting.req1': 'Perempuan, usia maksimal 27 tahun',
    'careers.job.accounting.req2': 'Lulusan D3/S1 Akuntansi dengan IPK Min. 3',
    'careers.job.accounting.req3': 'Fresh graduated / berpengalaman >1 tahun disukai',
    'careers.job.accounting.req4': 'Mengerti General Ledger, Buku Pembantu, Persediaan, Register Bank, Pajak, dan Excel',
    'careers.job.accounting.req5': 'Bahasa Mandarin & Inggris (pasif & aktif)',
    'careers.job.accounting.req6': 'Menguasai Ms. Word, Excel, dan Internet',
    'careers.job.accounting.req7': 'Sehat jasmani & rohani',
    'careers.job.accounting.req8': 'Jujur, disiplin, cepat adaptasi, bertanggung jawab, teliti, team player',

    'careers.job.ppic.title': 'Staff PPIC',
    'careers.job.ppic.department': 'Operasional',
    'careers.job.ppic.type': 'Penuh Waktu',
    'careers.job.ppic.location': 'Surabaya, Indonesia',
    'careers.job.ppic.description': 'Bergabunglah dengan tim operasional kami sebagai Staff PPIC untuk mengoptimalkan proses perencanaan produksi dan kontrol inventori.',
    'careers.job.ppic.req1': 'Perempuan, usia maksimal 27 tahun',
    'careers.job.ppic.req2': 'Lulusan S1 Teknik Industri / jurusan lainnya IPK Min. 3',
    'careers.job.ppic.req3': 'Fresh graduated / berpengalaman >1 tahun disukai',
    'careers.job.ppic.req4': 'Mahir berbahasa Inggris lisan & tulisan disukai',
    'careers.job.ppic.req5': 'Menguasai Ms. Word, Excel, dan Internet',
    'careers.job.ppic.req6': 'Sehat jasmani & rohani',
    'careers.job.ppic.req7': 'Jujur, disiplin, cepat adaptasi, bertanggung jawab, teliti, team player',

    // Benefits (common for all positions)
    'careers.benefits.salary': 'Paket gaji kompetitif',
    'careers.benefits.health': 'Asuransi kesehatan komprehensif',
    'careers.benefits.bonus': 'Bonus kinerja tahunan',
    'careers.benefits.development': 'Program pengembangan profesional',
    'careers.benefits.advancement': 'Peluang kemajuan karir',
    'careers.benefits.environment': 'Lingkungan kerja positif',
    'careers.benefits.compensation': 'Kompensasi kompetitif',
    'careers.benefits.wellness': 'Tunjangan kesehatan dan kebugaran',
    'careers.benefits.incentives': 'Insentif berbasis kinerja',
    'careers.benefits.training': 'Pelatihan dan pengembangan',
    'careers.benefits.teambuilding': 'Aktivitas team building',
    'careers.benefits.culture': 'Budaya kerja yang dinamis',

    // Employee Testimonials
    'careers.testimonials.title': 'Kata Tim Kami',
    'careers.testimonials.description': 'Dengarkan dari karyawan kami tentang pengalaman mereka di BG Gold',
    'careers.testimonials.quote1': 'Bekerja di BG Gold telah menjadi perjalanan yang luar biasa. Perusahaan benar-benar menghargai kerajinan dan inovasi.',
    'careers.testimonials.author1': 'ANONIM',
    'careers.testimonials.role1': 'Senior Designer',
    'careers.testimonials.years1': '5 tahun di BG Gold',
    'careers.testimonials.quote2': 'Lingkungan tim yang mendukung dan peluang pertumbuhan telah membantu saya memajukan karir secara signifikan.',
    'careers.testimonials.author2': 'ANONIM',
    'careers.testimonials.role2': 'Manajer Produksi',
    'careers.testimonials.years2': '3 tahun di BG Gold',
    'careers.testimonials.quote3': 'Komitmen BG Gold terhadap keunggulan dan pengembangan profesional menjadikannya tempat kerja yang ideal.',
    'careers.testimonials.author3': 'ANONIM',
    'careers.testimonials.role3': 'Kepala Keuangan',
    'careers.testimonials.years3': '7 tahun di BG Gold',

    // CTA Section
    'careers.cta.title': 'Siap Memulai Perjalanan Anda?',
    'careers.cta.description': 'Ambil langkah pertama menuju karir yang memuaskan dengan BG Gold. Kami sangat senang mendengar dari Anda.',
    'careers.cta.apply': 'Kirim Lamaran Anda',
    'careers.cta.contact': 'Hubungi Departemen HR',
    /////////////// END //////////////////////////////
    //////////////////////////////////////////////////

    
    'contactus.contactUs': 'HUBUNGI KAMI',
    'contactus.heroTitle': 'Mari Ciptakan Sesuatu yang',
    'contactus.heroTitleHighlight': 'Luar Biasa',
    'contactus.heroSubtitle': 'Terhubung dengan ahli perhiasan dan konsultan kami untuk pengalaman personal yang mewujudkan visi Anda.',
    'contactus.startConversation': 'Mulai Percakapan',
    'contactus.visitShowrooms': 'Kunjungi Showroom Kami',

    // Contact Methods
    'contactus.multipleWaysTitle': 'Berbagai Cara untuk',
    'contactus.multipleWaysHighlight': 'Terhubung',
    'contactus.multipleWaysSubtitle': 'Pilih metode komunikasi yang Anda sukai dan biarkan kami membantu kebutuhan perhiasan Anda',

    // Contact Cards
    'contactus.visitShowroomsTitle': 'Kunjungi Showroom Kami',
    'contactus.visitShowroomsSubtitle': 'Rasakan kemewahan secara langsung',
    'contactus.visitShowroomsDesc': 'Jelajahi koleksi eksklusif kami di lokasi premium',

    'contactus.whatsappTitle': 'Chat WhatsApp',
    'contactus.whatsappSubtitle': '+62 813 3333 8888',
    'contactus.whatsappDesc': 'Dapatkan dukungan instan dan bantuan personal',

    'contactus.emailTitle': 'Email Kami',
    'contactus.emailSubtitle': 'info@bggold.co.id',
    'contactus.emailDesc': 'Kirim pertanyaan Anda dan kami akan merespons dengan cepat',

    'contactus.callTitle': 'Telepon Kami',
    'contactus.callSubtitle': '+62 31 5912988',
    'contactus.callDesc': 'Berbicara langsung dengan konsultan perhiasan kami',

    'contactus.getInTouch': 'Hubungi kami',

    // Contact Form
    'contactus.sendMessageTitle': 'Kirim',
    'contactus.sendMessageHighlight': 'Pesan',
    'contactus.sendMessageSubtitle': 'Bagikan impian perhiasan Anda dengan kami, dan kami akan mewujudkannya.',
    'contactus.fullName': 'Nama Lengkap',
    'contactus.fullNamePlaceholder': 'Masukkan nama lengkap Anda',
    'contactus.emailAddress': 'Alamat Email',
    'contactus.emailPlaceholder': 'email@anda.com',
    'contactus.yourMessage': 'Pesan Anda',
    'contactus.messagePlaceholder': 'Ceritakan tentang kebutuhan perhiasan, ide desain kustom, atau pertanyaan yang Anda miliki...',
    'contactus.sendMessage': 'Kirim Pesan',

    // Success Message
    'contactus.successTitle': 'Pesan Berhasil Terkirim!',
    'contactus.successSubtitle': 'Terima kasih telah menghubungi kami. Tim kami akan menghubungi Anda dalam 24 jam.',

    // Office Information
    'contactus.mainOffice': 'Kantor Pusat',
    'contactus.officeAddress': 'Jl. Tidar No.23',
    'contactus.officeCity': 'Surabaya 60252, Jawa Timur',
    'contactus.officeSchedule': 'Senin - Sabtu: 10:00 - 21:00',
    'contactus.officeScheduleSunday': 'Minggu: 10:00 - 20:00',

    // Social Media
    'contactus.followUs': 'Ikuti Kami',

    // Showrooms Modal
    'contactus.premiumShowrooms': 'Showroom Premium Kami',
    'contactus.royalPlazaName': 'Showroom Royal Plaza',
    'contactus.royalPlazaAddress': 'Lantai Dasar, Blok C Unit 12, 15, 22, 26',
    'contactus.royalPlazaFullAddress': 'Royal Plaza Surabaya, Jl. Ahmad Yani No.16-18, Surabaya',
    'contactus.royalPlazaHours': '10:00 - 21:00 Setiap Hari',

    'contactus.pasarAtomName': 'Showroom Pasar Atom',
    'contactus.pasarAtomAddress': 'Lantai 1, Blok A No.59-60',
    'contactus.pasarAtomFullAddress': 'Pasar Atom Mall, Jl. Bunguran No.99, Surabaya',
    'contactus.pasarAtomHours': '10:00 - 16:00 Setiap Hari',

    // Features
    'contactus.premiumCollection': 'Koleksi Premium',
    'contactus.customDesignStudio': 'Studio Desain Kustom',
    'contactus.vipConsultation': 'Konsultasi VIP',
    'contactus.classicCollection': 'Koleksi Klasik',
    'contactus.repairServices': 'Layanan Perbaikan',
    'contactus.goldTrading': 'Perdagangan Emas',

    'contactus.availableServices': 'Layanan Tersedia:',
    'contactus.viewOnMap': 'Lihat di Peta',

    // Private Consultation  
    'contactus.bookPrivateConsultation': 'Pesan Konsultasi Pribadi',
    'contactus.bookPrivateDesc': 'Jadwalkan janji temu dengan ahli perhiasan kami untuk layanan personal dan akses eksklusif ke koleksi premium.',
    'contactus.bookNowWhatsApp': 'Pesan Sekarang via WhatsApp',
    
    // WhatsApp Messages
    'contactus.whatsappHello': 'Halo, saya tertarik dengan koleksi perhiasan Anda',
    'contactus.whatsappConsultation': 'Halo, saya ingin memesan konsultasi pribadi di showroom Anda',
    
    // Email Subject
    'contactus.emailSubject': 'Pertanyaan Perhiasan',

    // Events section
    'events.title': 'Acara Mendatang',
    'events.feature': 'Fitur',
    'events.nextevent': 'Event Berikutnya',
    
    // Newsletter section
    'newsletter.title': 'Terbaru dari BG Gold',
    'newsletter.description': 'Masukkan email untuk berlangganan informasi terbaru dari BG Gold.',
    'newsletter.placeholder': 'Email Anda',
    'newsletter.email': 'Alamat email',
    'newsletter.button': 'Berlangganan',
    'newsletter.success': 'Terima kasih! Email Anda telah diterima.',
    
    // Footer section
    'footer.collections': 'Koleksi',
    'footer.classicCollection': 'BG Classic',
    'footer.signatureCollection': 'BG Signature',
    'footer.dailyCollection': 'BG Daily',
    'footer.customDesign': 'Desain Kustom',
    'footer.weddingRings': 'Cincin Pernikahan',

    'footer.services': 'Layanan',
    'footer.customJewelry': 'Perhiasan Kustom',
    'footer.jewelryRepair': 'Perbaikan Perhiasan',
    'footer.goldTrading': 'Perdagangan Emas',
    'footer.appraisal': 'Penilaian Perhiasan',
    'footer.consultation': 'Konsultasi',

    'footer.company': 'Perusahaan',
    'footer.aboutUs': 'Tentang Kami',
    'footer.ourStory': 'Cerita Kami',
    'footer.careers': 'Karir',
    'footer.showrooms': 'Showroom',
    'footer.news': 'Berita & Acara',

    'footer.support': 'Layanan Pelanggan',
    'footer.contactUs': 'Hubungi Kami',
    'footer.howtoshop': 'Cara Belanja',
    'footer.careGuide': 'Perawatan Perhiasan',
    'footer.sizeGuide': 'Panduan Ukuran',
    'footer.warranty': 'Garansi',

    'footer.newsletter.title': 'Tetap Terhubung dengan BG Gold',
    'footer.newsletter.description': 'Berlangganan untuk menerima update eksklusif tentang koleksi baru, penawaran khusus, dan tips perawatan perhiasan.',
    'footer.newsletter.placeholder': 'Masukkan alamat email Anda',
    'footer.newsletter.subscribe': 'Berlangganan',
    'footer.newsletter.privacy': 'Kami menghormati privasi Anda dan tidak akan membagikan informasi Anda.',

    'footer.tagline': 'Mengukir Keunggulan Sejak 2003',
    'footer.description': 'BG Gold telah menjadi produsen perhiasan terkemuka di Indonesia selama lebih dari 20 tahun, menciptakan perhiasan emas eksklusif yang menggabungkan keahlian tradisional dengan desain kontemporer.',

    'footer.contact.office': 'Kantor Pusat',
    'footer.contact.phone': 'Telepon & WhatsApp',
    'footer.contact.email': 'Email & Jam Operasional',
    'footer.contact.hours': 'Sen-Sab: 10:00-21:00',

    'footer.followUs': 'Ikuti Kami',
    'footer.certifications.authentic': 'Emas Asli',
    'footer.certifications.secure': 'Belanja Aman',
    'footer.certifications.since2003': 'Terpercaya Sejak 2003',

    'footer.terms': 'Syarat Layanan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.cookies': 'Kebijakan Cookie',

    'footer.facebook': 'Kunjungi halaman Facebook kami',
    'footer.twitter': 'Ikuti kami di Twitter',
    'footer.instagram': 'Ikuti kami di Instagram',
    'footer.linkedin': 'Terhubung dengan kami di LinkedIn',

    'footer.logoAlt': 'Logo BG Gold',
    'footer.copyright': '© {year} PT. Bagong Sejahtera Abadi. Seluruh hak cipta dilindungi undang-undang.',

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