/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Activity, ShieldCheck, Heart, UserCheck, Calendar, Star, HelpCircle, Sparkles, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageId, ServiceId } from '../types';
import { SERVICES_DATA, CLINIC_STATS, REVIEWS, FAQS_GENERAL } from '../data';
// @ts-ignore
import heroBannerAsset from '../assets/images/lagos_ivf_hero_banner_1779794260930.png';

const HERO_SLIDES = [
  {
    id: 1,
    tagline: '#1 Ranked Fertility Clinic in Lagos, Nigeria',
    title: 'Your Genetic Pathway to Parenthood',
    description: 'Lagos IVF Specialist Clinic matches cutting-edge global embryology advancements with compassionate, local care in our state-of-the-art Victoria Island facility.',
    btnPrimary: 'Book Live Consultation',
    btnPrimaryPage: 'book',
    btnSecondary: 'Explore IVF Services',
    btnSecondaryPage: 'services',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1600&h=800',
    statLabel: 'IVF Success Rate',
    statValue: '72%',
    substat: 'Verified Clinical Cohorts'
  },
  {
    id: 2,
    tagline: 'ISO 9001 Certified Lab Environment',
    title: 'Advanced Genetic Screening & Family Design',
    description: 'Bypassing chromosomal anomalies with high-precision PGT-A gender balancing and ICSI to significantly elevate successful embryo transfer rates.',
    btnPrimary: 'Schedule Screening',
    btnPrimaryPage: 'book',
    btnSecondary: 'Biotech Lab Details',
    btnSecondaryService: 'sperm-injection',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=1600&h=800',
    statLabel: 'Embryo Cleavages',
    statValue: '85%+',
    substat: 'Class-100 Air-controlled labs'
  },
  {
    id: 3,
    tagline: 'Elite Surrogate Profiles & Care Packages',
    title: 'Compassionate & Legally Vetted Surrogacy',
    description: 'Offering fully legally audited gestational carrier programs and egg match catalogs under strict, sovereign HIPAA patient records protections.',
    btnPrimary: 'Consult Coordinator',
    btnPrimaryPage: 'book',
    btnSecondary: 'Surrogacy Pathway',
    btnSecondaryService: 'surrogacy',
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1600&h=800',
    statLabel: 'Donor Integrity',
    statValue: '100%',
    substat: 'Thorough NDPR-Vetted privacy'
  }
];

interface HomeProps {
  onNavigate: (page: PageId) => void;
  onNavigateToService: (serviceId: ServiceId) => void;
}

