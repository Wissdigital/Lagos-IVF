/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Phone, MapPin, Mail, Award, Clock, ArrowUpRight } from 'lucide-react';
import { PageId, ServiceId } from '../types';
import { SERVICES_DATA } from '../data';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onNavigateToService: (serviceId: ServiceId) => void;
  onOpenPrivacy?: () => void;
  onOpenGuidelines?: () => void;
  onOpenSitemap?: () => void;
}

export default function Footer({ 
  onNavigate, 
  onNavigateToService,
  onOpenPrivacy,
  onOpenGuidelines,
  onOpenSitemap
}: FooterProps) {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 mt-auto border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-navy-900/60">
          
          {/* Column 1: Clinic brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border-b-2 border-orange-600">
                <Heart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-white leading-none">
                  LAGOS<span className="text-orange-600 font-black">IVF</span>
                </span>
                <span className="block text-[8px] font-bold text-orange-400 tracking-wider uppercase leading-tight mt-0.5">
                  Specialist Clinic
                </span>
              </div>
            </div>
            
            <p className="text-xs text-white/85 leading-relaxed pt-2">
              Lagos IVF Specialist Clinic is sub-Saharan Africa’s premier reproductive endocrinology laboratory. We offer state-of-the-art incubation, PGT-A family balancing, gestational surrogacy, sperm microinjection, and certified donor egg and sperm repositories.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1 text-[10px] font-bold text-orange-400 border border-navy-800">
                <Award className="h-3.5 w-3.5" />
                HEFAMAA Registered
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1 text-[10px] font-bold text-white/90 border border-navy-800">
                ISO 9001 Lab
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-orange-600">Patient Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Home Portal
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Our Pioneers & Lab
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  In-Depth Services
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('book')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Live Booking Calendar
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Clinic Location Map
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Knowledge Hub &amp; Blog
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  Secure CMS Admin Portal
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Services Pathways */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-orange-600">Clinical Specialties</h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigateToService(service.id)}
                    className="text-white/80 hover:text-orange-500 font-semibold transition-colors cursor-pointer text-left block"
                  >
                    {service.title.split(' (')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Core Coordinates */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-orange-600">Lagos Coordinates</h4>
            
            <div className="space-y-3.5 text-xs text-white/90">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>
                  12B Landmark Avenue,<br />
                  Off Admiralty Way,<br />
                  Victoria Island, Lagos, Nigeria
                </span>
              </div>

               <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <a href="tel:+2348039003000" className="hover:text-orange-500 transition-colors">
                  +234 (803) 900-3000
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <a href="mailto:info@lagosivfspecialists.com" className="hover:text-orange-500 transition-colors">
                  info@lagosivfspecialists.com
                </a>
              </div>

              <div className="flex items-start gap-2 border-t border-navy-900 pt-3">
                <Clock className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white text-[11px]">Lab Operating Hours</span>
                  <span className="block text-[10px] text-white/70">Mon - Fri: 8:00 AM - 5:00 PM</span>
                  <span className="block text-[10px] text-white/70">Saturday: 9:00 AM - 2:00 PM</span>
                  <span className="block text-[10px] text-orange-500 font-medium">Emergency/On-Call Semen Dropoff: 24/7</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details & Medical Disclaimers */}
        <div className="pt-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 text-[10px] text-white/60 leading-relaxed">
          <div className="max-w-2xl">
            <span className="block text-white/90 font-semibold mb-1">Medical Council Disclaimer & Copyright</span>
            <p>
              © {new Date().getFullYear()} Lagos IVF Specialist Clinic. All rights reserved. The medical treatment options discussed on this platform, including pre-implantation genetic screening (PGT-A), ICSI, surrogacy contracts, and donor programs are provided under rigorous supervision of fully certified Nigerian Medical and Dental Council (MDCN) consultants and registered HEFAMAA standards. Individual success rates vary based on maternal cohort age, medical profiles, and physiological factors.
            </p>
          </div>
          <div className="flex gap-4 border-t border-navy-900 lg:border-t-0 pt-4 lg:pt-0">
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap bg-transparent border-0 p-0 text-[10px] text-white/60 font-medium"
            >
              Privacy & HIPAA Policy
            </button>
            <button 
              onClick={onOpenGuidelines}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap bg-transparent border-0 p-0 text-[10px] text-white/60 font-medium"
            >
              Clinical Guidelines
            </button>
            <button 
              onClick={onOpenSitemap}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap bg-transparent border-0 p-0 text-[10px] text-white/60 font-medium"
            >
              Sitemap XML
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
