import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenOurSpace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenOurSpace,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; tab: ActiveTab }[] = [
    { label: 'Discover', tab: 'discover' },
    { label: 'Date Ideas', tab: 'date-ideas' },
    { label: 'Places', tab: 'places' },
    { label: 'Stories', tab: 'stories' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="w-full max-w-[1920px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-6 md:py-7 flex items-center justify-between">
        {/* Brand Logo & Wordmark - Lunelle */}
        <button
          onClick={() => handleNavClick('discover')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          aria-label="Lunelle Homepage"
        >
          {/* Exact 3-wave brandmark matching Reference Image */}
          <div className="relative flex items-center justify-center text-[#F5E5D2] group-hover:text-white transition-colors">
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-105"
            >
              <path
                d="M2 3.5C5.5 1.5 8.5 1.5 12 3.5C15.5 5.5 18.5 5.5 22 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 9C5.5 7 8.5 7 12 9C15.5 11 18.5 11 22 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 14.5C5.5 12.5 8.5 12.5 12 14.5C15.5 16.5 18.5 16.5 22 14.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-[#F5E5D2] text-[18px] md:text-[19px] font-sans font-medium tracking-normal group-hover:text-white transition-colors">
            Lunelle
          </span>
        </button>

        {/* Center Pill Navigation - Exact match to Reference Image */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:inline-flex items-center p-1 rounded-full bg-[#16110E]/45 border border-[#F5E5D2]/14 backdrop-blur-md shadow-[0_4px_24px_-2px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.06)]"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`px-4.5 py-1.5 rounded-full text-[13px] font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#F5E5D2]/16 border border-[#F5E5D2]/18 text-[#F5E5D2] font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]'
                    : 'text-[#B8A99B] hover:text-[#F5E5D2] hover:bg-[#F5E5D2]/08 font-normal'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side CTA - "Our Space ↗" */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenOurSpace}
            className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#F5E5D2] text-[#1A120D] text-[13px] font-semibold tracking-normal hover:bg-[#FFF5E8] hover:shadow-[0_0_24px_rgba(245,229,210,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
          >
            <span>Our Space</span>
            <ArrowUpRight
              size={13}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenOurSpace}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#F5E5D2] text-[#1A120D] text-[12px] font-medium tracking-normal"
          >
            <span>Our Space</span>
            <ArrowUpRight size={12} strokeWidth={2.4} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-[#18120E]/70 border border-[#F5E5D2]/20 text-[#F5E5D2] backdrop-blur-md focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-6 mt-1 p-3 rounded-2xl bg-[#1A130E]/95 border border-[#F5E5D2]/18 backdrop-blur-xl shadow-2xl flex flex-col gap-1 z-50 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] transition-colors ${
                  isActive
                    ? 'bg-[#F5E5D2]/15 text-[#F5E5D2] font-medium'
                    : 'text-[#B8A99B] hover:text-[#F5E5D2] hover:bg-[#F5E5D2]/08'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
