import React, { useState } from 'react';
import { X, Sparkles, Clock, Heart, Check } from 'lucide-react';
import { DATE_IDEAS } from '../data/romanticContent';
import type { DateIdea } from '../types';

interface DiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToOurSpace: (text: string, category: string) => void;
}

export const DiscoverModal: React.FC<DiscoverModalProps> = ({
  isOpen,
  onClose,
  onSaveToOurSpace,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [randomPrompt, setRandomPrompt] = useState<DateIdea | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Starlit', 'Intimate', 'Adventurous', 'Culinary', 'Artistic'];

  const filteredIdeas = selectedCategory === 'All'
    ? DATE_IDEAS
    : DATE_IDEAS.filter((i) => i.category === selectedCategory);

  const handleSave = (idea: DateIdea) => {
    onSaveToOurSpace(idea.title, idea.category);
    setSavedIds((prev) => new Set(prev).add(idea.id));
  };

  const handleSurpriseUs = () => {
    const randomIndex = Math.floor(Math.random() * DATE_IDEAS.length);
    setRandomPrompt(DATE_IDEAS[randomIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#140F0C] border border-[#F5E5D2]/18 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#F5E5D2]/12 flex items-center justify-between bg-[#19130F]/90">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tracking-widest text-[#D88B55] uppercase">Discovery Archive</span>
              <span className="text-[#C8B8AA]/40">•</span>
              <span className="text-[11px] text-[#C8B8AA]">Curated for Two</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-sans font-medium text-[#F5E5D2]">
              Explore Experiences & Date Rituals
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F5E5D2]/08 hover:bg-[#F5E5D2]/16 text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filters & Surprise Action */}
        <div className="px-6 sm:px-8 py-4 border-b border-[#F5E5D2]/10 bg-[#17110D]/60 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#F5E5D2] text-[#1A120D] font-medium shadow-sm'
                    : 'bg-[#F5E5D2]/08 text-[#C8B8AA] hover:text-[#F5E5D2] hover:bg-[#F5E5D2]/14'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={handleSurpriseUs}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D88B55]/50 bg-[#D88B55]/12 text-[#E2A779] hover:bg-[#D88B55]/20 text-[12.5px] transition-all cursor-pointer shrink-0"
          >
            <Sparkles size={13} />
            <span>Surprise Us</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Surprise Box if triggered */}
          {randomPrompt && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#281A12] to-[#1C130E] border border-[#D88B55]/40 shadow-lg relative animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase text-[#D88B55] tracking-widest flex items-center gap-1.5">
                  <Sparkles size={12} /> Serendipity Pick
                </span>
                <button
                  onClick={() => setRandomPrompt(null)}
                  className="text-[#C8B8AA] hover:text-white text-xs"
                >
                  Dismiss
                </button>
              </div>
              <h3 className="text-lg font-medium text-[#F5E5D2] mb-1.5">{randomPrompt.title}</h3>
              <p className="text-[14px] text-[#C8B8AA] leading-relaxed mb-3">{randomPrompt.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#E2A779]">{randomPrompt.vibe}</span>
                <button
                  onClick={() => handleSave(randomPrompt)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E5D2] text-[#1A120D] text-xs font-medium cursor-pointer"
                >
                  <Heart size={11} className="fill-[#1A120D]" />
                  <span>Save to Our Space</span>
                </button>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIdeas.map((idea) => {
              const isSaved = savedIds.has(idea.id);
              return (
                <div
                  key={idea.id}
                  className="p-5 rounded-2xl bg-[#1D1612]/70 border border-[#F5E5D2]/14 hover:border-[#F5E5D2]/28 hover:bg-[#231A15]/80 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F5E5D2]/10 text-[#E0D4C8] border border-[#F5E5D2]/12">
                        {idea.category}
                      </span>
                      <div className="flex items-center gap-1 text-[12px] text-[#C8B8AA]">
                        <Clock size={12} />
                        <span>{idea.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-[16px] font-sans font-medium text-[#F5E5D2] group-hover:text-white transition-colors mb-2">
                      {idea.title}
                    </h3>

                    <p className="text-[13.5px] text-[#C8B8AA] leading-relaxed mb-4">
                      {idea.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F5E5D2]/08 flex items-center justify-between">
                    <span className="text-[11.5px] text-[#C8B8AA] italic font-serif">
                      {idea.vibe}
                    </span>

                    <button
                      onClick={() => handleSave(idea)}
                      disabled={isSaved}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-[#D88B55]/25 text-[#E2A779] border border-[#D88B55]/30'
                          : 'bg-[#F5E5D2]/10 hover:bg-[#F5E5D2] text-[#F5E5D2] hover:text-[#1A120D] border border-[#F5E5D2]/18'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check size={12} />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Heart size={12} />
                          <span>Add to Our Space</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-[#17110D] border-t border-[#F5E5D2]/10 flex items-center justify-between text-xs text-[#C8B8AA]">
          <span>Showing {filteredIdeas.length} curated moments</span>
          <button
            onClick={onClose}
            className="text-[#F5E5D2] hover:underline cursor-pointer"
          >
            Back to Horizon
          </button>
        </div>
      </div>
    </div>
  );
};
