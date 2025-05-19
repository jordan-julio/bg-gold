'use client'
// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { FacebookOutlined, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  // Define footer columns with translation keys
  const footerColumns = [
    { 
      titleKey: 'footer.product', 
      items: [
        { key: 'footer.features', href: '/' },
        { key: 'footer.pricing', href: '/' },
        { key: 'footer.integrations', href: '/' },
        { key: 'footer.demo', href: '/' }
      ] 
    },
    { 
      titleKey: 'footer.company', 
      items: [
        { key: 'footer.aboutUs', href: '/about' },
        { key: 'footer.careers', href: '/careers' },
        { key: 'footer.press', href: '/press' },
        { key: 'footer.blog', href: '/blog' }
      ] 
    },
    { 
      titleKey: 'footer.support', 
      items: [
        { key: 'footer.helpCenter', href: '/help' },
        { key: 'footer.contactUs', href: '/contact' },
        { key: 'footer.apiDocs', href: '/docs' },
        { key: 'footer.status', href: '/status' }
      ] 
    },
    { 
      titleKey: 'footer.legal', 
      items: [
        { key: 'footer.terms', href: '/terms' },
        { key: 'footer.privacy', href: '/privacy' },
        { key: 'footer.cookies', href: '/cookies' }
      ] 
    },
  ];

  // Social media icons with aria-labels
  const socialIcons = [
    { Icon: FacebookOutlined, key: 'footer.facebook', href: 'https://facebook.com' },
    { Icon: Twitter, key: 'footer.twitter', href: 'https://twitter.com' },
    { Icon: Instagram, key: 'footer.instagram', href: 'https://instagram.com' },
    { Icon: LinkedIn, key: 'footer.linkedin', href: 'https://linkedin.com' }
  ];

  return (
    <footer
      className="
        bg-yellow-900/30
        text-gray-300
        w-full
      "
    >
      {/* Link Grid */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map(col => (
            <div key={col.titleKey}>
              <h4 className="text-[#e3e3e3] font-semibold mb-4">{t(col.titleKey)}</h4>
              {col.items.map(item => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block py-1 hover:text-[#e3e3e3] transition-colors duration-200"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Social + Copy */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0" aria-label="BG Gold Homepage">
            <Image
              src="/Logo-BSA-New-removebg-preview.png"
              alt={t('footer.logoAlt')}
              width={48}
              height={48}
              className="object-contain drop-shadow-lg"
            />
            <span className="ml-3 text-[#e3e3e3] font-bold text-xl">BG Gold</span>
          </Link>

          <div className="flex space-x-4">
            {socialIcons.map(({ Icon, key, href }) => (
              <a 
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(key)}
              >
                <Icon
                  className="text-gray-400 hover:text-[#e3e3e3] transition-colors duration-200 cursor-pointer"
                  fontSize="large"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm py-4">
          {t('footer.copyright').replace('{year}', year.toString())}
        </div>
      </div>
    </footer>
  );
}