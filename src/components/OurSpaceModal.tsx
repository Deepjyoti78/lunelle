import React, { useState } from 'react';
import { X, Heart, Plus, Check, Sparkles, Copy, Calendar, ShieldCheck } from 'lucide-react';
import type { BucketListItem } from '../types';

interface OurSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  bucketList: BucketListItem[];
  onToggleBucketItem: (id: string) => void;
  onAddBucketItem: (text: string) => void;
}

export const OurSpaceModal: React.FC<OurSpaceModalProps> = ({
  isOpen,
  onClose,
  bucketList,
  onToggleBucketItem,
  onAddBucketItem,
}) => {
  const [newItemText, setNewItemText] = useState('');
  const [partnerCopied, setPartnerCopied] = useState(false);

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAddBucketItem(newItemText.trim());
    setNewItemText('');
  };

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText(window.location.origin + '#our-space-invite');
    setPartnerCopied(true);
    setTimeout(() => setPartnerCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#140F0C] border border-[#F5E5D2]/18 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Romantic Sanctuary Branding */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#F5E5D2]/12 flex items-center justify-between bg-[#19130F]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D88B55]/15 border border-[#D88B55]/30 flex items-center justify-center text-[#E2A779]">
              <Heart size={18} className="fill-[#D88B55]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-[#D88B55] uppercase">Private Sanctuary</span>
                <span className="text-[#C8B8AA]/40">•</span>
                <span className="text-[11px] text-[#C8B8AA]">Elena & David’s Orbit</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-sans font-medium text-[#F5E5D2]">
                Our Space
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F5E5D2]/08 hover:bg-[#F5E5D2]/16 text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Space Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Couple Statistics & Orbit Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4.5 rounded-2xl bg-[#1D1510] border border-[#F5E5D2]/12 flex flex-col justify-between">
              <span className="text-[11px] font-mono uppercase text-[#C8B8AA] tracking-wider">Days in Orbit</span>
              <div className="text-3xl font-serif text-[#F5E5D2] my-1">428</div>
              <span className="text-xs text-[#D88B55]">Since first conversation</span>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#1D1510] border border-[#F5E5D2]/12 flex flex-col justify-between">
              <span className="text-[11px] font-mono uppercase text-[#C8B8AA] tracking-wider">Shared Moments</span>
              <div className="text-3xl font-serif text-[#F5E5D2] my-1">{bucketList.length}</div>
              <span className="text-xs text-[#E0D4C8]">
                {bucketList.filter((b) => b.completed).length} completed together
              </span>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#1D1510] border border-[#F5E5D2]/12 flex flex-col justify-between">
              <span className="text-[11px] font-mono uppercase text-[#C8B8AA] tracking-wider">Next Horizon</span>
              <div className="text-base font-medium text-[#F5E5D2] my-1 line-clamp-1">Big Sur Ridge Stargazing</div>
              <span className="text-xs text-[#D88B55] flex items-center gap-1">
                <Calendar size={11} /> in 12 days
              </span>
            </div>
          </div>

          {/* Intimacy Prompt of the Week */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#241710] to-[#1A120E] border border-[#D88B55]/30 flex items-start gap-3.5">
            <Sparkles size={20} className="text-[#D88B55] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-mono uppercase text-[#D88B55] tracking-widest block mb-1">
                This Week's Reflection for Two
              </span>
              <p className="text-[14.5px] text-[#F5E5D2] font-serif italic mb-2">
                "What is one quiet moment with me recently where you felt completely at peace?"
              </p>
              <span className="text-xs text-[#C8B8AA]">
                Answer aloud tonight before sleeping.
              </span>
            </div>
          </div>

          {/* Shared Bucket List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-[#F5E5D2] flex items-center gap-2">
                <span>Moments to Collect</span>
                <span className="text-xs font-mono text-[#D88B55] px-2 py-0.5 rounded-full bg-[#D88B55]/15">
                  {bucketList.filter((b) => b.completed).length} / {bucketList.length}
                </span>
              </h3>

              <button
                onClick={handleCopyInvite}
                className="text-xs text-[#C8B8AA] hover:text-[#F5E5D2] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {partnerCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{partnerCopied ? 'Invite Link Copied!' : 'Invite Partner'}</span>
              </button>
            </div>

            {/* Add New Item Input */}
            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add a dream or date idea to your space..."
                className="flex-1 bg-[#1A130F] border border-[#F5E5D2]/16 rounded-xl px-4 py-2.5 text-sm text-[#F5E5D2] placeholder-[#C8B8AA]/50 focus:outline-none focus:border-[#D88B55]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#F5E5D2] text-[#1A120D] hover:bg-[#FFF5E8] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </form>

            {/* List */}
            <div className="space-y-2">
              {bucketList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleBucketItem(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    item.completed
                      ? 'bg-[#18120E]/50 border-[#F5E5D2]/08 opacity-65'
                      : 'bg-[#1E1612] border-[#F5E5D2]/14 hover:border-[#F5E5D2]/25'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-[#D88B55] border-[#D88B55] text-[#140F0C]'
                          : 'border-[#F5E5D2]/30 hover:border-[#F5E5D2]'
                      }`}
                    >
                      {item.completed && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span
                      className={`text-sm ${
                        item.completed
                          ? 'line-through text-[#C8B8AA]'
                          : 'text-[#F5E5D2]'
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#C8B8AA]/80 px-2 py-0.5 rounded bg-[#F5E5D2]/06">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-[#17110D] border-t border-[#F5E5D2]/10 flex items-center justify-between text-xs text-[#C8B8AA]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>End-to-end synchronized for two</span>
          </span>
          <button
            onClick={onClose}
            className="text-[#F5E5D2] hover:underline cursor-pointer"
          >
            Leave Space
          </button>
        </div>
      </div>
    </div>
  );
};
