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
        Original clean Earth-and-couple photograph (Reference 1 & 2).
        Fills the 100vh canvas.
        Mobile: positioned at 82% horizontally so the couple on the cliff is in full view.
        Desktop: object-center for pixel-perfect match to Reference 2.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero-bg.jpg"
          alt="Original Earth horizon sunrise with couple standing on cliff"
          className="w-full h-full object-cover object-[82%_center] sm:object-[72%_center] lg:object-center"
          loading="eager"
        />

        {/* 
          Refined Atmospheric Gradient Overlays:
          Preserves the brilliant glowing orange sunrise on the left,
          the warm golden clouds, the starry sky, and the couple on the right.
        */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(16, 13, 11, 0.48) 0%, rgba(16, 13, 11, 0.44) 18%, rgba(16, 13, 11, 0.24) 38%, rgba(16, 13, 11, 0.05) 54%, transparent 70%)',
          }}
        />
        {/* Soft radial cushion behind the text block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 20% 50%, rgba(16, 13, 11, 0.52) 0%, rgba(16, 13, 11, 0.24) 52%, transparent 82%)',
          }}
        />
        {/* Top subtle fade for header */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#100D0B]/45 via-transparent to-transparent pointer-events-none" />
        {/* Bottom subtle fade for chips */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#100D0B]/60 via-[#100D0B]/15 to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-24 sm:pt-28 pb-6 sm:pb-10 max-w-[1920px] mx-auto">
        {/* Spacer for balanced vertical rhythm */}
        <div className="hidden sm:block h-1" />

        {/* Left Hero Content */}
        <div className="max-w-[560px] my-auto pt-2 sm:pt-4">
          {/* Eyebrow: A SPACE FOR TWO */}
          <div className="mb-2.5 sm:mb-4">
            <span className="text-[10.5px] sm:text-[12px] font-sans font-medium uppercase tracking-[0.24em] text-[#C8B8AA]">
              A SPACE FOR TWO
            </span>
          </div>

          {/* Heading: Explore, plan, and / collect moments together. */}
          <h1 className="text-[29px] sm:text-[40px] md:text-[44px] lg:text-[46px] font-sans font-normal text-[#F5E5D2] leading-[1.17] tracking-[-0.015em] mb-3 sm:mb-4.5">
            Explore, plan, and
            <br />
            collect moments{' '}
            <span className="font-romantic italic font-light text-[35px] sm:text-[48px] md:text-[52px] lg:text-[54px] text-[#F5E5D2]">
              together.
            </span>
          </h1>

          {/* Description */}
          <p className="text-[13.5px] sm:text-[15.5px] md:text-[16px] text-[#C8B8AA] font-sans font-normal leading-[1.6] max-w-[440px] mb-6 sm:mb-8">
            Discover date ideas, beautiful places, and experiences
            <br className="hidden sm:inline" />
            {' '}made for two.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 sm:gap-7 flex-wrap">
            {/* Primary CTA */}
            <button
              onClick={onStartExploring}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#F5E5D2] text-[#1A120D] text-[13px] sm:text-[14px] font-medium tracking-normal hover:bg-[#FFF5E8] hover:shadow-[0_0_28px_rgba(245,229,210,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
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
              <div className="w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] rounded-full bg-[#F5E5D2]/16 border border-[#F5E5D2]/24 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#F5E5D2]/28 group-hover:border-[#F5E5D2]/40 transition-all duration-300 shadow-sm">
                <Play
                  size={10}
                  className="fill-[#F5E5D2] text-[#F5E5D2] ml-0.5 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span className="text-[13px] sm:text-[14px] font-sans font-normal tracking-wide">
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
