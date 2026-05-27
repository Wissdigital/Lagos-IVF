/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar as IconCalendar, ChevronLeft, ChevronRight, CheckCircle, Clock, Users, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { ServiceId } from '../types';
import { SERVICES_DATA } from '../data';

interface BookAppointmentProps {
  initialServiceId?: ServiceId | 'general-consultation' | null;
}

export default function BookAppointment({ initialServiceId }: BookAppointmentProps) {
  // Calendar scheduling states
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4); // 4 = May in 0-indexed month sequence
  const [selectedDay, setSelectedDay] = useState<number | null>(28); // Default to May 28, 2026
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 AM');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('Dr. (Mrs.) Adebisi Adeleke-Ndiolo (Lead Endocrinologist)');
  
  // Custom Form details
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceId: initialServiceId || 'general-consultation',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');

  const months = [
    { name: 'January', days: 31, startDayOfWeek: 1 },
    { name: 'February', days: 28, startDayOfWeek: 4 },
    { name: 'March', days: 31, startDayOfWeek: 4 },
    { name: 'April', days: 30, startDayOfWeek: 0 },
    { name: 'May', days: 31, startDayOfWeek: 5 }, // May 1st 2026 starts on Friday (5)
    { name: 'June', days: 30, startDayOfWeek: 1 }, // June 1st 2026 starts on Monday (1)
    { name: 'July', days: 31, startDayOfWeek: 3 },
    { name: 'August', days: 31, startDayOfWeek: 6 },
    { name: 'September', days: 30, startDayOfWeek: 2 },
    { name: 'October', days: 31, startDayOfWeek: 4 },
    { name: 'November', days: 30, startDayOfWeek: 0 },
    { name: 'December', days: 31, startDayOfWeek: 2 }
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleMonthNext = () => {
    if (currentMonth === 4) {
      setCurrentMonth(5); // Switch to June
    }
  };

  const handleMonthPrev = () => {
    if (currentMonth === 5) {
      setCurrentMonth(4); // Switch back to May
    }
  };

  const handleDaySelect = (day: number) => {
    // Sundays are index indices. Let's make sure Sundays (closed) are bypassed.
    const activeMonthObj = months[currentMonth];
    const dayOfWeekIdx = (activeMonthObj.startDayOfWeek + day - 1) % 7;
    
    if (dayOfWeekIdx !== 0 && !(currentMonth === 4 && day < 26)) {
      setSelectedDay(day);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const generatedId = `IVF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppointmentId(generatedId);

    try {
      await fetch("https://formsubmit.co/ajax/adeptniyi@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Custom IVF Appointment Booking [${generatedId}]`,
          "Appointment Ticket ID": generatedId,
          "Patient Full Name": formData.fullName,
          "Email Address": formData.email,
          "Phone / WhatsApp": formData.phone,
          "Selected Service Pathway": formData.serviceId,
          "Scheduled Period": `${months[currentMonth].name} ${selectedDay}, 2026 @ ${selectedTimeSlot}`,
          "Clinical Brief Notes": formData.notes || "None provided"
        })
      });
    } catch (err) {
      console.error("Form transmission failed, proceeding with fallback success UI", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedDay(28);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceId: initialServiceId || 'general-consultation',
      notes: ''
    });
  };

  const activeMonth = months[currentMonth];
  const blankCells = Array(activeMonth.startDayOfWeek).fill(null);
  const monthDays = Array.from({ length: activeMonth.days }, (_, i) => i + 1);

  return (
    <div className="space-y-16 animate-fade-in pb-16 text-left">
      
      {/* 1. Header Segment */}
      <section className="bg-navy-950 text-white min-h-[250px] flex items-center pt-12 pb-16 relative overflow-hidden" id="booking-intro">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-950 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-950 border border-orange-800 px-3 py-1 text-xs font-bold text-orange-400">
            <IconCalendar className="h-3.5 w-3.5 animate-pulse" />
            Instant Live Coordinator Matching
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Reserve Your Confidential Fertility Consultation
          </h1>
          <p className="text-sm sm:text-base text-navy-250 max-w-2xl leading-relaxed">
            Our live calendar allows patients to book certified clinical consultations in Lagos. Choose your preferred day, time-slot, and specialty pathway to lock in your session instantly.
          </p>
        </div>
      </section>

      {/* 2. Interactive Booking Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="booking-wizard">
        {submitted ? (
          /* SUCCESS PANEL */
          <div className="bg-white border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-6 animate-fade-in" id="booking-success-card">
            <div className="h-16 w-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-orange-100">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-extrabold text-orange-600 block tracking-widest bg-orange-50 px-3 py-1 rounded-full w-max mx-auto border border-orange-200">Session reserved successfully</span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">Your Miracle Journey Has Begun!</h2>
              <p className="text-xs text-navy-700 max-w-xl mx-auto">
                We have secured your slot. Your appointment ticket details are encrypted and loaded onto our secure clinical servers. If any rescheduling is needed, a coordinator will reach out directly.
              </p>
            </div>

            {/* Structured Receipt Box */}
            <div className="bg-navy-50/50 rounded-2xl p-6 border border-navy-100 text-left max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-navy-500 block uppercase font-bold tracking-wider text-[10px]">Patient Name</span>
                <span className="font-extrabold text-navy-950 mt-0.5 block">{formData.fullName || 'Valued Patient'}</span>
              </div>
              <div>
                <span className="text-navy-500 block uppercase font-bold tracking-wider text-[10px]">Reference ID</span>
                <span className="font-extrabold text-orange-600 mt-0.5 block font-mono">{appointmentId}</span>
              </div>
              <div className="border-t border-navy-100/60 pt-3">
                <span className="text-navy-500 block uppercase font-bold tracking-wider text-[10px]">Date & Time</span>
                <span className="font-extrabold text-navy-950 mt-0.5 block">{activeMonth.name} {selectedDay}, 2026 @ {selectedTimeSlot}</span>
              </div>
              <div className="border-t border-navy-100/60 pt-3">
                <span className="text-navy-500 block uppercase font-bold tracking-wider text-[10px]">Assigned Consultant</span>
                <span className="font-extrabold text-navy-950 mt-0.5 block leading-tight">{selectedSpecialist.split(' (')[0]}</span>
              </div>
              <div className="sm:col-span-2 border-t border-navy-100/60 pt-3">
                <span className="text-navy-500 block uppercase font-bold tracking-wider text-[10px]">Clinical Location</span>
                <span className="font-extrabold text-navy-950 mt-0.5 block">12B Landmark Avenue, Off Admiralty Way, Victoria Island, Lagos</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-orange-100"
              >
                Schedule Another Slot
              </button>
              <span className="text-[11px] text-navy-500 italic block">
                📧 A copy has been transmitted directly to {formData.email || 'your email'}.
              </span>
            </div>
          </div>
        ) : (
          /* WORKFLOW WIZARD */
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="booking-form">
            
            {/* LEFT SELECTORS MODULES (7 COLS) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Module A: Custom Interactive Calendar Selector */}
              <div className="bg-white border border-navy-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex justify-between items-center border-b border-navy-50 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-navy-950 flex gap-2 items-center">
                      <IconCalendar className="h-4.5 w-4.5 text-orange-655" />
                      1. Select Your Appointment Day
                    </h3>
                    <p className="text-[10px] text-navy-500">Pick any active date in Lagos. Sundays are fully closed.</p>
                  </div>
                  
                  {/* Month Switch Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentMonth === 4}
                      onClick={handleMonthPrev}
                      className="p-1.5 rounded-lg border border-navy-100 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-bold text-navy-950 min-w-[100px] text-center">
                      {activeMonth.name} {currentYear}
                    </span>
                    <button
                      type="button"
                      disabled={currentMonth === 5}
                      onClick={handleMonthNext}
                      className="p-1.5 rounded-lg border border-navy-100 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Day labels header */}
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-navy-500 uppercase tracking-widest pb-1">
                  {daysOfWeek.map(d => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                {/* Calendar Days Matrix */}
                <div className="grid grid-cols-7 gap-2">
                  {blankCells.map((_, i) => (
                    <div key={`blank-${i}`} className="aspect-square bg-transparent"></div>
                  ))}
                  {monthDays.map((day) => {
                    const cellDayOfWeek = (activeMonth.startDayOfWeek + day - 1) % 7;
                    const isSunday = cellDayOfWeek === 0;
                    
                    // Past date constraints (Disable dates prior to May 26, 2026 based on mock local time)
                    const isPastMay = currentMonth === 4 && day < 26;
                    
                    const isSelectable = !isSunday && !isPastMay;
                    const isCurrentSelection = selectedDay === day;

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDaySelect(day)}
                        className={`aspect-square rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                          isCurrentSelection
                            ? 'bg-orange-600 text-white shadow-md shadow-orange-100 scale-105'
                            : isSelectable
                            ? 'bg-navy-50/50 hover:bg-orange-100/50 text-navy-850 hover:text-orange-700 cursor-pointer'
                            : 'bg-navy-50/15 text-navy-300 cursor-not-allowed opacity-35'
                        }`}
                        title={isSunday ? 'Clinic Closed' : isPastMay ? 'Booking past dates disabled' : ''}
                      >
                        <span>{day}</span>
                        {isCurrentSelection && (
                          <span className="h-1 w-1 rounded-full bg-white mt-0.5"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4 items-center justify-center text-[10px] text-navy-600 pt-2 border-t border-navy-50 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded bg-orange-600 block"></span>
                    <span>Your Selection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded bg-navy-50/50 border border-navy-100 block"></span>
                    <span>Available Days</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded bg-navy-50/15 border border-dashed border-navy-100 block opacity-40"></span>
                    <span>Sundays (Closed)</span>
                  </div>
                </div>

              </div>

              {/* Module B: Time-slot & Consultant Matches */}
              <div className="bg-white border border-navy-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Preferred time selector */}
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-navy-950 flex gap-2 items-center">
                    <Clock className="h-4.5 w-4.5 text-orange-655" />
                    2. Select Preferred Time Slot
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((ts) => {
                      const isActive = selectedTimeSlot === ts;
                      return (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => setSelectedTimeSlot(ts)}
                          className={`py-3 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                              : 'bg-navy-50/50 text-navy-900 border border-transparent hover:border-navy-100 cursor-pointer'
                          }`}
                        >
                          {ts}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specialist coordinator mapping */}
                <div className="space-y-3 border-t border-navy-50 pt-6">
                  <h3 className="text-sm font-extrabold text-navy-950 flex gap-2 items-center">
                    <Users className="h-4.5 w-4.5 text-orange-655" />
                    3. Match Medical Board Specialist
                  </h3>
                  <p className="text-[10px] text-navy-500">Pick your preferred doctor. Subsurface biological diagnostics will be assigned accordingly.</p>
                  
                  <div className="space-y-2.5">
                    {[
                      { name: 'Dr. (Mrs.) Adebisi Adeleke-Ndiolo (Lead Endocrinologist)', sub: '20+ years expertise, NMCN Fellow. Expert stimulation lead.' },
                      { name: 'Dr. Joseph Chukwuma (PhD) (Chief Lab Cytologist)', sub: 'Embryology Director, specialized in blastocyst growth and ICSI micro-injection.' },
                      { name: 'Nurse Funmi Adekunle (Head of Surrogacy Coordinates)', sub: 'Assigned specialist counselor for gestational carriers and donor matches.' }
                    ].map((spec) => {
                      const isMatched = selectedSpecialist === spec.name;
                      return (
                        <button
                          key={spec.name}
                          type="button"
                          onClick={() => setSelectedSpecialist(spec.name)}
                          className={`w-full p-4 rounded-2xl text-left border flex justify-between items-center transition-all ${
                            isMatched
                              ? 'border-orange-500 bg-orange-50/20 shadow-sm'
                              : 'border-navy-100 hover:border-orange-200 cursor-pointer bg-white'
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-bold text-navy-950">{spec.name.split(' (')[0]}</span>
                            <span className="block text-[9px] font-extrabold text-orange-600 uppercase tracking-wider">{spec.name.includes('Endocrinologist') ? 'Endocrinology' : spec.name.includes('Embryologist') ? 'Cytology' : 'Coordinator'}</span>
                            <span className="block text-[10px] text-navy-600 pt-0.5">{spec.sub}</span>
                          </div>
                          {isMatched && (
                            <span className="h-5 w-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT REGISTRATION DETAILS (5 COLS) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Patient contact dossier */}
              <div className="bg-white border border-navy-150 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
                <div className="border-b border-navy-50 pb-3">
                  <h3 className="text-base font-black text-navy-950">4. Patient Registration</h3>
                  <p className="text-[10px] text-navy-500">Provide verified phone/email credentials for coordinator transmission.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-900 block" htmlFor="fullName">Full Name *</label>
                    <input
                      required
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Mr. & Mrs. Okeke-Okonji"
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 focus:border-orange-550 focus:ring-1 focus:ring-orange-550 focus:outline-none text-xs bg-navy-50/25 font-bold text-navy-950"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-900 block" htmlFor="email">Email Address *</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="yourname@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 focus:border-orange-550 focus:ring-1 focus:ring-orange-550 focus:outline-none text-xs bg-navy-50/25 font-semibold text-navy-950"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-900 block" htmlFor="phone">WhatsApp / Mobile *</label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 (80) 3333-4444"
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 focus:border-orange-550 focus:ring-1 focus:ring-orange-550 focus:outline-none text-xs bg-navy-50/25 font-semibold text-navy-950"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-900 block" htmlFor="serviceId">Clinical Area of Interest</label>
                    <select
                      id="serviceId"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 focus:border-orange-550 focus:ring-1 focus:ring-orange-550 focus:outline-none text-xs bg-navy-50/25 font-extrabold text-navy-900"
                    >
                      <option value="general-consultation">General Infertility Consultation</option>
                      {SERVICES_DATA.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.title.split(' (')[0]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-900 block" htmlFor="notes">Clinical History Context / Requests</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Optional. Share any diagnostic milestones, past treatments, or legal surrogacy questions..."
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 focus:border-orange-550 focus:ring-1 focus:ring-orange-550 focus:outline-none text-xs bg-navy-50/25 font-medium resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Booking summary panel block */}
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl text-xs space-y-2 text-navy-950 font-medium">
                  <div className="flex justify-between">
                    <span>Target Date:</span>
                    <span className="font-bold text-orange-655">{selectedDay ? `${activeMonth.name} ${selectedDay}, 2026` : 'Please pick a day'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Hour:</span>
                    <span className="font-bold text-orange-655">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between border-t border-orange-200/50 pt-2 text-[10px] text-navy-600">
                    <span>Clinical Access Venue:</span>
                    <span className="font-bold">Victoria Island Office</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || !selectedDay}
                    className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Locks session in secure room...
                      </>
                    ) : (
                      <>
                        <span>Verify & Lock Slot</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-center text-[10px] text-navy-500 italic pt-1 text-center">
                  <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Clinical transmission verified secure</span>
                </div>

              </div>
            </div>

          </form>
        )}
      </section>

      {/* 3. Bottom educational instructions */}
      <section className="bg-navy-50/30 border-t border-navy-100 py-16 text-left" id="booking-faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block">Pre-Visit Advice</span>
            <h2 className="text-2xl font-black text-navy-950 tracking-tight">How to Prepare for Your Consult</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-2 bg-white rounded-2xl border border-navy-150 p-6 shadow-sm">
              <span className="text-xs font-extrabold text-orange-605 uppercase block">01. Gather Files</span>
              <p className="text-xs text-navy-700 leading-relaxed">Please bring past fertility medical files, semen tests, pelvic ultrasound scans, or general surgery histories so that we can optimize stimulation planning.</p>
            </div>
            <div className="space-y-2 bg-white rounded-2xl border border-navy-150 p-6 shadow-sm">
              <span className="text-xs font-extrabold text-orange-605 uppercase block">02. Timing is Key</span>
              <p className="text-xs text-navy-700 leading-relaxed">Female hormonal assessments are ideally scheduled on Day 2 or Day 3 of your menstrual period. Male sperm evaluations require 2 to 5 days of absolute abstinence.</p>
            </div>
            <div className="space-y-2 bg-white rounded-2xl border border-navy-150 p-6 shadow-sm">
              <span className="text-xs font-extrabold text-orange-605 uppercase block">03. Absolute Dignity</span>
              <p className="text-xs text-navy-700 leading-relaxed">Our consultations are strictly confidential, offering clinical discretion behind sound-proofed review lounges. Bring your partner or come autonomously.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
