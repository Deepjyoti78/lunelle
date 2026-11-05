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
      image: '/download (57).jpg',
    },
    {
      act: 'Act II • The Quiet Hours',
      title: 'Moments are not found. They are collected.',
      text: 'A cup of black coffee split at sunrise. Two hours spent listening to old vinyl in candlelight without speaking. The unspoken assurance of a hand reaching across the seat.',
      time: '0:18',
      image: '/703476404338919012.jpg',
    },
    {
      act: 'Act III • The Edge',
      title: 'A sanctuary built for two',
      text: 'Lunelle was made so you never run out of horizons to chase together. From the high cliffs of Big Sur to quiet rooftops under amber skies.',
      time: '0:30',
      image: '/download (58).jpg',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-backdropFade">
      <div
        className="relative w-full max-w-4xl bg-[#120E0B] border border-white/[0.07] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col animate-modalZoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinematic Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06] flex items-center justify-between bg-[#18110D]/80">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D88B55] flex items-center gap-1.5 font-medium">
              <Sparkles size={12} /> Cinematic Prelude
            </span>
            <span className="text-[#A8988A]/40">•</span>
            <span className="text-[10px] sm:text-xs text-[#A8988A]">The Philosophy of Lunelle</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 sm:p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
              aria-label="Toggle ambient audio"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
              aria-label="Close story"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Cinematic Stage */}
        <div className="relative h-[360px] sm:h-[440px] md:h-[480px] overflow-hidden flex items-center justify-center">
          {/* Background Image with slow cinematic zoom and cross-fade */}
          <div className="absolute inset-0 z-0">
            {narrativeFrames.map((frame, index) => (
              <img
                key={frame.act}
                src={frame.image}
                alt={frame.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  activeFrame === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
                style={{ transitionProperty: 'opacity, transform', transitionDuration: '1000ms' }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B] via-[#120E0B]/70 to-[#120E0B]/40" />
            <div className="absolute inset-0 bg-[#100D0B]/30 backdrop-blur-[1px]" />
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
