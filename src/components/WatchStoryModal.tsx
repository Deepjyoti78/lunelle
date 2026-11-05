import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface WatchStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatchStoryModal: React.FC<WatchStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);

  const narrativeFrames = [
    {
      act: 'Act I • The Orbit',
      title: 'In a cosmos of eight billion souls',
      text: 'We spend our lives navigating vast, solitary spaces. Until one day, someone looks at the same horizon and chooses to stand beside you.',
      time: '0:08',
    },
    {
      act: 'Act II • The Quiet Hours',
      title: 'Moments are not found. They are collected.',
      text: 'A cup of black coffee split at sunrise. Two hours spent listening to old vinyl in candlelight without speaking. The unspoken assurance of a hand reaching across the seat.',
      time: '0:18',
    },
    {
      act: 'Act III • The Edge',
      title: 'A sanctuary built for two',
      text: 'Lunelle was made so you never run out of horizons to chase together. From the high cliffs of Big Sur to quiet rooftops under amber skies.',
      time: '0:30',
    },
  ];

  // Auto progression of cinematic narrative
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % narrativeFrames.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, narrativeFrames.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#120E0B] border border-[#F5E5D2]/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinematic Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#F5E5D2]/10 flex items-center justify-between bg-[#18110D]/80">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D88B55] flex items-center gap-1.5">
              <Sparkles size={12} /> Cinematic Prelude
            </span>
            <span className="text-[#C8B8AA]/40">•</span>
            <span className="text-[10px] sm:text-xs text-[#C8B8AA]">The Philosophy of Lunelle</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 sm:p-2 rounded-full bg-[#F5E5D2]/08 hover:bg-[#F5E5D2]/16 text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
              aria-label="Toggle ambient audio"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-[#F5E5D2]/08 hover:bg-[#F5E5D2]/16 text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
              aria-label="Close story"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Cinematic Stage */}
        <div className="relative h-[360px] sm:h-[440px] md:h-[480px] overflow-hidden flex items-center justify-center">
          {/* Background Image with slow cinematic zoom */}
          <div className="absolute inset-0 z-0">
            <img
              src="/a_cinematic_wide_landscape_image_16_9_of_the_sam.png"
              alt="Cinematic background"
              className="w-full h-full object-cover scale-105 animate-pulse duration-[12000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B] via-[#120E0B]/60 to-[#120E0B]/40" />
            <div className="absolute inset-0 bg-[#100D0B]/30 backdrop-blur-[2px]" />
          </div>

          {/* Center Story Copy */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 text-center transition-all duration-700">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D88B55] mb-3 block">
              {narrativeFrames[activeFrame].act}
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif italic text-[#F5E5D2] mb-5 leading-snug">
              "{narrativeFrames[activeFrame].title}"
            </h3>

            <p className="text-[15px] sm:text-[17px] text-[#C8B8AA] font-sans font-light leading-relaxed max-w-xl mx-auto">
              {narrativeFrames[activeFrame].text}
            </p>
          </div>

          {/* Frame Progress Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-20">
            {narrativeFrames.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFrame(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeFrame === index
                    ? 'w-10 bg-[#F5E5D2]'
                    : 'w-2.5 bg-[#F5E5D2]/30 hover:bg-[#F5E5D2]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Story Controls Footer */}
        <div className="px-6 sm:px-8 py-4 bg-[#16100C] border-t border-[#F5E5D2]/10 flex items-center justify-between">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#F5E5D2] hover:text-white cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause size={14} />
                <span>Pause Experience</span>
              </>
            ) : (
              <>
                <Play size={14} />
                <span>Resume Experience</span>
              </>
            )}
          </button>

          <div className="text-xs text-[#C8B8AA]">
            Atmospheric Audio: {isMuted ? 'Muted' : 'Cosmic Dawn (432Hz)'}
          </div>
        </div>
      </div>
    </div>
  );
};
