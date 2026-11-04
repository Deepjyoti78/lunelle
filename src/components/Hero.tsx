import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { BottomChips } from './BottomChips';
import type { ActiveTab } from '../types';

interface HeroProps {
  onStartExploring: () => void;
  onWatchStory: () => void;
  onSelectFeature: (tab: ActiveTab) => void;
  onOpenOurSpace: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartExploring,
  onWatchStory,
  onSelectFeature,
  onOpenOurSpace,
}) => {
  return (
    <div className="relative w-full h-[100dvh] min-h-[580px] overflow-hidden select-none bg-[#100D0B]">
      {/* 
        Background Photograph:
        Original clean Earth-and-couple photograph.
        Fills the 100vh canvas.
        Mobile: positioned at 82% horizontally so the couple on the cliff is in full view.
        Desktop: object-center for pixel-perfect match to Reference Image.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero-bg.jpg"
          alt="Original Earth horizon sunrise with couple standing on cliff"
          className="w-full h-full object-cover object-[82%_center] sm:object-[72%_center] lg:object-center"
          loading="eager"
        />

        {/* 
          Atmospheric Gradient Overlays:
          Preserves the brilliant glowing orange sunrise on the left,
          the warm golden clouds, the starry sky, and the couple on the right,
          while ensuring the left-side text has crystal-clear readability.
        */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(16, 13, 11, 0.35) 0%, rgba(16, 13, 11, 0.46) 15%, rgba(16, 13, 11, 0.36) 30%, rgba(16, 13, 11, 0.14) 48%, rgba(16, 13, 11, 0.03) 62%, transparent 75%)',
          }}
        />
        {/* Soft radial cushion behind the text block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 20% 50%, rgba(16, 13, 11, 0.48) 0%, rgba(16, 13, 11, 0.20) 50%, transparent 85%)',
          }}
        />
        {/* Top subtle fade for header */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#100D0B]/45 via-transparent to-transparent pointer-events-none" />
        {/* Bottom subtle fade for chips */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#100D0B]/55 via-[#100D0B]/15 to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-8 sm:px-12 md:px-16 lg:px-20 pt-24 sm:pt-28 pb-8 sm:pb-10 max-w-[1920px] mx-auto">
        {/* Spacer for balanced vertical rhythm */}
        <div className="hidden sm:block h-1" />

        {/* Left Hero Content */}
        <div className="max-w-[580px] my-auto pt-2 sm:pt-4">
          {/* Eyebrow: A SPACE FOR TWO */}
          <div className="mb-3.5 sm:mb-4">
            <span className="text-[11px] sm:text-[11.5px] font-sans font-medium uppercase tracking-[0.24em] text-[#BAA898]">
              A SPACE FOR TWO
            </span>
          </div>

          {/* Heading: Explore, plan, and / collect moments together. */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[46px] lg:text-[48px] font-sans font-normal text-[#F5E5D2] leading-[1.17] tracking-[-0.015em] mb-4 sm:mb-4.5">
            Explore, plan, and
            <br />
            collect moments{' '}
            <span className="font-romantic italic font-normal text-[#F5E5D2]">
              together.
            </span>
          </h1>

          {/* Description */}
          <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-[#C4B5A6] font-sans font-normal leading-[1.62] max-w-[450px] mb-7 sm:mb-8">
            Discover date ideas, beautiful places, and experiences
            <br className="hidden sm:inline" />
            {' '}made for two.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 sm:gap-7 flex-wrap">
            {/* Primary CTA */}
            <button
              onClick={onStartExploring}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5E5D2] text-[#1A120D] text-[13.5px] sm:text-[14px] font-medium tracking-normal hover:bg-[#FFF5E8] hover:shadow-[0_0_28px_rgba(245,229,210,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.22)]"
            >
              <span>Start Exploring</span>
              <ArrowRight
                size={14}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            {/* Secondary CTA: Watch the Story */}
            <button
              onClick={onWatchStory}
              className="group inline-flex items-center gap-2.5 text-[#F5E5D2] hover:text-white cursor-pointer py-1.5 focus:outline-none transition-colors"
            >
              {/* Play Icon Circle */}
              <div className="w-[30px] h-[30px] rounded-full bg-[#F5E5D2]/16 border border-[#F5E5D2]/22 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#F5E5D2]/28 group-hover:border-[#F5E5D2]/40 transition-all duration-300 shadow-sm">
                <Play
                  size={11}
                  className="fill-[#F5E5D2] text-[#F5E5D2] ml-0.5 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span className="text-[13.5px] sm:text-[14px] font-sans font-normal tracking-wide">
                Watch the Story
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Feature Navigation */}
        <div className="pt-4 sm:pt-4">
          <BottomChips
            onSelectFeature={onSelectFeature}
            onOpenOurSpace={onOpenOurSpace}
          />
        </div>
      </div>
    </div>
  );
};
