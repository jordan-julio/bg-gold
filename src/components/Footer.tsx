'use client'
// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { FacebookOutlined, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useState } from "react";

export interface NewsletterSectionProps {
  /** Heading text */
  title?: string;
  /** Sub-heading or description text */
  description?: string;
}

export default function Footer({
  title = 'Latest from BG Gold',
  description = 'Masukkan email untuk berlangganan informasi terbaru dari BG Gold.',
}: NewsletterSectionProps) {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: replace with real submission
    setSubmitted(true);
    setEmail('');
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer
      className="
        bg-gradient-to-b from-[#3a1812] via-[#241e1c] to-[#0f172a]
        text-gray-300
        w-full
      "
    >
      {/* Newsletter block with its own overlay */}
      <div className="relative">
        {/* only this section gets the 60% overlay */}
        <div className="absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-white text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            {title}
          </h2>
          <p className="text-lg md:text-xl">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email"
                  required
                  className="
                    w-full
                    border-b border-white/50
                    bg-transparent
                    py-3 px-2
                    placeholder-white/60
                    focus:outline-none focus:border-white
                    transition-all
                  "
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  border border-white rounded-full
                  font-medium
                  transition duration-300
                  hover:bg-white hover:text-black
                  disabled:opacity-50
                "
                disabled={!email}
              >
                Subscribe
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {submitted && (
              <p className="mt-4 text-green-300 animate-fade-in">
                Terima kasih! Email Anda telah diterima.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Link Grid */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Product", items: ["Features", "Pricing", "Integrations", "Demo"] },
            { title: "Company", items: ["About Us", "Careers", "Press", "Blog"] },
            { title: "Support", items: ["Help Center", "Contact Us", "API Docs", "Status"] },
            { title: "Legal",   items: ["Terms of Service", "Privacy Policy", "Cookie Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              {col.items.map(txt => (
                <Link
                  key={txt}
                  href="/"
                  className="block py-1 hover:text-white transition-colors duration-200"
                >
                  {txt}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Social + Copy */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Image
              src="/Logo-BSA-New-removebg-preview.png"
              alt="BG Gold Logo"
              width={48}
              height={48}
              className="object-contain drop-shadow-lg"
            />
            <span className="ml-3 text-white font-bold text-xl">BG Gold</span>
          </Link>

          <div className="flex space-x-4">
            {[FacebookOutlined, Twitter, Instagram, LinkedIn].map((Icon, i) => (
              <Icon
                key={i}
                className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                fontSize="large"
              />
            ))}
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm py-4">
          © {year} BG Gold. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
