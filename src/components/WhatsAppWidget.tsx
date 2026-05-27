/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MessageCircle, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    // Show a gentle pop-up notification on initial load after 4 seconds to grab attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setHasNotified(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = "https://wa.me/2348039003000?text=Hello%20Lagos%20IVF%20Specialist%20Clinic%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20fertility%20treatments%20and%2520consultation.";

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end text-left select-none">
      
      {/* Tooltip / Online status preview bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-3 max-w-[280px] bg-white rounded-2xl border border-emerald-100 shadow-xl p-4 relative text-navy-950"
            id="whatsapp-chat-preview-bubble"
          >
            {/* Close tooltip helper button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute top-2.5 right-2.5 text-navy-400 hover:text-navy-950 p-0.5 rounded-full hover:bg-navy-50 transition-colors cursor-pointer"
              aria-label="Dismiss message preview"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Coordinator header indicator */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] font-black uppercase text-emerald-600 tracking-wider font-mono">Coordinator Online</p>
            </div>

            {/* Direct message text */}
            <p className="text-[11px] text-navy-800 leading-relaxed font-semibold">
              Need immediate advice? Text our specialist fertility coordinator directly on WhatsApp.
            </p>

            {/* Quick click CTA link in tooltip */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-all"
            >
              Start Chat Now
              <span>→</span>
            </a>

            {/* Speech bubble bottom pin tail */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-b border-r border-emerald-100 transform rotate-45 select-none pointer-events-none"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Circle Button */}
      <div className="relative group">
        
        {/* Pulsing visual glow background ring */}
        {!showTooltip && (
          <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-60"></span>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => {
            if (!hasNotified) {
              setShowTooltip(true);
            }
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-emerald-400/30"
          id="whatsapp-floating-button-click-target"
          aria-label="Chat with Lagos IVF Specialist Coordinator on WhatsApp"
        >
          {/* Custom High contrast Whatsapp vector look using Lucide MessageCircle */}
          <MessageCircle className="h-6 w-6 stroke-[2.2px] fill-white text-emerald-500 group-hover:rotate-6 transition-transform" />
        </a>

        {/* Floating miniature notification indicator alert dot */}
        {!showTooltip && !hasNotified && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-650 font-bold text-[9px] text-white border border-white">
            1
          </span>
        )}
      </div>

    </div>
  );
}