export default function Home({ onNavigate, onNavigateToService }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Dynamic web content edits configuration
  const [webConfig, setWebConfig] = useState({
    heroTagline: '#1 Ranked Fertility Clinic in Lagos, Nigeria',
    heroBtnText: 'Book Live Consultation',
    successRate: '72%',
    livingDeliveries: '1,200+',
    teamExperience: '35+ Yrs',
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('lagos_ivf_web_config');
        if (stored) {
          setWebConfig(JSON.parse(stored));
        } else {
          setWebConfig({
            heroTagline: '#1 Ranked Fertility Clinic in Lagos, Nigeria',
            heroBtnText: 'Book Live Consultation',
            successRate: '72%',
            livingDeliveries: '1,200+',
            teamExperience: '35+ Yrs',
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    handleUpdate();

    window.addEventListener('lagos_ivf_web_config_updated', handleUpdate);
    return () => {
      window.removeEventListener('lagos_ivf_web_config_updated', handleUpdate);
    };
  }, []);

  const dynamicHeroSlides = [
    {
      ...HERO_SLIDES[0],
      tagline: webConfig.heroTagline,
      btnPrimary: webConfig.heroBtnText,
      statValue: webConfig.successRate,
    },
    HERO_SLIDES[1],
    HERO_SLIDES[2]
  ];

  const dynamicClinicStats = CLINIC_STATS.map((stat, i) => {
    if (i === 0) return { ...stat, value: webConfig.successRate };
    if (i === 1) return { ...stat, value: webConfig.livingDeliveries };
    if (i === 2) return { ...stat, value: webConfig.teamExperience };
    return stat;
  });

  const slideCount = dynamicHeroSlides.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  useEffect(() => {
    if (!isHovered) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered, currentSlide]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-20 animate-fade-in pb-16">
      
      {/* 1. wide Parallax Slider Hero Section */}
      <section 
        className="relative w-full h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden bg-navy-950" 
        id="hero-section"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? '10%' : '-10%',
                opacity: 0,
                scale: 1.08
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1.05,
                transition: {
                  x: { type: 'spring', stiffness: 120, damping: 20 },
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 }
                }
              },
              exit: (dir: number) => ({
                x: dir < 0 ? '10%' : '-10%',
                opacity: 0,
                scale: 1.08,
                transition: {
                  x: { type: 'spring', stiffness: 120, damping: 20 },
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Parallax Image Content */}
            <motion.div 
              animate={{
                x: mousePos.x * -45,
                y: mousePos.y * -45,
              }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
              className="absolute inset-0 w-[114%] h-[114%] -left-[7%] -top-[7%]"
            >
              <img
                src={dynamicHeroSlides[currentSlide].image}
                alt={dynamicHeroSlides[currentSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient Mask Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/35"></div>
          </motion.div>
        </AnimatePresence>

        {/* Foreground Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-20 text-left">
          <div className="max-w-3xl space-y-6 md:space-y-8 pr-4">
            
            {/* Tagline */}
             <motion.div
              key={`tagline-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 border border-orange-500/30 px-4 py-1.5 text-[11px] sm:text-xs font-bold text-orange-400 select-none backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
              <span>{dynamicHeroSlides[currentSlide].tagline}</span>
            </motion.div>

            {/* Main Title Section */}
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase font-sans"
            >
              {dynamicHeroSlides[currentSlide].title.split(" & ").map((part, idx, arr) => (
                <span key={idx} className="block">
                  {part} {idx < arr.length - 1 && <span className="text-orange-600 font-extrabold">&amp;</span>}
                </span>
              ))}
            </motion.h1>

            {/* Paragraph Text */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs sm:text-sm md:text-base text-navy-200 leading-relaxed max-w-2xl font-medium"
            >
              {dynamicHeroSlides[currentSlide].description}
            </motion.p>

            {/* Actions Box */}
            <motion.div
              key={`actions-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => {
                  const slide = dynamicHeroSlides[currentSlide];
                  onNavigate(slide.btnPrimaryPage as PageId);
                }}
                className="flex items-center justify-center gap-2 bg-orange-600 border border-orange-600 hover:bg-orange-500 hover:border-orange-550 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-orange-950/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer select-none"
              >
                <Calendar className="h-4 w-4" />
                {dynamicHeroSlides[currentSlide].btnPrimary}
              </button>

              {dynamicHeroSlides[currentSlide].btnSecondaryService ? (
                <button
                  onClick={() => {
                     const slide = dynamicHeroSlides[currentSlide];
                    onNavigateToService(slide.btnSecondaryService as ServiceId);
                  }}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer select-none backdrop-blur-sm"
                >
                  {dynamicHeroSlides[currentSlide].btnSecondary}
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                </button>
              ) : (
                <button
                  onClick={() => {
                     const slide = dynamicHeroSlides[currentSlide];
                    onNavigate(slide.btnSecondaryPage as PageId);
                  }}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer select-none backdrop-blur-sm"
                >
                  {dynamicHeroSlides[currentSlide].btnSecondary}
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                </button>
              )}
            </motion.div>

            {/* Embedded Micro stats */}
            <motion.div
              key={`ribbon-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-4 max-w-xl"
            >
              <div className="flex gap-3 items-center">
                <div className="h-8 w-8 rounded-full bg-orange-600/20 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs select-none">
                  {dynamicHeroSlides[currentSlide].statValue}
                </div>
                <div>
                  <span className="block text-[11px] font-black text-white uppercase tracking-wider">{dynamicHeroSlides[currentSlide].statLabel}</span>
                  <span className="block text-[10px] text-navy-300/80 font-semibold">{dynamicHeroSlides[currentSlide].substat}</span>
                </div>
              </div>

              <div className="flex gap-3 items-center border-l border-white/10 pl-6">
                <div className="h-8 w-8 rounded-full bg-orange-600/20 border border-orange-500/20 flex items-center justify-center text-orange-400 select-none">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-black text-white uppercase tracking-wider">State HEFAMAA Accredited</span>
                  <span className="block text-[10px] text-navy-300/80 font-semibold">Victoria Island Standard</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Swipe Control Buttons */}
        <div className="absolute inset-y-0 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={handlePrev}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-navy-950/40 hover:bg-orange-600 border border-white/10 hover:border-orange-500 text-white flex items-center justify-center pointer-events-auto transition-all cursor-pointer group"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-navy-950/40 hover:bg-orange-600 border border-white/10 hover:border-orange-500 text-white flex items-center justify-center pointer-events-auto transition-all cursor-pointer group"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Index dash progress selectors */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3 select-none">
          {dynamicHeroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="p-1 cursor-pointer group focus:outline-none"
              aria-label={`Jump directly to slide ${index + 1}`}
            >
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                  index === currentSlide 
                    ? 'w-10 bg-orange-600' 
                    : 'w-3 bg-white/30 group-hover:bg-white/60'
                }`}
              >
                {/* Visual linear fill-timer when active & not manually hovered */}
                {index === currentSlide && !isHovered && (
                  <motion.div 
                    initial={{ left: '-100%' }}
                    animate={{ left: '0%' }}
                    transition={{ duration: 7, ease: 'linear' }}
                    className="absolute inset-y-0 left-0 bg-white w-full"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Success Numbers Dashboard (Lots of white space & Professional Outlook) */}
      <section className="bg-orange-50/45 py-12 border-y border-orange-100/50" id="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">Scientific Metrics</span>
            <h2 className="text-3xl font-black text-navy-950 tracking-tight">Our Achievements & Proven Outcomes</h2>
            <p className="text-xs text-navy-700">
              We stand apart through validated laboratory excellence, ethical standards, and a deep commitment to West African genetics research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dynamicClinicStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-navy-150/50 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                <span className="text-3xl font-black text-navy-900 block tracking-tight">{stat.value}</span>
                <span className="text-xs font-bold text-orange-600 block uppercase tracking-wider">{stat.label}</span>
                <span className="text-[10px] text-navy-500 block leading-tight">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Specialties Segment (Orange & Navy Blue Branding) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="specialties-section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 font-sans">Advanced Clinical Pathways</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">Exclusive Reproductive Options We Provide</h2>
            <p className="text-sm text-navy-700 leading-relaxed">
              Every couple receives a custom diagnostic plan. Guided by skilled embryologists, we manage high-complexity cases with utmost diligence and care.
            </p>
          </div>
          <div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 border-b-2 border-orange-600 pb-1 hover:text-orange-700 hover:border-orange-700 transition-colors cursor-pointer"
            >
              Learn More about technologies
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic 5-column grid mapping our requested IVF sub-pages exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-navy-100 rounded-3xl p-8 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
            >
              <div className="space-y-4">
                {/* Medical Accent Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-900 border-b border-navy-150 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Activity className="h-5 w-5" />
                </div>
                
                <h3 className="text-lg font-bold text-navy-950 group-hover:text-orange-600 transition-colors">
                  {service.title.split(' (')[0]}
                </h3>
                
                <p className="text-xs text-navy-700 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-navy-400">Success Factor</span>
                  <span className="block text-xs font-semibold text-navy-800">{service.successRate}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-navy-50 mt-6">
                <button
                  onClick={() => onNavigateToService(service.id)}
                  className="w-full py-2.5 rounded-xl bg-navy-50 hover:bg-orange-100/50 text-navy-900 hover:text-orange-950 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  View Details & Process
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. IVF Process Timeline (Educational Roadmap) */}
      <section className="bg-navy-900 text-white py-16 text-left" id="timeline-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">Step-by-Step Pathway</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Journey to Your Miracle</h2>
            <p className="text-sm text-navy-300">
              Understanding clinical timelines reduces anxieties. Here is the structured biological cycle overview we walk through with you.
            </p>
          </div>

          <div className="relative border-l-2 border-orange-500/30 ml-4 md:ml-0 md:grid md:grid-cols-5 md:border-l-0 md:border-t-2 md:pt-8 md:gap-6 space-y-8 md:space-y-0">
            {[
              { num: '01', title: 'Consultation', sub: 'Comprehensive fertility assays, pelvic ultrasound & lifestyle evaluations in Lagos.' },
              { num: '02', title: 'Stimulation', sub: 'Gentle customized follicular hormone monitoring to mature elite oocytes.' },
              { num: '03', title: 'Retrieval & ICSI', desc: 'Direct fertilization of single chosen sperm in our class-100 cleanroom lab.' },
              { num: '04', title: 'Genetics Screen', sub: 'PGT-A chromosomal testing verifying sex selection & general embryo health.' },
              { num: '05', title: 'Safe Transfer', sub: 'Calculated, ultrasound-guided blastocyst implantation for maximum security.' }
            ].map((step, index) => (
              <div key={index} className="relative md:text-center pl-8 md:pl-0">
                {/* Badge Dot */}
                <div className="absolute top-0 -left-1 md:-top-12 md:left-1/2 md:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white ring-4 ring-navy-900">
                  {step.num}
                </div>
                <h3 className="font-extrabold text-base text-white pt-1">{step.title}</h3>
                <p className="text-xs text-navy-300 leading-relaxed mt-2">{step.sub || step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-navy-950 p-6 rounded-2xl border border-navy-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="text-sm font-extrabold text-orange-400">Ready to consult with our medical board?</span>
              <p className="text-xs text-navy-300">Schedule your primary review session with our Senior Reproductive Endocrinologist.</p>
            </div>
            <button
              onClick={() => onNavigate('book')}
              className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Book Consultation Session
            </button>
          </div>
        </div>
      </section>

      {/* 5. Heartwarming Patient Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="reviews-section">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">Lived Experiences</span>
          <h2 className="text-3xl font-black text-navy-950 tracking-tight">Testimonials of Restored Hope</h2>
          <p className="text-xs text-navy-700">
            Nothing describes our clinical efficacy better than the joy of families whose waiting came to a healthy end.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white border border-navy-150 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1.5 text-orange-600">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-600" />
                  ))}
                </div>
                <p className="text-xs text-navy-850 italic leading-relaxed">
                  "{review.content}"
                </p>
              </div>
              <div className="pt-6 border-t border-navy-50 mt-6 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-sm text-navy-950">{review.name}</span>
                  <span className="block text-[10px] text-orange-600 font-extrabold uppercase tracking-wide">{review.role}</span>
                </div>
                <span className="h-8 w-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-400 text-xs font-bold">NG</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Professional SEO Bottom Editorial Content */}
      <section className="bg-navy-50/50 py-16 border-t border-navy-100 text-left" id="bottom-editorial-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Long SEO Copy */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wide text-navy-950">
                Pioneering Fertility Treatment & IVF Technology in Nigeria
              </h2>
              <p className="text-xs text-navy-700 leading-relaxed">
                As the demand for fertility solutions grow inside West Africa, Lagos IVF Specialist Clinic continues to set local clinical benchmarks. We believe that professional fertility care requires exceptional science. That’s why we invest heavily in certified class-100 cleanroom filtration systems for our embryology workspace to prevent microscopic heavy metals or environmental pollutants in metropolitan Lagos from reducing embryo cleavage success.
              </p>
              <p className="text-xs text-navy-700 leading-relaxed">
                From micro-surgical sperm selection (ICSI) overcoming severe oligospermia to gestational surrogacy support governed by watertight legal frameworks, we match advanced clinical medicine with cultural understanding. Let our NMCN certified fertility board guide you on a compassionate, clear pathway toward starting your healthy family.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="flex gap-2 items-start">
                  <ShieldCheck className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-navy-900">Total Data Privacy</span>
                    <p className="text-[10px] text-navy-600 leading-tight">Patient details and records are protected by clinical confidentiality laws.</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <UserCheck className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-navy-900">Accredited Pioneers</span>
                    <p className="text-[10px] text-navy-600 leading-tight">Under absolute review of HEFAMAA (Health Facility Monitoring & Accreditation Agency).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick General FAQs */}
            <div className="lg:col-span-5 space-y-4 bg-white p-8 rounded-3xl border border-navy-150">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-orange-600" />
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-navy-950">General Clinical FAQs</h3>
              </div>
              
              <div className="space-y-4">
                {FAQS_GENERAL.map((faq, index) => (
                  <div key={index} className="space-y-1 text-xs">
                    <p className="font-bold text-navy-950 border-l-2 border-orange-500 pl-2">
                      {faq.question}
                    </p>
                    <p className="text-navy-700 leading-relaxed pl-2 bg-navy-50/40 p-2 rounded-r-lg">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
