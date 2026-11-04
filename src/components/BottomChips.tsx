import React from 'react';
import { MapPin, BookOpen, Heart } from 'lucide-react';
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
        <MapPin
          size={14}
          strokeWidth={1.8}
          className="text-[#C8B8AA] group-hover:text-[#F5E5D2] transition-colors"
        />
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
          className="text-[#C8B8AA] group-hover:text-[#F5E5D2] transition-colors"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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
          className="text-[#C8B8AA] group-hover:text-[#F5E5D2] transition-colors"
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
          className="text-[#C8B8AA] group-hover:text-[#F5E5D2] transition-colors"
        />
      ),
      action: onOpenOurSpace,
    },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 w-full max-w-full flex-nowrap">
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={chip.action}
          className="group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-[#18120E]/45 border border-[#F5E5D2]/16 backdrop-blur-md text-[#D8CEC4] hover:text-[#F5E5D2] hover:bg-[#251A13]/70 hover:border-[#F5E5D2]/32 transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.35)] shrink-0"
        >
          {chip.icon}
          <span className="text-[12px] sm:text-[13px] font-sans font-normal tracking-wide whitespace-nowrap">
            {chip.label}
          </span>
        </button>
      ))}
    </div>
  );
};
