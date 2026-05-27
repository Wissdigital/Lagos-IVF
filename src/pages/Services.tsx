/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Dna, Sparkles, Heart, Activity, Target, ChevronRight, Calendar, BookmarkCheck, ArrowLeft, ShieldAlert } from 'lucide-react';
import { PageId, ServiceId, ServiceDetail } from '../types';
import { SERVICES_DATA } from '../data';

interface ServicesProps {
  activeServiceId: ServiceId | null;
  onNavigateToService: (serviceId: ServiceId | null) => void;
  onBookWithService: (serviceId: ServiceId) => void;
  onNavigate?: (page: PageId) => void;
}

export default function Services({ activeServiceId, onNavigateToService, onBookWithService, onNavigate }: ServicesProps) {
  
  // Find currently active single service details
  const activeService = SERVICES_DATA.find(s => s.id === activeServiceId);

  // Helper to dynamically render corresponding icon
  const getServiceIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case 'Dna':
        return <Dna className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Target':
        return <Target className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  if (activeService) {
    // ------------------------------------------------------------------
    // SINGLE SERVICE DETAILED PAGE VIEW
    // ------------------------------------------------------------------
    return (
      <div className="space-y-16 animate-fade-in pb-16 text-left">
        
        {/* Back navigational wire */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => onNavigateToService(null)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-600 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services Directory
          </button>
        </div>

        {/* 1. Service Hero Accent Banner */}
        <section className="bg-navy-950 text-white py-12 relative overflow-hidden" id={`service-hero-${activeService.id}`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/40 via-navy-900 to-navy-950"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-600 text-white rounded-lg">
                {getServiceIcon(activeService.iconName, "h-5 w-5")}
              </div>
              <span className="text-xs uppercase font-extrabold text-orange-400 tracking-widest font-mono">Specialized Treatment</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-3xl leading-tight">
              {activeService.title}
            </h1>
            
            <p className="text-xs sm:text-sm text-navy-200 max-w-2xl leading-relaxed">
              {activeService.shortDescription}
            </p>

            {/* Success Factor Badge */}
            <div className="inline-flex items-center gap-2 bg-navy-900/80 border border-navy-800 px-4 py-2 rounded-xl">
              <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-wide">Lab Pregnancy Success Target:</span>
              <span className="text-xs font-extrabold text-white">{activeService.successRate}</span>
            </div>

          </div>
        </section>

        {/* 2. Overview & Specific Indications Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="service-overview">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl font-extrabold uppercase tracking-widest text-navy-950 border-b-2 border-orange-500 pb-2">
                In-Depth Clinical Review
              </h2>
              <p className="text-xs sm:text-sm text-navy-850 leading-relaxed">
                {activeService.longDescription}
              </p>
              
              <div className="bg-navy-50/55 border border-navy-100 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-navy-900">
                  <ShieldAlert className="h-5 w-5 text-orange-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Ethical Compliance & Patient Safety</span>
                </div>
                <p className="text-[11px] text-navy-700 leading-relaxed">
                  Every step of our process—from secure donor catalog comparisons, genetic sequence vetting, to medical surrogacy contract signings—is managed under strict medical guidelines in Nigeria. Our on-staff psychologists and healthcare counsels provide exhaustive supportive therapies throughout the fertility timeline.
                </p>
              </div>

              {/* Service Visual Image 1 */}
              {activeService.images?.[0] && (
                <div className="rounded-3xl overflow-hidden border border-navy-150 shadow-sm relative group h-64 sm:h-72 mt-6">
                  <img 
                    src={activeService.images[0]} 
                    alt={`${activeService.title} Clinical Laboratory Integration`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/10 to-transparent flex items-end p-6">
                    <div>
                      <p className="text-[10px] text-orange-400 font-extrabold uppercase font-mono tracking-widest">Active Biotech Phase</p>
                      <p className="text-xs text-white font-bold mt-1">Advanced micromanipulation & clinical embryology pipeline</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Indications Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-navy-150 rounded-3xl p-8 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-orange-650">Who is this recommended for?</h3>
                <p className="text-xs text-navy-600">This pathway is typically advised as an optimal medical alternative for patients experiencing:</p>
                
                <ul className="space-y-3 pt-2">
                  {activeService.indications.map((ind, index) => (
                    <li key={index} className="flex gap-2.5 items-start text-xs text-navy-850 font-semibold leading-relaxed">
                      <span className="h-5 w-5 rounded bg-orange-100 text-orange-850 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                        ✔
                      </span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Visual Image 2 */}
              {activeService.images?.[1] && (
                <div className="rounded-3xl overflow-hidden border border-navy-150 shadow-sm relative group h-64">
                  <img 
                    src={activeService.images[1]} 
                    alt={`${activeService.title} Consultation Support`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/10 to-transparent flex items-end p-6">
                    <div>
                      <p className="text-[10px] text-orange-400 font-extrabold uppercase font-mono tracking-widest">Personalized Treatment</p>
                      <p className="text-xs text-white font-bold mt-1">Holistic counseling & comprehensive guidance</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* 3. Detailed Step-by-Step Clinical Timeline */}
        <section className="bg-orange-50/25 border-y border-orange-100/50 py-16 text-left" id="service-process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block">The Treatment Path</span>
              <h2 className="text-3xl font-black text-navy-950 tracking-tight">The Lab Milestones We Lead You Through</h2>
              <p className="text-xs text-navy-700">
                Here is a breakdown of what the clinical cycle looks like, from initial diagnostic stimulation to uterine transfer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {activeService.processSteps.map((step, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-navy-100 p-6 space-y-3 hover:border-orange-200 transition-colors relative">
                  {/* Indicator Line */}
                  {idx < 4 && (
                    <div className="hidden md:block absolute top-12 -right-4 w-8 border-t-2 border-dashed border-orange-200 z-10"></div>
                  )}
                  <span className="text-2xl font-black text-orange-500 font-sans block leading-none">0{idx + 1}</span>
                  <h4 className="font-extrabold text-sm text-navy-950">{step.title}</h4>
                  <p className="text-[10px] text-navy-700 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Single-Service Specific FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8" id="service-faqs">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block">Common Queries</span>
            <h2 className="text-2xl font-black text-navy-950 tracking-tight">Frequently Asked Service Questions</h2>
          </div>

          <div className="space-y-6">
            {activeService.faqs.map((faq, fidx) => (
              <div key={fidx} className="bg-white rounded-2xl p-6 border border-navy-150 space-y-2 shadow-sm">
                <h4 className="font-bold text-sm text-navy-950 border-l-2 border-orange-500 pl-3">
                  {faq.question}
                </h4>
                <p className="text-xs text-navy-700 leading-relaxed pl-3">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4.5. Related Treatment & Clinic Links (SEO Power Grid / Interconnected links) */}
        <section className="bg-orange-50/15 border-y border-orange-100/30 py-16 text-left" id="service-interconnections">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block">Interconnected Specialist Network</span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">Explore Other Highly Targeted Treatments</h2>
                <p className="text-xs text-navy-700 max-w-2xl">
                  Bypassing different parenting challenges requires different laboratory methodologies. Select one of our alternative specialties below to study its clinical flow and success metrics.
                </p>
              </div>
              <div>
                <button 
                  onClick={() => onNavigateToService(null)}
                  className="text-xs font-bold text-navy-900 uppercase tracking-wider hover:text-orange-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  View All Specialties
                  <ChevronRight className="h-4 w-4 text-orange-500" />
                </button>
              </div>
            </div>

            {/* Other Services Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_DATA.filter(s => s.id !== activeService.id).map((otherService) => (
                <div 
                  key={otherService.id}
                  onClick={() => onNavigateToService(otherService.id)}
                  className="bg-white rounded-2xl border border-navy-100 p-6 flex flex-col justify-between hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="inline-flex p-2 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      {getServiceIcon(otherService.iconName, "h-4 w-4")}
                    </div>
                    <h3 className="font-extrabold text-sm text-navy-950 group-hover:text-orange-650 transition-colors line-clamp-1">
                      {otherService.title.split(' (')[0]}
                    </h3>
                    <p className="text-[10px] text-navy-600 leading-relaxed line-clamp-3">
                      {otherService.shortDescription}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-navy-50 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-navy-900 group-hover:text-orange-600 transition-colors">
                    <span>Explore Pathway</span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* General Site SEO Links Hub */}
            <div className="bg-white border border-navy-150/65 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 text-center md:text-left max-w-2xl">
                <h4 className="text-sm font-black uppercase tracking-wider text-navy-950">Looking for more clinical coordinates?</h4>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Understand our <button onClick={() => onNavigate?.('about')} className="text-orange-600 hover:underline font-bold transition-all">Class-100 IVF Lab Environment & Embryology Counsel</button> or explore our secure <button onClick={() => onNavigate?.('about')} className="text-orange-600 hover:underline font-bold transition-all">Fertility Nursing & Patient Care Team</button> page.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <button 
                  onClick={() => onNavigate?.('about')}
                  className="px-5 py-3 bg-navy-50 hover:bg-navy-100 text-navy-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Our Medical Philosophy
                </button>
                <button 
                  onClick={() => onNavigate?.('contact')}
                  className="px-5 py-3 bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Contact Victoria Island Clinic
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Direct Appointment CTA (Auto-selected!) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-950 opacity-90"></div>
            
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <span className="text-[10px] uppercase font-mono font-extrabold text-orange-400 tracking-widest">Confidential Booking Slot</span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Want to Start Your {activeService.title.split(' (')[0]} Journey?
              </h3>
              <p className="text-xs sm:text-sm text-navy-300 leading-relaxed">
                Click below to open our live interactive appointment scheduler. Your selection is pre-loaded into the form, and our medical coordinator will assign the top specialist for your primary interview.
              </p>
              <div>
                <button
                  onClick={() => onBookWithService(activeService.id)}
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg shadow-orange-950/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Calendar className="h-4.5 w-4.5" />
                  Reserve Appointment Slot Now
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }

  // ------------------------------------------------------------------
  // GENERAL SERVICES INDEX / DIRECTORY VIEW
  // ------------------------------------------------------------------
  return (
    <div className="space-y-20 animate-fade-in pb-16 text-left">
      
      {/* 1. Header segment */}
      <section className="bg-navy-950 text-white min-h-[250px] flex items-center pt-12 pb-16 relative overflow-hidden" id="services-intro">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-950 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-950 border border-orange-800 px-3 py-1 text-xs font-bold text-orange-400">
            <Activity className="h-3.5 w-3.5" />
            Leading Clinical Innovations
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Our Advanced Reproductive & Laboratory Specialties
          </h1>
          <p className="text-sm sm:text-base text-navy-250 max-w-2xl leading-relaxed">
            Every clinical protocol is custom-tailored. From high-grade micromanipulations (ICSI) to ethical surrogacy cycles, we offer state-of-the-art technologies that bypass traditional parenting hurdles.
          </p>
        </div>
      </section>

      {/* 2. Services Grid (Sleek card styles, negative space, orange and navy brand colors) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-grid">
        <div className="space-y-12">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row gap-8 items-center bg-white border border-navy-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* Service Icon Panel */}
              <div className="w-full lg:w-1/3 flex flex-col justify-center items-center text-center p-8 bg-orange-50/50 rounded-2xl border border-orange-100/30 gap-4">
                <div className="h-16 w-16 rounded-2xl bg-navy-900 text-orange-500 flex items-center justify-center border-b-2 border-orange-550 shadow-md">
                  {getServiceIcon(service.iconName, "h-8 w-8")}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-extrabold text-navy-400 block tracking-widest">Expected Success Rate</span>
                  <span className="text-lg font-black text-navy-950 block pt-0.5">{service.successRate.split(' (')[0]}</span>
                </div>
              </div>

              {/* Service Details Panel */}
              <div className="w-full lg:w-2/3 space-y-4">
                <h3 className="text-2xl font-black text-navy-950 tracking-tight hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs text-navy-700 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Specific Indications List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-orange-650 block">Typical Indications</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.indications.slice(0, 2).map((ind, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-navy-850 leading-tight">
                        <span className="text-orange-600">✔</span>
                        <span>{ind.split(' (')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigational Links */}
                <div className="pt-6 border-t border-navy-50 flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    onClick={() => onNavigateToService(service.id)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-100 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Explore In-Depth Process
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onBookWithService(service.id)}
                    className="w-full sm:w-auto text-center py-2.5 text-xs text-orange-650 hover:text-orange-850 font-bold tracking-wider hover:underline transition-all cursor-pointer"
                  >
                    Pre-select & Book Consult
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
