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
    <div className="relative w-full h-[100dvh] min-h-[560px] overflow-hidden select-none bg-[#100D0B]">
      {/* 
        Background Photograph:
        Original clean Earth-and-couple photograph.
        Fills the 100vh/100dvh canvas.
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
              'linear-gradient(to right, rgba(16, 13, 11, 0.50) 0%, rgba(16, 13, 11, 0.46) 20%, rgba(16, 13, 11, 0.32) 40%, rgba(16, 13, 11, 0.12) 60%, transparent 80%)',
          }}
        />
        {/* Soft radial cushion behind the text block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 45%, rgba(16, 13, 11, 0.55) 0%, rgba(16, 13, 11, 0.22) 50%, transparent 85%)',
          }}
        />
        {/* Top subtle fade for header */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#100D0B]/55 via-[#100D0B]/20 to-transparent pointer-events-none" />
        {/* Bottom subtle fade for chips */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#100D0B]/70 via-[#100D0B]/20 to-transparent pointer-events-none" />
      </div>

      {/* Main Foreground Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-5 sm:px-12 md:px-16 lg:px-20 pt-20 sm:pt-28 md:pt-34 pb-6 sm:pb-10 max-w-[1920px] mx-auto">
        {/* Left Hero Content - Lifted up into the starry sky matching Reference 2 */}
        <div className="max-w-[620px] my-auto -translate-y-2 sm:-translate-y-6 lg:-translate-y-8">
          {/* Eyebrow: A SPACE FOR TWO */}
          <div className="mb-2.5 sm:mb-4">
            <span className="text-[10.5px] sm:text-[12px] font-sans font-medium uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#C0B0A0]">
              A SPACE FOR TWO
            </span>
          </div>

          {/* Heading: Explore, plan, and / collect moments together. */}
          <h1 className="text-[28px] xs:text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-sans font-normal text-[#F5E5D2] leading-[1.14] tracking-[-0.015em] mb-3.5 sm:mb-4.5">
            Explore, plan, and
            <br />
            collect moments{' '}
            <span className="font-romantic italic font-normal text-[36px] xs:text-[42px] sm:text-[54px] md:text-[60px] lg:text-[64px] text-[#F5E5D2] leading-none inline-block ml-0.5 sm:ml-1 align-baseline">
              together.
            </span>
          </h1>

          {/* Description */}
          <p className="text-[13.5px] sm:text-[15.5px] md:text-[16px] text-[#C4B5A5] font-sans font-normal leading-[1.58] sm:leading-[1.65] max-w-[480px] mb-6 sm:mb-9">
            Discover date ideas, beautiful places, and experiences
            <br className="hidden xs:inline" />
            {' '}made for two.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3.5 sm:gap-7 flex-wrap">
            {/* Primary CTA */}
            <button
              onClick={onStartExploring}
              className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#F5E5D2] text-[#16100B] text-[13px] sm:text-[14px] font-semibold tracking-normal hover:bg-[#FFF5E8] hover:shadow-[0_0_28px_rgba(245,229,210,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.22)] active:scale-95"
            >
              <span>Start Exploring</span>
              <ArrowRight
                size={14}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            {/* Secondary CTA: Watch the Story */}
            <button
              onClick={onWatchStory}
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-[#F5E5D2] hover:text-white cursor-pointer py-1.5 focus:outline-none transition-colors active:scale-95"
            >
              {/* Play Icon Circle */}
              <div className="w-[30px] sm:w-[34px] h-[30px] sm:h-[34px] rounded-full bg-[#F5E5D2]/16 border border-[#F5E5D2]/24 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#F5E5D2]/30 group-hover:border-[#F5E5D2]/45 transition-all duration-300 shadow-sm">
                <Play
                  size={11}
                  className="fill-[#F5E5D2] text-[#F5E5D2] ml-0.5 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span className="text-[13px] sm:text-[14px] font-sans font-medium tracking-wide">
                Watch the Story
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Feature Navigation */}
        <div className="pt-3 sm:pt-4">
          <BottomChips
            onSelectFeature={onSelectFeature}
            onOpenOurSpace={onOpenOurSpace}
          />
        </div>
      </div>
    </div>
  );
};
