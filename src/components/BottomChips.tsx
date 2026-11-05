import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import type { ActiveTab } from '../types';

interface BottomChipsProps {
  onSelectFeature: (tab: ActiveTab) => void;
  onOpenOurSpace: () => void;
}

export const BottomChips: React.FC<BottomChipsProps> = ({
  onSelectFeature,
  onOpenOurSpace,
}) => {
  const chips = [
    {
      id: 'date-ideas',
      label: 'Curated Date Ideas',
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#C4B5A5] group-hover:text-[#F5E5D2] transition-colors"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      action: () => onSelectFeature('date-ideas'),
    },
    {
      id: 'places',
      label: 'Places to Explore',
      icon: (
        <svg
          width="15"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#C4B5A5] group-hover:text-[#F5E5D2] transition-colors"
        >
          <polygon points="12 3 2 21 22 21" />
          <polyline points="7 21 12 11 17 21" />
        </svg>
      ),
      action: () => onSelectFeature('places'),
    },
    {
      id: 'stories',
      label: 'Real Couple Stories',
      icon: (
        <BookOpen
          size={14}
          strokeWidth={1.8}
          className="text-[#C4B5A5] group-hover:text-[#F5E5D2] transition-colors"
        />
      ),
      action: () => onSelectFeature('stories'),
    },
    {
      id: 'our-space',
      label: 'A Shared Space',
      icon: (
        <Heart
          size={14}
          strokeWidth={1.8}
          className="text-[#C4B5A5] group-hover:text-[#F5E5D2] transition-colors"
        />
      ),
      action: onOpenOurSpace,
    },
  ];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-1.5 w-full max-w-full flex-nowrap -mx-5 px-5 sm:mx-0 sm:px-0 scroll-smooth touch-pan-x">
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={chip.action}
          className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 h-[38px] sm:h-[42px] rounded-full glass-chip text-[#D8CDC2] hover:text-[#F5E5D2] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 shrink-0 select-none active:scale-95 overflow-hidden"
        >
          <span className="shrink-0 flex items-center justify-center">
            {chip.icon}
          </span>
          <span className="text-[12.5px] sm:text-[13px] font-sans font-normal tracking-normal whitespace-nowrap">
            {chip.label}
          </span>
        </button>
      ))}
    </div>
  );
};
