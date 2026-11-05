import React, { useState } from 'react';
import { X, Quote, Heart, MapPin, Calendar } from 'lucide-react';
import { COUPLE_STORIES } from '../data/romanticContent';
import type { CoupleStory } from '../types';

interface StoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoriesModal: React.FC<StoriesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeStory, setActiveStory] = useState<CoupleStory>(COUPLE_STORIES[0]);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const toggleLike = (id: string) => {
    setLikedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] bg-[#140F0C] border border-white/[0.07] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-white/[0.06] flex items-center justify-between bg-[#19130F]/90">
          <div>
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D88B55] uppercase">Couple Chronicles</span>
              <span className="text-[#C8B8AA]/40">•</span>
              <span className="text-[10px] sm:text-[11px] text-[#C8B8AA]">Human Moments</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-sans font-medium text-[#F5E5D2]">
              Real Couple Stories
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stories List & Detail View */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
          {/* Active Featured Reader */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1B1410] border border-white/[0.04] shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D88B55]/15 text-[#E2A779]">
                  {activeStory.couple}
                </span>
                <span className="text-xs text-[#A8988A] flex items-center gap-1">
                  <MapPin size={11} /> {activeStory.location}
                </span>
                <span className="text-xs text-[#A8988A] flex items-center gap-1">
                  <Calendar size={11} /> {activeStory.yearsTogether}
                </span>
              </div>

              <button
                onClick={() => toggleLike(activeStory.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer font-medium ${
                  likedStories.has(activeStory.id)
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-white/[0.06] text-[#C8B8AA] hover:text-[#F5E5D2]'
                }`}
              >
                <Heart size={12} className={likedStories.has(activeStory.id) ? 'fill-rose-400' : ''} />
                <span>{likedStories.has(activeStory.id) ? 'Cherished' : 'Cherish story'}</span>
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif italic text-[#F5E5D2] mb-4">
              "{activeStory.title}"
            </h3>

            {/* Pull Quote */}
            <div className="my-5 p-4 rounded-xl bg-[#251A13]/60 border-l-2 border-[#D88B55] flex items-start gap-3">
              <Quote size={20} className="text-[#D88B55] shrink-0 mt-0.5" />
              <p className="text-[15px] sm:text-[16px] text-[#F5E5D2] font-serif italic leading-relaxed">
                {activeStory.quote}
              </p>
            </div>

            <p className="text-[14.5px] text-[#C4B5A5] leading-relaxed mb-4">
              {activeStory.excerpt}
            </p>

            <p className="text-[14.5px] text-[#E0D4C8] leading-relaxed font-sans">
              {activeStory.fullStory}
            </p>
          </div>

          {/* Story Selector Cards */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#A8988A] mb-3 font-medium">More Journals</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {COUPLE_STORIES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStory(s)}
                  className={`p-4 rounded-xl text-left transition-all cursor-pointer ${
                    activeStory.id === s.id
                      ? 'bg-[#281B14] shadow-md border border-[#D88B55]/50'
                      : 'bg-[#18120E] border border-white/[0.04] hover:bg-[#201712]'
                  }`}
                >
                  <div className="text-xs text-[#E2A779] font-semibold mb-1">{s.couple}</div>
                  <div className="text-sm font-medium text-[#F5E5D2] line-clamp-1">{s.title}</div>
                  <div className="text-xs text-[#A8988A] mt-1">{s.location}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-[#17110D] border-t border-white/[0.05] flex items-center justify-between text-xs text-[#A8988A]">
          <span>Every love story is its own constellation</span>
          <button
            onClick={onClose}
            className="text-[#F5E5D2] hover:text-[#D88B55] transition-colors cursor-pointer"
          >
            Close Journals
          </button>
        </div>
      </div>
    </div>
  );
};
