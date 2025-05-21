"use client";

import Link from "next/link";

const navLinks = [
  { name: "Shop Fabrics", href: "/fabrics" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { name: "Instagram", href: "#", icon: "📸" },
  { name: "Pinterest", href: "#", icon: "📌" },
];

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Weave & Way</h2>
          <p className="text-gray-400">
            Sustainable fabrics for conscious creators.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="flex space-x-4 text-xl mt-2">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.href} aria-label={social.name} className="hover:text-lime-400">
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Weave & Way. All rights reserved.
      </div>
    </footer>
  );
}
