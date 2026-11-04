import React, { useState } from 'react';
import { X, MapPin, Calendar, Bookmark, Check } from 'lucide-react';
import { PLACES_TO_EXPLORE } from '../data/romanticContent';
import type { Place } from '../types';

interface PlacesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlace: (place: Place) => void;
}

export const PlacesModal: React.FC<PlacesModalProps> = ({
  isOpen,
  onClose,
  onSavePlace,
}) => {
  const [savedPlaces, setSavedPlaces] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleSave = (place: Place) => {
    onSavePlace(place);
    setSavedPlaces((prev) => new Set(prev).add(place.id));
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
              <span className="text-[11px] font-mono tracking-widest text-[#D88B55] uppercase">Sanctuary Atlas</span>
              <span className="text-[#C8B8AA]/40">•</span>
              <span className="text-[11px] text-[#C8B8AA]">Atmospheric Horizons</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-sans font-medium text-[#F5E5D2]">
              Places to Explore Together
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PLACES_TO_EXPLORE.map((place) => {
              const isSaved = savedPlaces.has(place.id);
              return (
                <div
                  key={place.id}
                  className="rounded-2xl bg-[#1D1612]/70 border border-[#F5E5D2]/14 overflow-hidden group hover:border-[#F5E5D2]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D1612] via-[#1D1612]/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#100D0B]/70 border border-[#F5E5D2]/20 backdrop-blur-md text-[11px] text-[#F5E5D2] flex items-center gap-1.5">
                      <MapPin size={11} className="text-[#D88B55]" />
                      <span>{place.location}</span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg font-medium text-[#F5E5D2] tracking-tight">{place.name}</h3>
                      <p className="text-xs text-[#E2A779] italic font-serif">{place.tagline}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-[13.5px] text-[#C8B8AA] leading-relaxed">
                      {place.description}
                    </p>

                    <div className="pt-3 border-t border-[#F5E5D2]/10 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#C8B8AA]">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#D88B55]" />
                          <span>{place.bestTime}</span>
                        </span>
                        <span className="text-[11px] text-[#E0D4C8]/70">{place.atmosphere}</span>
                      </div>

                      <button
                        onClick={() => handleSave(place)}
                        disabled={isSaved}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSaved
                            ? 'bg-[#D88B55]/20 text-[#E2A779] border border-[#D88B55]/30'
                            : 'bg-[#F5E5D2]/10 hover:bg-[#F5E5D2] text-[#F5E5D2] hover:text-[#1A120D] border border-[#F5E5D2]/18'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <Check size={12} />
                            <span>Saved to Our Space</span>
                          </>
                        ) : (
                          <>
                            <Bookmark size={12} />
                            <span>Save to Itinerary</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-[#17110D] border-t border-[#F5E5D2]/10 flex items-center justify-between text-xs text-[#C8B8AA]">
          <span>4 Horizons available in this edition</span>
          <button
            onClick={onClose}
            className="text-[#F5E5D2] hover:underline cursor-pointer"
          >
            Return to Sky
          </button>
        </div>
      </div>
    </div>
  );
};
