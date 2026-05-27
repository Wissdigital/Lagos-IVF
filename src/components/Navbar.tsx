/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Calendar, Heart, Shield, HelpCircle } from 'lucide-react';
import { PageId, ServiceId } from '../types';
import { SERVICES_DATA } from '../data';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onNavigateToService: (serviceId: ServiceId) => void;
}

export default function Navbar({ activePage, onNavigate, onNavigateToService }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleServiceClick = (id: ServiceId) => {
    onNavigateToService(id);
    setServicesDropdownOpen(false);
    setIsOpen(false);
  };

  const handleRegularPageClick = (page: PageId) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-navy-100 shadow-sm transition-all duration-300">
      
      {/* Top Bar for Professional Clinical Branding */}
      <div className="bg-navy-950 text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-1.5 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Lagos Premier Fertility Specialist Clinic
            </span>
            <span className="hidden md:inline-block text-navy-300">|</span>
            <span className="hidden md:inline">Registered HEFAMAA Clinic & ISO Certified Lab</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+2348039003000" className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors">
              <Phone className="h-3 w-3" />
              <span>+234 (803) 900-3000</span>
            </a>
            <span className="text-navy-300">|</span>
            <span className="text-navy-100">VI, Lagos, Nigeria</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => handleRegularPageClick('home')}
              className="flex items-center gap-2 text-left cursor-pointer select-none group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 border-b-2 border-orange-600 transition-all duration-300 group-hover:bg-navy-800">
                <Heart className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <span className="block text-lg font-black tracking-tight text-navy-900 leading-none">
                  LAGOS<span className="text-orange-600">IVF</span>
                </span>
                <span className="block text-[9px] font-bold text-navy-600 tracking-wider uppercase leading-tight mt-0.5">
                  Specialist Clinic
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (Montserrat font, lots of spacing) */}
          <nav className="hidden lg:flex space-x-8 items-center">
            <button
              onClick={() => handleRegularPageClick('home')}
              className={`text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                activePage === 'home' ? 'text-orange-600' : 'text-navy-950 hover:text-orange-600'
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => handleRegularPageClick('about')}
              className={`text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                activePage === 'about' ? 'text-orange-600' : 'text-navy-950 hover:text-orange-600'
              }`}
            >
              About
            </button>

            {/* Services Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onBlur={() => setTimeout(() => setServicesDropdownOpen(false), 200)}
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                  activePage === 'services' ? 'text-orange-600' : 'text-navy-950 hover:text-orange-600'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-navy-100 shadow-xl py-2 z-50 animate-fade-in animate-duration-150">
                  <div className="px-4 py-2 border-b border-navy-50">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-navy-400">Assisted Reproduction</span>
                  </div>
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service.id)}
                      className="w-full text-left px-4 py-2.5 text-xs text-navy-950 font-semibold hover:bg-orange-50 hover:text-orange-600 border-l-2 border-transparent hover:border-orange-500 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>{service.title.split(' (')[0]}</span>
                      <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-navy-300" />
                    </button>
                  ))}
                  <div className="p-2 border-t border-navy-50">
                    <button
                      onClick={() => handleRegularPageClick('services')}
                      className="w-full text-center py-1.5 rounded-lg bg-navy-50 text-[11px] font-bold text-navy-700 hover:bg-navy-100 transition-colors cursor-pointer"
                    >
                      View All Services Overview
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleRegularPageClick('contact')}
              className={`text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                activePage === 'contact' ? 'text-orange-600' : 'text-navy-950 hover:text-orange-600'
              }`}
            >
              Contact Us
            </button>
            
            {/* CTA Button */}
            <button
              onClick={() => handleRegularPageClick('book')}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer select-none border ${
                activePage === 'book'
                  ? 'bg-orange-600 border-orange-600 text-white shadow-orange-100'
                  : 'bg-navy-905 border-navy-900 bg-navy-900 text-white hover:bg-orange-600 hover:border-orange-600 hover:shadow-orange-150 shadow-navy-150'
              }`}
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Action Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-navy-900 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-white border-b border-navy-100 space-y-3 animate-fade-in" id="mobile-nav-panel">
          <button
            onClick={() => handleRegularPageClick('home')}
            className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide cursor-pointer ${
              activePage === 'home' ? 'bg-orange-50 text-orange-600' : 'text-navy-950 hover:bg-navy-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleRegularPageClick('about')}
            className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide cursor-pointer ${
              activePage === 'about' ? 'bg-orange-50 text-orange-600' : 'text-navy-950 hover:bg-navy-50'
            }`}
          >
            About
          </button>

          {/* Collapsible Mobile Services */}
          <div className="border border-navy-100/50 rounded-xl overflow-hidden bg-navy-50/20">
            <div className="px-4 py-2 border-b border-navy-100/30 bg-navy-50/40">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-navy-500">Our Services</span>
            </div>
            <div className="p-1.5 space-y-1">
              {SERVICES_DATA.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="w-full text-left px-4 py-2 rounded-lg text-xs font-semibold text-navy-850 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{service.title.split(' (')[0]}</span>
                  <ChevronDown className="h-3 w-3 -rotate-90 text-navy-300" />
                </button>
              ))}
              <button
                onClick={() => handleRegularPageClick('services')}
                className="w-full text-center py-2 text-xs font-bold text-orange-600 hover:bg-orange-100/50 rounded-lg transition-all cursor-pointer"
              >
                Services Overview
              </button>
            </div>
          </div>

          <button
            onClick={() => handleRegularPageClick('contact')}
            className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide cursor-pointer ${
              activePage === 'contact' ? 'bg-orange-50 text-orange-600' : 'text-navy-950 hover:bg-navy-50'
            }`}
          >
            Contact Us
          </button>

          <button
            onClick={() => handleRegularPageClick('book')}
            className="w-full py-3 rounded-full bg-orange-600 text-white font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-100 hover:bg-orange-700 cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            Book Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}
