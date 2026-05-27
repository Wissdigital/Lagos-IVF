/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Shield, Activity, FileCode, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { PageId, ServiceId } from '../types';
import { SERVICES_DATA } from '../data';

interface PolicyModalsProps {
  activeModal: 'privacy' | 'guidelines' | 'sitemap' | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onNavigateToService: (serviceId: ServiceId) => void;
}

export default function PolicyModals({
  activeModal,
  onClose,
  onNavigate,
  onNavigateToService,
}: PolicyModalsProps) {
  if (!activeModal) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/40 backdrop-blur-md animate-fade-in text-left"
      id="policy-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl border border-navy-150 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Branding Bar */}
        <div className="bg-navy-50 border-b border-navy-150 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
              {activeModal === 'privacy' && <Shield className="h-5 w-5 text-orange-600" />}
              {activeModal === 'guidelines' && <Activity className="h-5 w-5 text-orange-600" />}
              {activeModal === 'sitemap' && <FileCode className="h-5 w-5 text-orange-600" />}
            </div>
            <div>
              <h2 className="text-base font-black text-navy-950 leading-tight">
                {activeModal === 'privacy' && 'Privacy & HIPAA Policy'}
                {activeModal === 'guidelines' && 'Clinical Practice Guidelines'}
                {activeModal === 'sitemap' && 'Dynamic XML Sitemap index'}
              </h2>
              <p className="text-[10px] text-navy-600 uppercase font-mono tracking-wider font-semibold">
                {activeModal === 'privacy' && 'Sovereign Patient Security Protocol'}
                {activeModal === 'guidelines' && 'AFRH & ISO 9001 Regulatory Benchmarks'}
                {activeModal === 'sitemap' && 'Interactive Semantic Crawler Network'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-navy-100 flex items-center justify-center text-navy-600 hover:text-navy-950 transition-colors border border-navy-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Dynamic Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* 1. PRIVACY & HIPAA POLICY */}
          {activeModal === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-2">
                <div className="flex gap-2 items-center text-xs font-extrabold text-orange-850">
                  <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                  <span>Total Patient Confidentiality & NDPR Compliance</span>
                </div>
                <p className="text-[11px] text-navy-800 leading-relaxed font-medium">
                  We guarantee that your entire medical registry—from donor catalogs and matching logs, to hormone sync metrics and surrogacy legal filings—is encrypted end-to-end on locked physical hosts in Nigeria. Absolutely zero treatment meta-data is sold or exposed to external marketing providers.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-navy-950 tracking-wider">1. HIPAA-Standard Electronic Medical Records</h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    Our Lagos clinic operates using standard secure e-health records that meet international privacy frameworks. This ensures all sperm analysis results, ovarian reserve diagnostics, and embryo image assets remain under role-based clinician passwords only.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-navy-950 tracking-wider">2. Absolute Anonymity/Non-Disclosure</h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    Sperm and egg donors sign rigorous non-disclosure agreements before clinical inclusion. Cross-matching registries are permanently hashed using AES-256 standards, preventing any inadvertent future parental tracking.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-navy-950 tracking-wider">3. Right of Complete Biological Purge</h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    Intended parents have a legal, sovereign right under our clinic bylaws to request the secure, permanent purge of genetic testing metadata or non-essential cellular reports immediately following a healthy live delivery and hospital discharge.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. CLINICAL PRACTICE GUIDELINES */}
          {activeModal === 'guidelines' && (
            <div className="space-y-6">
              <div className="p-4 bg-navy-50 border border-navy-150 rounded-xl space-y-2">
                <div className="flex gap-2 items-center text-xs font-extrabold text-navy-950">
                  <Activity className="h-4 w-4 text-orange-600 flex-shrink-0" />
                  <span>Peer-Reviewed Quality Assurance Measures</span>
                </div>
                <p className="text-[11px] text-navy-700 leading-relaxed">
                  Lagos IVF Specialist Clinic is proud to execute all treatments strictly within the official Association for Fertility and Reproductive Health (AFRH) code of ethics and WHO laboratory standards to ensure the highest safety guidelines.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-navy-950 tracking-wider">1. Class-100 Cleanroom Biological Air Quality</h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    Our incubators are situated inside certified cleanrooms with positive atmospheric pressure. Continuous VOC chemical scrubbers and 12x volume cycling filter out particles down to 0.3 micrometers, eliminating chemical damage risk to developing zygotes.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-navy-950 tracking-wider">2. Strict Micromanipulator Protocols</h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    Intracytoplasmic Sperm Injections (ICSI) are completed within 45 seconds of cell isolation. This protects delicate egg cells against environmental thermal shock, increasing fertilization rates to over 85% in seasoned cohorts.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-navy-950 tracking-wider">3. Blastocyst Biopsy Limits</h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    Biopsies for PGT-A genetic balancing are conducted uniquely on Day-5 blastocysts with a dense trophectoderm layer. Cells are isolated strictly from the outer layer (destined to become the placenta), while the fetal inner cell mass is left completely untouched.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. INTERACTIVE SITEMAP XML */}
          {activeModal === 'sitemap' && (
            <div className="space-y-6">
              <p className="text-xs text-navy-600 leading-relaxed">
                Below is our live search engine manifest. It serves to detail the interconnected SEO architecture of Lagos IVF Specialist Clinic. <strong className="text-navy-950">Click on any green-highlighted path location below to crawl and navigate immediately.</strong>
              </p>

              <div className="font-mono text-[11px] overflow-x-auto bg-navy-50 border border-navy-150 rounded-xl p-5 text-navy-805 space-y-1 leading-snug">
                <div className="text-navy-450 select-none">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</div>
                <div className="text-navy-450 select-none pb-2">&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;</div>
                
                {/* 1. Home */}
                <div 
                  className="pl-4 hover:bg-orange-100/40 p-2 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-orange-200"
                  onClick={() => { onNavigate('home'); onClose(); }}
                >
                  <span className="text-navy-400">&lt;url&gt;</span><br/>
                  <span className="pl-4 text-navy-400">&lt;loc&gt;</span>
                  <span className="text-orange-600 font-extrabold group-hover:underline flex-inline items-center gap-1">
                    https://lagosivfspecialists.com/ <ExternalLink className="h-3 w-3 inline text-orange-555" />
                  </span>
                  <span className="text-navy-400">&lt;/loc&gt;</span><br/>
                  <span className="pl-4 text-navy-500">&lt;priority&gt;1.0&lt;/priority&gt;</span><br/>
                  <span className="text-navy-400">&lt;/url&gt;</span>
                </div>

                {/* 2. About */}
                <div 
                  className="pl-4 hover:bg-orange-100/40 p-2 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-orange-200"
                  onClick={() => { onNavigate('about'); onClose(); }}
                >
                  <span className="text-navy-400">&lt;url&gt;</span><br/>
                  <span className="pl-4 text-navy-400">&lt;loc&gt;</span>
                  <span className="text-orange-600 font-extrabold group-hover:underline flex-inline items-center gap-1">
                    https://lagosivfspecialists.com/about <ExternalLink className="h-3 w-3 inline text-orange-555" />
                  </span>
                  <span className="text-navy-400">&lt;/loc&gt;</span><br/>
                  <span className="pl-4 text-navy-500">&lt;priority&gt;0.9&lt;/priority&gt;</span><br/>
                  <span className="text-navy-400">&lt;/url&gt;</span>
                </div>

                {/* 3. Services Directory */}
                <div 
                  className="pl-4 hover:bg-orange-100/40 p-2 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-orange-200"
                  onClick={() => { onNavigate('services'); onClose(); }}
                >
                  <span className="text-navy-400">&lt;url&gt;</span><br/>
                  <span className="pl-4 text-navy-400">&lt;loc&gt;</span>
                  <span className="text-orange-600 font-extrabold group-hover:underline flex-inline items-center gap-1">
                    https://lagosivfspecialists.com/services <ExternalLink className="h-3 w-3 inline text-orange-555" />
                  </span>
                  <span className="text-navy-400">&lt;/loc&gt;</span><br/>
                  <span className="pl-4 text-navy-500">&lt;priority&gt;0.9&lt;/priority&gt;</span><br/>
                  <span className="text-navy-400">&lt;/url&gt;</span>
                </div>

                {/* 4. Single Service Pages (PGT-A, Egg Donation, Surrogacy, Sperm donation, ICSI) */}
                {SERVICES_DATA.map(s => (
                  <div 
                    key={s.id}
                    className="pl-8 hover:bg-orange-100/40 p-2 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-orange-200"
                    onClick={() => { onNavigateToService(s.id); onClose(); }}
                  >
                    <span className="text-navy-400">&lt;url&gt;</span><br/>
                    <span className="pl-4 text-navy-400">&lt;loc&gt;</span>
                    <span className="text-orange-600 font-extrabold group-hover:underline flex-inline items-center gap-1">
                      https://lagosivfspecialists.com/services/{s.id} <ExternalLink className="h-3 w-3 inline text-orange-555" />
                    </span>
                    <span className="text-navy-400">&lt;/loc&gt;</span><br/>
                    <span className="pl-4 text-navy-500">&lt;priority&gt;0.8&lt;/priority&gt;</span><br/>
                    <span className="text-navy-400">&lt;/url&gt;</span>
                  </div>
                ))}

                {/* 5. Contact */}
                <div 
                  className="pl-4 hover:bg-orange-100/40 p-2 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-orange-200"
                  onClick={() => { onNavigate('contact'); onClose(); }}
                >
                  <span className="text-navy-400">&lt;url&gt;</span><br/>
                  <span className="pl-4 text-navy-400">&lt;loc&gt;</span>
                  <span className="text-orange-600 font-extrabold group-hover:underline flex-inline items-center gap-1">
                    https://lagosivfspecialists.com/contact <ExternalLink className="h-3 w-3 inline text-orange-555" />
                  </span>
                  <span className="text-navy-400">&lt;/loc&gt;</span><br/>
                  <span className="pl-4 text-navy-500">&lt;priority&gt;0.8&lt;/priority&gt;</span><br/>
                  <span className="text-navy-400">&lt;/url&gt;</span>
                </div>

                {/* 6. Book Appointment */}
                <div 
                  className="pl-4 hover:bg-orange-100/40 p-2 rounded-lg transition-all group cursor-pointer border border-transparent hover:border-orange-200"
                  onClick={() => { onNavigate('book'); onClose(); }}
                >
                  <span className="text-navy-400">&lt;url&gt;</span><br/>
                  <span className="pl-4 text-navy-400">&lt;loc&gt;</span>
                  <span className="text-orange-600 font-extrabold group-hover:underline flex-inline items-center gap-1">
                    https://lagosivfspecialists.com/book-appointment <ExternalLink className="h-3 w-3 inline text-orange-555" />
                  </span>
                  <span className="text-navy-400">&lt;/loc&gt;</span><br/>
                  <span className="pl-4 text-navy-500">&lt;priority&gt;1.0&lt;/priority&gt;</span><br/>
                  <span className="text-navy-400">&lt;/url&gt;</span>
                </div>

                <div className="text-navy-450 select-none pt-2">&lt;/urlset&gt;</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions of modal */}
        <div className="bg-navy-50 border-t border-navy-150 px-6 py-4 flex items-center justify-between">
          <p className="text-[10px] text-navy-500 font-semibold tracking-wide flex items-center gap-1.5 select-none">
            Verified by NMCN & AFRH Regulatory Councils
          </p>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            Acknowledge Guidelines
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
