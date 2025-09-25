'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedBackground } from '@/../components/motion-primitives/animated-background';

export function TopNav() {
  const pathname = usePathname();
  
  const TABS = [
    { label: 'Gradient', href: '/' },
    { label: 'Looping', href: '/looping' },
    { label: 'Streaming', href: '/streaming' },
    { label: 'Reviewing', href: '/reviewing' },
    { label: 'Multiplayer', href: '/multiplayer' },
  ];

  // Find the active tab based on current pathname
  const activeTab = TABS.find(tab => tab.href === pathname)?.label || TABS[0].label;

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className='flex w-fit'>
        <AnimatedBackground
          defaultValue={activeTab}
          className='rounded-lg bg-zinc-100'
          transition={{
            type: 'spring',
            bounce: 0.1,
            duration: 0.5,
          }}
        >
          {TABS.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              data-id={tab.label}
              className='inline-flex h-9 px-4 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950'
            >
              {tab.label}
            </Link>
          ))}
        </AnimatedBackground>
      </div>
    </nav>
  );
}

export default TopNav;