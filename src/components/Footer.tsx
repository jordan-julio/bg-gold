'use client'
// components/Footer.tsx
import Link from "next/link";
import { FacebookOutlined, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  // Define footer columns with translation keys appropriate for jewelry business
  const footerColumns = [
    { 
      titleKey: 'footer.collections', 
      items: [
        { key: 'footer.classicCollection', href: '/products#classic' },
        { key: 'footer.signatureCollection', href: '/products#signature' },
        { key: 'footer.dailyCollection', href: '/products#daily' },
        { key: 'footer.customDesign', href: '/products#custom' },
        { key: 'footer.weddingRings', href: '/products#wedding' }
      ] 
    },
    { 
      titleKey: 'footer.services', 
      items: [
        { key: 'footer.customJewelry', href: '/services/custom' },
        { key: 'footer.jewelryRepair', href: '/services/repair' },
        { key: 'footer.goldTrading', href: '/services/trading' },
        { key: 'footer.appraisal', href: '/services/appraisal' },
        { key: 'footer.consultation', href: '/services/consultation' }
      ] 
    },
    { 
      titleKey: 'footer.company', 
      items: [
        { key: 'footer.aboutUs', href: '/about' },
        { key: 'footer.ourStory', href: '/about#story' },
        { key: 'footer.careers', href: '/careers' },
        { key: 'footer.showrooms', href: '/contact#locations' },
        { key: 'footer.news', href: '/news' }
      ] 
    },
    { 
      titleKey: 'footer.support', 
      items: [
        { key: 'footer.contactUs', href: '/contact' },
        { key: 'footer.howtoshop', href: '/howtoshop' },
        { key: 'footer.careGuide', href: '/care-guide' },
        { key: 'footer.sizeGuide', href: '/size-guide' },
        { key: 'footer.warranty', href: '/warranty' }
      ] 
    }
  ];

  // Social media icons with actual BG Gold social links
  const socialIcons = [
    { Icon: FacebookOutlined, key: 'footer.facebook', href: 'https://facebook.com/bggold' },
    { Icon: Instagram, key: 'footer.instagram', href: 'https://instagram.com/bggold_official' },
    { Icon: Twitter, key: 'footer.twitter', href: 'https://twitter.com/bggold' },
    { Icon: LinkedIn, key: 'footer.linkedin', href: 'https://linkedin.com/company/bg-gold' }
  ];

  return (
    <footer className="bg-yellow-900/30 text-gray-300 w-full border-t border-amber-600/20">
      {/* Newsletter Section */}
      {/** 
      <div className="bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">{t('footer.newsletter.title')}</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{t('footer.newsletter.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              className="flex-1 px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 text-white placeholder-gray-400"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-600/20 transition-all duration-300">
              {t('footer.newsletter.subscribe')}
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">{t('footer.newsletter.privacy')}</p>
        </div>
      </div>*/}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Company Info Section 
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center mb-6" aria-label="BG Gold Homepage">
            <Image
              src="/Logo-BSA-New-removebg-preview.png"
              alt={t('footer.logoAlt')}
              width={64}
              height={64}
              className="object-contain drop-shadow-lg"
            />
            <div className="ml-4">
              <span className="text-amber-500 font-bold text-3xl block">BG Gold</span>
              <span className="text-gray-400 text-sm">{t('footer.tagline')}</span>
            </div>
          </Link>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('footer.description')}
          </p>
        </div>
*/}
        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerColumns.map(col => (
            <div key={col.titleKey}>
              <h4 className="text-amber-500 font-semibold mb-4 text-lg">{t(col.titleKey)}</h4>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h5 className="text-amber-500 font-semibold mb-3">{t('footer.contact.office')}</h5>
              <p className="text-gray-300 text-sm">
                Jl. Tidar No.23<br />
                Surabaya 60252, East Java<br />
                Indonesia
              </p>
            </div>
            <div>
              <h5 className="text-amber-500 font-semibold mb-3">{t('footer.contact.phone')}</h5>
              <p className="text-gray-300 text-sm">
                <a href="tel:+62315912988" className="hover:text-amber-400 transition-colors">
                  +62 31 5912988
                </a><br />
                <a href="https://wa.me/6281333338888" className="hover:text-amber-400 transition-colors">
                  WhatsApp: +62 813 3333 8888
                </a>
              </p>
            </div>
            <div>
              <h5 className="text-amber-500 font-semibold mb-3">{t('footer.contact.email')}</h5>
              <p className="text-gray-300 text-sm">
                <a href="mailto:info@bggold.co.id" className="hover:text-amber-400 transition-colors">
                  info@bggold.co.id
                </a><br />
                <span className="text-gray-400">{t('footer.contact.hours')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & Trust Badges */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h5 className="text-amber-500 font-semibold mb-3 text-center md:text-left">{t('footer.followUs')}</h5>
              <div className="flex space-x-4 justify-center md:justify-start">
                {socialIcons.map(({ Icon, key, href }) => (
                  <a 
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(key)}
                    className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300 group"
                  >
                    <Icon className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('footer.certifications.authentic')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>{t('footer.certifications.secure')}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {t('footer.certifications.since2003')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-yellow-900/30 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              {t('footer.copyright').replace('{year}', year.toString())}
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="hover:text-amber-400 transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/cookies" className="hover:text-amber-400 transition-colors">
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}