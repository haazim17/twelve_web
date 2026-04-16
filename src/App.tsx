/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ReactNode, useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Globe, 
  Headphones, 
  Smartphone, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Cable,
  Plug,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  icon: ReactNode;
  description: string;
  badge?: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  { id: 1, name: 'PULSE 45W', category: 'Fast Chargers', icon: <Plug className="w-16 h-16" />, description: 'Slim 45W charger for phones, tablets and power on the go.' },
  { id: 2, name: 'PULSE 65W', category: 'Fast Chargers', icon: <Zap className="w-16 h-16" />, description: 'High-performance 65W charger for laptops, phones and more.', badge: 'Featured' },
  { id: 3, name: 'DRIVE CHARGE', category: 'Car Chargers', icon: <Plug className="w-16 h-16" />, description: 'Sleek in-car USB-C charger for reliable power when you travel.' },
  { id: 4, name: 'LIGHTSPEED', category: 'Lightning Cables', icon: <Cable className="w-16 h-16" />, description: 'Durable Lightning cable built for fast sync and dependable charging.' },
  { id: 5, name: 'DUALC', category: 'C to C Cables', icon: <Cable className="w-16 h-16" />, description: 'Premium USB-C to USB-C cable for high-speed charging and data transfer.', badge: 'Best Seller' },
  { id: 6, name: 'FLEX CABLE', category: 'C to C Cables', icon: <Cable className="w-16 h-16" />, description: 'Flexible braided USB-C cable engineered for everyday durability.' },
];

// --- Components ---

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(animateRing);
    };

    frame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="fixed w-10 h-10 border border-gold/20 rounded-full -translate-x-1/2 -translate-y-1/2 z-[9998]"
      />
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 z-[9999]"
      />
    </div>
  );
};

