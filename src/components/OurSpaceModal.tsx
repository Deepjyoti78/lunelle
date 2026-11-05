import React, { useState } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Heart,
  Plus,
  Check,
  Sparkles,
  Calendar,
  Lock,
  Mail,
  User,
  LogOut,
} from 'lucide-react';
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
  // Authentication & View States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sanctuary / Bucket list state (when logged in)
  const [newItemText, setNewItemText] = useState('');
  const [partnerCopied, setPartnerCopied] = useState(false);

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsAuthenticated(true);
  };

  const handleSocialAuth = (provider: 'Google' | 'Apple') => {
    setEmail(`user@${provider.toLowerCase()}.com`);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleAddBucket = (e: React.FormEvent) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Main Modal Card */}
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] bg-[#140F0C] border border-[#F5E5D2]/18 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#1A120E]/80 hover:bg-[#F5E5D2]/16 border border-[#F5E5D2]/15 text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!isAuthenticated ? (
          /* ========================================================= */
          /* 1. AUTHENTICATION POPUP (Matching Reference Image Layout) */
          /* ========================================================= */
          <div className="overflow-y-auto no-scrollbar grid grid-cols-1 md:grid-cols-2 min-h-[560px]">
            {/* LEFT SIDE: Information & Form */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between order-2 md:order-1 bg-[#150F0C]">
              <div>
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-[28px] font-sans font-semibold text-[#F5E5D2] tracking-tight mb-1.5">
                    {authMode === 'login' ? 'Get Started Now' : 'Create an Account'}
                  </h2>
                  <p className="text-[13px] sm:text-[13.5px] text-[#C4B5A5]">
                    {authMode === 'login'
                      ? 'Please log in to your account to continue.'
                      : 'Join Lunelle to unlock your shared private orbit.'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {/* Name field (visible on signup) */}
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-sans font-medium text-[#D8CDC2] mb-1.5">
                        Name
                      </label>
                      <div className="relative flex items-center">
                        <User size={15} className="absolute left-3.5 text-[#C8B8AA]/60 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1D1612]/90 border border-[#F5E5D2]/16 text-[13.5px] text-[#F5E5D2] placeholder-[#C8B8AA]/40 focus:outline-none focus:border-[#D88B55] focus:ring-1 focus:ring-[#D88B55] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email address */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#D8CDC2] mb-1.5">
                      Email address
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={15} className="absolute left-3.5 text-[#C8B8AA]/60 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="workmail@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1D1612]/90 border border-[#F5E5D2]/16 text-[13.5px] text-[#F5E5D2] placeholder-[#C8B8AA]/40 focus:outline-none focus:border-[#D88B55] focus:ring-1 focus:ring-[#D88B55] transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-sans font-medium text-[#D8CDC2]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to your email.')}
                        className="text-[11.5px] font-sans text-[#D88B55] hover:text-[#E2A779] transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative flex items-center">
                      <Lock size={15} className="absolute left-3.5 text-[#C8B8AA]/60 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#1D1612]/90 border border-[#F5E5D2]/16 text-[13.5px] text-[#F5E5D2] placeholder-[#C8B8AA]/40 focus:outline-none focus:border-[#D88B55] focus:ring-1 focus:ring-[#D88B55] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-[#C8B8AA]/60 hover:text-[#F5E5D2] transition-colors cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Privacy checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      id="terms-checkbox"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-[#F5E5D2]/20 bg-[#1D1612] text-[#D88B55] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#D88B55]"
                    />
                    <label
                      htmlFor="terms-checkbox"
                      className="text-xs text-[#C8B8AA] cursor-pointer select-none"
                    >
                      I agree to the{' '}
                      <span className="text-[#F5E5D2] underline hover:text-[#D88B55]">
                        Terms & Privacy
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#F5E5D2] hover:bg-[#FFF5E8] text-[#16100B] text-[14px] font-semibold tracking-normal transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_2px_12px_rgba(0,0,0,0.35)] cursor-pointer active:scale-[0.99] mt-2"
                  >
                    {authMode === 'login' ? 'Log in' : 'Create Account'}
                  </button>
                </form>

                {/* Mode Switcher */}
                <div className="text-center mt-3.5">
                  <span className="text-xs text-[#C8B8AA]">
                    {authMode === 'login' ? 'Don’t have an account? ' : 'Already have an account? '}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-xs font-semibold text-[#D88B55] hover:text-[#E2A779] underline ml-1 cursor-pointer"
                  >
                    {authMode === 'login' ? 'Sign up' : 'Log in'}
                  </button>
                </div>
              </div>

              {/* Bottom Social Logins */}
              <div className="mt-6 pt-5 border-t border-[#F5E5D2]/10">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-full border-t border-[#F5E5D2]/10 absolute inset-0 my-auto" />
                  <span className="relative z-10 px-3 bg-[#150F0C] text-[11px] font-mono uppercase tracking-widest text-[#C8B8AA]/60">
                    Or
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Google Login */}
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('Google')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1D1612] hover:bg-[#261E19] border border-[#F5E5D2]/14 text-[12.5px] font-sans font-medium text-[#F5E5D2] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Login with Google</span>
                  </button>

                  {/* Apple Login */}
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('Apple')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1D1612] hover:bg-[#261E19] border border-[#F5E5D2]/14 text-[12.5px] font-sans font-medium text-[#F5E5D2] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0 fill-current text-[#F5E5D2]" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.71-11.71-14-4.89-7.39-8.91-15.91-12.06-25.56-3.15-9.64-4.73-18.9-4.73-27.76 0-12.16 3.13-22.38 9.38-30.65 6.25-8.27 14.19-12.52 23.82-12.75 4.93 0 10.35 1.3 16.27 3.91 5.92 2.61 9.77 3.97 11.55 4.09 1.45 0 5.46-1.47 12.03-4.41 6.57-2.93 12.19-4.23 16.86-3.89 12.5.98 22.32 5.66 29.47 14.03-10.98 6.64-16.36 15.55-16.14 26.74.22 8.7 3.51 16.09 9.87 22.17 6.36 6.09 13.88 9.68 22.56 10.77-2.17 6.53-4.89 13.06-8.16 19.59zM119.22 31.84c0-7.72 2.76-14.86 8.28-21.43 5.53-6.57 12.37-10.41 20.53-11.52.22 1.09.33 2.17.33 3.26 0 7.51-2.95 14.82-8.86 21.94-5.9 7.12-12.92 11.09-21.05 11.91-.43-1.41-.65-2.79-.65-4.16z" />
                    </svg>
                    <span>Login with Apple</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: The User's Uploaded Romantic Photo Card */}
            <div className="relative m-3 sm:m-4 md:m-4.5 rounded-2xl sm:rounded-3xl overflow-hidden order-1 md:order-2 min-h-[260px] md:min-h-full flex flex-col justify-between p-6 sm:p-8 bg-[#18110D]">
              {/* Photo Background */}
              <img
                src="/1101552390136306348.jpg"
                alt="Romantic couple moment"
                className="absolute inset-0 w-full h-full object-cover object-center filter saturate-110"
              />

              {/* Atmospheric Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#100D0B]/90 via-[#100D0B]/40 to-[#100D0B]/50 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,139,85,0.25)_0%,transparent_70%)] pointer-events-none" />

              {/* Top Card Copy (matching reference mockup tagline) */}
              <div className="relative z-10">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D88B55] mb-2 block">
                  You can easily
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F5E5D2] leading-tight max-w-[280px]">
                  Explore, plan, and collect moments together
                </h3>
              </div>

              {/* Bottom Card Copy & Features */}
              <div className="relative z-10 pt-12">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C8B8AA]/80 mb-2 block">
                  A private space for two
                </span>
                <div className="flex items-center gap-2 flex-wrap text-[11px] text-[#F5E5D2]/80">
                  <span className="px-2.5 py-1 rounded-full bg-black/40 border border-[#F5E5D2]/14 backdrop-blur-sm">
                    Curated Dates
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/40 border border-[#F5E5D2]/14 backdrop-blur-sm">
                    Private Vault
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/40 border border-[#F5E5D2]/14 backdrop-blur-sm">
                    Real-time Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* 2. AUTHENTICATED SANCTUARY ORBIT (After Login)            */
          /* ========================================================= */
          <div className="overflow-y-auto no-scrollbar flex flex-col flex-1">
            {/* Header */}
            <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-[#F5E5D2]/12 flex items-center justify-between bg-[#19130F]/90">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#D88B55]/15 border border-[#D88B55]/30 flex items-center justify-center text-[#E2A779] shrink-0">
                  <Heart size={16} className="fill-[#D88B55]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D88B55] uppercase">
                      Private Sanctuary
                    </span>
                    <span className="text-[#C8B8AA]/40">•</span>
                    <span className="text-[10px] sm:text-[11px] text-[#C8B8AA]">
                      Elena & David’s Orbit
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-sans font-medium text-[#F5E5D2]">
                    Our Space
                  </h2>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5E5D2]/08 hover:bg-[#F5E5D2]/16 text-xs text-[#C8B8AA] hover:text-[#F5E5D2] transition-colors cursor-pointer mr-8"
              >
                <LogOut size={13} />
                <span>Log out</span>
              </button>
            </div>

            {/* Orbit Content */}
            <div className="p-4 sm:p-8 space-y-6">
              {/* Couple Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-[#1D1612]/70 border border-[#F5E5D2]/10">
                  <div className="flex items-center gap-2 text-[#D88B55] text-xs font-mono uppercase mb-1">
                    <Calendar size={13} /> Days Together
                  </div>
                  <div className="text-2xl font-serif text-[#F5E5D2]">842 Days</div>
                  <div className="text-[11px] text-[#C8B8AA] mt-1">Since June 14, 2024</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1D1612]/70 border border-[#F5E5D2]/10">
                  <div className="flex items-center gap-2 text-[#D88B55] text-xs font-mono uppercase mb-1">
                    <Sparkles size={13} /> Shared Milestones
                  </div>
                  <div className="text-2xl font-serif text-[#F5E5D2]">28 Saved</div>
                  <div className="text-[11px] text-[#C8B8AA] mt-1">12 dates completed</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1D1612]/70 border border-[#F5E5D2]/10">
                  <div className="flex items-center gap-2 text-[#D88B55] text-xs font-mono uppercase mb-1">
                    <Heart size={13} /> Connection State
                  </div>
                  <div className="text-2xl font-serif text-[#F5E5D2]">In Sync</div>
                  <div className="text-[11px] text-[#C8B8AA] mt-1">Both online in Orbit</div>
                </div>
              </div>

              {/* Shared Bucket List */}
              <div className="p-5 rounded-2xl bg-[#19130F]/80 border border-[#F5E5D2]/12">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-sans font-medium text-[#F5E5D2]">
                      Shared Bucket List
                    </h3>
                    <p className="text-xs text-[#C8B8AA]">
                      Dream experiences and date ideas saved together
                    </p>
                  </div>
                  <button
                    onClick={handleCopyInvite}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#F5E5D2]/10 hover:bg-[#F5E5D2]/18 text-[#F5E5D2] transition-colors cursor-pointer"
                  >
                    {partnerCopied ? 'Link Copied!' : 'Invite Partner'}
                  </button>
                </div>

                {/* Add new item */}
                <form onSubmit={handleAddBucket} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Add an experience made for two..."
                    className="flex-1 px-4 py-2 rounded-xl bg-[#120D0A] border border-[#F5E5D2]/15 text-xs text-[#F5E5D2] placeholder-[#C8B8AA]/50 focus:outline-none focus:border-[#D88B55]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#D88B55] hover:bg-[#E2955E] text-[#100D0B] font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add
                  </button>
                </form>

                {/* Bucket list items */}
                <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                  {bucketList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onToggleBucketItem(item.id)}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#140F0C] border border-[#F5E5D2]/08 hover:border-[#F5E5D2]/20 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            item.completed
                              ? 'bg-[#D88B55] border-[#D88B55] text-[#100D0B]'
                              : 'border-[#F5E5D2]/30 text-transparent'
                          }`}
                        >
                          <Check size={12} strokeWidth={2.6} />
                        </div>
                        <span
                          className={`text-xs font-sans ${
                            item.completed
                              ? 'line-through text-[#C8B8AA]/50'
                              : 'text-[#F5E5D2]'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D88B55] uppercase">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
