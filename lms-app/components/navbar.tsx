'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ThemeToggleButton } from './theme-toggle';
import { getMainNavigation } from '@d7/src/modules/navigation/services/navigation.service';
import { SITE_CONFIG } from '@d7/src/core/config/site';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = getMainNavigation().map((item) => ({
    ...item,
    href: item.type === 'lms' ? SITE_CONFIG.lmsUrl : `${SITE_CONFIG.websiteUrl}${item.href}`,
  }));

  return (
    <header className="sticky top-0 z-50 backdrop-blur">
      <div className="container mx-auto px-4 py-3 surface-card rounded-b-2xl">
        <div className="flex items-center justify-between">
          <a href={SITE_CONFIG.websiteUrl} className="flex items-center gap-3">
            <Image src="/logos/dp.png" alt="D7" className="h-8 w-8 object-contain" width={32} height={32} />
            <span className="font-semibold tracking-wide">Leo District 306 D7</span>
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm" aria-label="Main navigation">
            {links.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
            <ThemeToggleButton />
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggleButton />
            <button aria-label="Menu" aria-expanded={open} className="p-2 rounded border border-white/20" onClick={() => setOpen((value) => !value)}>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        <nav className={`md:hidden transition-all duration-300 ${open ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} aria-label="Mobile navigation">
          <div className="mt-4 pb-4 flex flex-col gap-1">
            {links.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="px-4 py-3 text-base font-medium rounded-lg hover:bg-white/10">{item.label}</a>)}
          </div>
        </nav>
      </div>
    </header>
  );
}