const Navbar = ({ activeSection, onNavClick }: { activeSection: string, onNavClick: (id: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-surface bg-surface/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-6 lg:px-14">
        <button
          type="button"
          onClick={() => onNavClick('home')}
          className="flex items-center text-ink transition hover:text-gold"
        >
          <img
            src="/assets/logo-wordmark.png"
            alt="TWELVE"
            style={{ height: '40px' }}
            className="w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </button>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {['home', 'products', 'vision', 'about', 'contact'].map((item) => (
            <li key={item}>
              <button
                onClick={() => onNavClick(item)}
                className={`font-body text-[12px] font-medium tracking-[0.22em] uppercase transition-colors relative cursor-none group ${
                  activeSection === item ? 'text-ink' : 'text-soft hover:text-ink'
                }`}
              >
                {item}
                <span className={`absolute left-0 -bottom-1 h-px bg-gold transition-all duration-300 ${
                  activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden flex items-center justify-center rounded-xl border border-border bg-bg/70 p-3 text-ink transition hover:border-gold hover:text-gold"
          onClick={() => onNavClick('menu')}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: (id: string) => void }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-surface border-b border-border py-24 px-6 lg:px-14">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(42,143,143,0.14)_0%,_transparent_70%)] opacity-90" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] opacity-90" />
      <div className="mx-auto max-w-[1320px] grid gap-14 lg:grid-cols-[1.2fr_0.9fr] items-start">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.25em] uppercase text-gold">
            <span className="w-12 h-px bg-gold" /> Dubai · Est. 2024
          </div>

          <h1 className="font-display text-5xl lg:text-[5.25rem] tracking-tight leading-[0.95] text-ink">
            Premium accessories designed for performance, precision and everyday life.
          </h1>

          <p className="text-[15px] text-soft leading-8 font-light max-w-[680px]">
            Twelve crafts modern mobile essentials with a refined look, dependable function and lasting quality. Discover power, sound and connectivity built to support your day.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onCtaClick('products')}
              className="rounded-xl bg-gold px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-bg shadow-[0_20px_60px_rgba(42,143,143,0.2)] transition duration-300 hover:bg-gold-lt focus:outline-none focus:ring-2 focus:ring-gold cursor-none"
            >
              Shop the collection
            </button>
            <button
              onClick={() => onCtaClick('vision')}
              className="rounded-xl border border-border bg-bg/80 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition duration-300 hover:border-gold hover:bg-gold/5 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/20 cursor-none"
            >
              See the vision
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {[
              { value: 'Dubai HQ', label: 'Designed locally' },
              { value: 'Fast-Ship', label: 'Ready to go' },
              { value: '5-Star', label: 'Trusted quality' }
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface px-6 py-7 text-left transition duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <div>
                  <div className="text-sm font-semibold tracking-[0.18em] text-ink mb-2">{item.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted">{item.label}</div>
                </div>
                <span className="mt-6 inline-flex h-0.5 w-10 rounded-full bg-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg p-10 lg:p-12">
          <div className="mb-10">
            <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-3">Spotlight</div>
            <div className="font-display text-4xl lg:text-[4.5rem] leading-[1.02] text-ink mb-5">PULSE 65W</div>
            <p className="text-sm text-soft leading-7">A travel-ready charger with a premium finish, fast charging and compact design for on-the-go use.</p>
          </div>

          <div className="grid gap-4 items-stretch">
            {[
              { icon: <Zap className="w-5 h-5" />, title: 'GaN Fast Charge', description: 'Up to 65W performance in a sleek package.' },
              { icon: <Cable className="w-5 h-5" />, title: 'Travel Ready', description: 'Lightweight and reliable for life on the move.' },
              { icon: <Smartphone className="w-5 h-5" />, title: 'Universal', description: 'Works with most USB-C devices and power delivery systems.' }
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
                <div className="mt-1 text-gold">{feature.icon}</div>
                <div>
                  <div className="font-semibold text-ink">{feature.title}</div>
                  <div className="text-xs text-muted leading-6">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
    >
      {product.badge && (
        <div className="absolute top-5 right-5 z-10 rounded-full bg-gold px-3.5 py-2 text-[9px] font-semibold tracking-[0.18em] uppercase text-bg">
          {product.badge}
        </div>
      )}
      <div className="p-8">
        <div className="mb-8 flex h-[220px] items-center justify-center rounded-xl border border-border bg-surface">
          <div className="text-gold text-[4.5rem]">
            {product.icon}
          </div>
        </div>

        <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">{product.category}</div>
        <div className="font-display text-3xl tracking-tight text-ink mb-4">{product.name}</div>
        <p className="text-sm text-soft leading-7 mb-6">{product.description}</p>

        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted">{product.category}</span>
          <button className="rounded-lg border border-gold bg-bg/90 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition duration-300 hover:bg-gold/10 hover:text-bg focus:outline-none focus:ring-2 focus:ring-gold cursor-none">
            View details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Vision = () => {
  return (
    <section id="vision" className="py-24 px-6 lg:px-14">
      <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div>
          <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-2.5">Our vision</div>
          <div className="font-display text-5xl lg:text-[5rem] tracking-tight leading-[0.95] text-ink mb-6">Design, fuel and deliver the essentials for modern device life.</div>
          <p className="text-[15px] text-soft leading-8 font-light max-w-2xl">
            We believe accessories should feel as premium as the devices they power. Every Twelve product is chosen for its craftsmanship, durability and ability to enhance daily routines.
          </p>
          <div className="mt-10 grid gap-4 items-stretch">
            {[
              { icon: <Globe className="w-5 h-5" />, title: 'Global first', description: 'Designed in Dubai with wider launch plans on the horizon.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Powerful by design', description: 'Premium charging and audio gear built for modern users.' },
              { icon: <Headphones className="w-5 h-5" />, title: 'Simplicity meets craft', description: 'Clean look, thoughtful materials, and everyday performance.' }
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
                <div className="mt-1 text-gold">{item.icon}</div>
                <div>
                  <div className="font-semibold text-ink mb-2">{item.title}</div>
                  <div className="text-sm text-muted leading-7 font-light">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 items-stretch">
          {[
            { value: '08', label: 'Cities', note: 'Near future launch coverage' },
            { value: '4', label: 'Categories', note: 'Fast chargers, car chargers, Lightning cables, C to C cables' },
            { value: '100%', label: 'Curated', note: 'Every product approved by our team' }
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-border bg-surface p-8">
              <div className="text-[46px] font-display tracking-[2px] text-gold mb-4">{card.value}</div>
              <div className="text-sm uppercase tracking-[0.25em] text-muted mb-3">{card.label}</div>
              <div className="text-[13px] text-soft leading-7 font-light">{card.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3 items-stretch">
        {[
          { title: 'Design-led', text: 'Clean, sophisticated styling that feels premium in any workspace or travel kit.' },
          { title: 'Reliable', text: 'Durable components and quality assurance for every product we introduce.' },
          { title: 'Accessible', text: 'Straightforward buying, real shipping and clear support with every order.' }
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-bg p-8">
            <div className="font-display text-2xl tracking-[0.08em] text-ink mb-3">{item.title}</div>
            <div className="text-sm text-muted leading-7 font-light">{item.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 lg:px-14 bg-surface border-t border-border">
      <div className="grid gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-6">
          <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold">Brand story</div>
          <h2 className="font-display text-5xl lg:text-[5rem] tracking-tight leading-[0.95] text-ink">Around here, great accessories are built for real people.</h2>
          <p className="text-[15px] text-soft leading-8 font-light max-w-2xl">
            Twelve is a Dubai-born mobile accessories brand with a simple promise: bring premium quality, distinctive design and effortless function to everyday tech.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 items-stretch">
            {[
              { title: 'Curated range', text: 'The collection stays tight so each item earns its place.' },
              { title: 'Thoughtful materials', text: 'Strong finishes, dependable construction, minimal visual clutter.' },
              { title: 'Accessible support', text: 'Clear communication, fast dispatch and helpful customer care.' },
              { title: 'Future ready', text: 'A lineup built around modern charging, connectivity and audio.' }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border p-6">
                <div className="font-semibold text-ink mb-1">{item.title}</div>
                <div className="text-sm text-muted leading-7 font-light">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg p-10">
          <div className="mb-6 text-[10px] font-medium tracking-[0.25em] uppercase text-gold">Founder note</div>
          <div className="font-serif text-3xl italic leading-[1.2] text-ink mb-6">
            "Twelve is where premium design meets everyday readiness — products that feel as good as they perform."
          </div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted">— Shafnas Valiyakath Kovath</div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 lg:px-14 bg-surface border-t border-border">
      <div className="grid gap-14 lg:grid-cols-2 items-start">
        <div>
          <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-2.5">Get in touch</div>
          <h2 className="font-display text-5xl lg:text-[5rem] tracking-tight leading-[0.95] text-ink mb-10">Ready to connect with Twelve?</h2>
          <p className="text-[15px] text-soft leading-8 font-light max-w-2xl mb-10">
            Whether you want product details, retail partnerships, or custom inquiries, our team is here to help. Reach out and we'll respond quickly.
          </p>

          <div className="grid gap-4 items-stretch">
            {[
              { icon: <MapPin className="w-4 h-4" />, label: 'Headquarters', val: 'Dubai, United Arab Emirates' },
              { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', val: '@twelve_global' },
              { icon: <Mail className="w-4 h-4" />, label: 'Email', val: 'twelve1212@gmail.com' },
              { icon: <Phone className="w-4 h-4" />, label: 'Phone', val: '+971 52 810 3123' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5 items-start rounded-2xl border border-border bg-bg p-6">
                <div className="mt-1 text-gold">{item.icon}</div>
                <div>
                  <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted mb-1">{item.label}</div>
                  <div className="font-display text-base tracking-wider">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg p-10">
          <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-9">Send a message</div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted block mb-2">Your Name</label>
              <input type="text" placeholder="e.g. Mohammed Al Rashid" className="w-full bg-surface border border-border text-ink font-body text-[13px] font-light p-3.5 outline-none transition-colors focus:border-gold-dim" />
            </div>
            <div>
              <label className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted block mb-2">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full bg-surface border border-border text-ink font-body text-[13px] font-light p-3.5 outline-none transition-colors focus:border-gold-dim" />
            </div>
            <div>
              <label className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted block mb-2">Subject</label>
              <input type="text" placeholder="What's on your mind?" className="w-full bg-surface border border-border text-ink font-body text-[13px] font-light p-3.5 outline-none transition-colors focus:border-gold-dim" />
            </div>
            <div>
              <label className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted block mb-2">Message</label>
              <textarea placeholder="Tell us how we can help..." className="w-full bg-surface border border-border text-ink font-body text-[13px] font-light p-3.5 outline-none transition-colors focus:border-gold-dim min-h-[150px] resize-vertical" />
            </div>
            <button className="w-full bg-gold text-bg border-none cursor-none font-body text-[11px] font-medium tracking-[0.18em] uppercase p-4 transition-all hover:bg-gold-lt">
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavClick }: { onNavClick: (id: string) => void }) => {
  return (
    <footer className="bg-[#090909] border-t border-border text-ink">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-14 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img
                src="/assets/logo-wordmark.png"
                alt="TWELVE"
                style={{ height: '44px' }}
                className="w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="max-w-[500px] text-sm text-soft leading-7 font-light">
              Twelve delivers premium accessories with a refined look, thoughtful function and trusted materials. Built in Dubai, designed for global routines.
            </p>

            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Stay in the loop</div>
              <p className="text-sm text-muted leading-7 font-light mb-6">
                Subscribe for new product launches, local drops and early access to our latest collections.
              </p>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-lg border border-border bg-bg px-5 py-4 text-sm text-ink outline-none transition-colors focus:border-gold-dim"
                />
                <button className="rounded-lg bg-gold px-6 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-bg transition hover:bg-gold-lt cursor-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 items-stretch">
            <div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-gold mb-5">Explore</div>
              <ul className="space-y-4">
                {['home', 'products', 'vision', 'about', 'contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => onNavClick(item)}
                      className="text-sm text-soft uppercase tracking-[0.18em] transition-colors hover:text-gold cursor-none"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-gold mb-5">Support</div>
              <ul className="space-y-4 text-sm text-soft">
                <li>Email: twelve1212@gmail.com</li>
                <li>Phone: +971 52 810 3123</li>
                <li>Instagram DM</li>
                <li>Partnerships</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-8 items-stretch">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Office</div>
              <div className="text-sm text-ink font-medium mb-3">Dubai, United Arab Emirates</div>
              <div className="text-sm text-soft leading-7 font-light">
                We ship from the UAE and support customers across the region. Global availability is arriving soon.
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Social</div>
              <a
                href="https://instagram.com/twelve_global"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gold font-medium hover:text-gold-lt"
              >
                @twelve_global
              </a>
              <div className="mt-4 text-sm text-soft leading-7 font-light">
                Follow us for latest product previews, launch updates, and behind-the-scenes design stories.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-7 text-sm text-muted flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2025 Twelve Global. All rights reserved. · Dubai, UAE</div>
          <div className="flex items-center gap-3">
            <Instagram className="w-4 h-4 text-gold" />
            <a
              href="https://instagram.com/twelve_global"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-medium hover:text-gold-lt"
            >
              @twelve_global
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'vision', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative selection:bg-gold selection:text-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-120px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(42,143,143,0.22)_0%,_transparent_60%)] opacity-90 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,_rgba(160,220,255,0.16)_0%,_transparent_60%)] opacity-80 blur-3xl" />
        <div className="absolute top-[28%] left-[-220px] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] opacity-85 blur-3xl" />
      </div>
      <CustomCursor />
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} />
      
      <main>
        <Hero onCtaClick={scrollToSection} />
        
        <section id="products" className="py-24 px-6 lg:px-14">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.9fr] items-start">
            <div className="max-w-2xl">
              <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-3">Core lineup</div>
              <div className="font-display text-5xl lg:text-[5rem] tracking-tight leading-[0.95] text-ink mb-6">Designed essentials for everyday tech.</div>
              <p className="text-[15px] text-soft leading-8 font-light">Explore our launch collection of fast chargers, car chargers, Lightning cables and USB-C cables crafted for modern routines, reliable performance and a refined look.</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10">
              <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Featured drop</div>
              <div className="font-display text-4xl text-ink mb-4">PULSE 65W</div>
              <p className="text-sm text-soft leading-7 mb-6">A travel-ready charger with a premium finish, high-performance output and compact form factor for on-the-go use.</p>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">Power</div>
                  <div className="font-semibold text-ink">Up to 65W USB-C PD</div>
                </div>
                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">Design</div>
                  <div className="font-semibold text-ink">Compact, durable, travel-ready</div>
                </div>
                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">Compatibility</div>
                  <div className="font-semibold text-ink">Phones, tablets, laptops</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <Vision />
        <About />
        <Contact />
      </main>

      <Footer onNavClick={scrollToSection} />
    </div>
  );
}
