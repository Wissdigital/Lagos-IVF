/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, Heart, HelpCircle, Activity, Sparkles, UserCheck, Flame } from 'lucide-react';
// @ts-ignore
import labMicroscopeAsset from '../assets/images/embryology_lab_microscope_1779794280073.png';

export default function About() {
  const leadership = [
    {
      name: 'Dr. (Mrs.) Adebisi Adeleke-Ndiolo',
      role: 'Founder & Lead Reproductive Endocrinologist',
      bio: 'Over 20 years of experience in fertility medicine. Trained at the University College Hospital, Ibadan and Fellowship in Germany. Focused on high-success-rate customized stimulation protocols.',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Dr. Joseph Chukwuma (PhD)',
      role: 'Chief Embryologist & Lab Director',
      bio: 'Distinguished Clinical Embryologist specialized in ICSI micromanipulation and vitrification techniques. Pioneered advanced blastocyst biopsies for PGT-A screening in Nigeria.',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Nurse Funmi Adekunle',
      role: 'Head of Patient Care & Surrogacy Coordinator',
      bio: 'An expert fertility nurse and dedicated case manager. Guides our surrogates and prospective package parents with seamless operational and emotional coordination throughout the cycle.',
      img: 'https://images.unsplash.com/photo-1579684389781-75a7436ddf13?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  const coreValues = [
    {
      title: 'Ethical Science First',
      desc: 'We follow universal standards of clinical embryology with valid legal binding contracts for surrogacy and fully transparent screening protocols.'
    },
    {
      title: 'State-of-the-Art Cleanroom',
      desc: 'Our embryology lab is fitted with specialized gas-phase HEPA air filtration to eliminate volatile organic compounds (VOCs) that reduce embryo survivability.'
    },
    {
      title: 'Total Confidentiality',
      desc: 'We guarantee privacy of donor profiles, medical registries, and surrogacy milestones under strict HIPAA-like electronic record systems.'
    },
    {
      title: 'No Hidden Costs',
      desc: 'Lagos patients receive detailed, fixed price-sheets during their initial clinical diagnostic consultation with zero downstream surprises.'
    }
  ];

  const benchmarks = [
    { range: 'Under 35 years', rate: '72%', explanation: 'Excellent egg quality, typically leading to robust blastocyst progression.' },
    { range: '35 - 37 years', rate: '64%', explanation: 'Highly responsive to custom stimulation protocols. ICSI recommended for optimal fertilizations.' },
    { range: '38 - 40 years', rate: '48%', explanation: 'Often paired with PGT-A preimplantation testing to screen for viable blastocysts.' },
    { range: '41+ (With Donor Eggs)', rate: '76%', explanation: 'Utilizes exceptional eggs from young donors under 25 years, bypassing age limitations.' }
  ];

  return (
    <div className="space-y-20 animate-fade-in pb-16 text-left">
      
      {/* 1. Header Segment (Brand alignment) */}
      <section className="bg-navy-950 text-white min-h-[250px] flex items-center pt-12 pb-16 relative overflow-hidden" id="about-intro">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-950 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-950 border border-orange-800 px-3 py-1 text-xs font-bold text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering Miracles Since 2012
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Meet the Pioneers Behind Lagos's Premier IVF Science
          </h1>
          <p className="text-sm sm:text-base text-navy-250 max-w-2xl leading-relaxed">
            We are a group of dedicated reproductive experts, state-of-the-art embryologists, and supportive coordinators united under a single mission: to provide world-class clinical results under rigorous ethical conditions right here in Nigeria.
          </p>
        </div>
      </section>

      {/* 2. Laboratory Excellence (The Unmatched Advantage) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="laboratory-excellence">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block">Uncompromising Cleanroom Standards</span>
            <h2 className="text-3xl font-black text-navy-950 tracking-tight leading-tight">Our Class-100 Embryology Cleanroom Lab</h2>
            <p className="text-xs text-navy-700 leading-relaxed">
              Did you know that city air can contain microscopic particles that are toxic to tiny human cells? Lagos’s environmental dust can jeopardize embryo growth.
            </p>
            <p className="text-xs text-navy-700 leading-relaxed">
              We resolved this challenge from day one. Lagos IVF Specialist Clinic houses a clinical environment isolated by negative-pressure, double-walled ventilation and deep-bed chemical HEPA filtration. Our incubators feature precise gas-mixers mimicking natural fallopian tubal environments (low oxygen 5%) to foster exceptional embryo quality.
            </p>

            <div className="border border-orange-100 bg-orange-50/50 p-4 rounded-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white flex-shrink-0">
                <Flame className="h-5 w-5" />
              </div>
              <p className="text-xs text-orange-900 font-medium">
                This custom laboratory framework increases the embryo-to-blastocyst progression rate by nearly 15% compared to baseline settings.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 mt-8 lg:mt-0 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-orange-400 to-navy-950 opacity-10 blur-lg"></div>
              <div className="relative rounded-3xl overflow-hidden border border-navy-100 shadow-xl aspect-video bg-navy-900">
                <img
                  src={labMicroscopeAsset}
                  alt="State-of-the-art clean room embryology clinical laboratory in Lagos"
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Clinical Success Rate Cohorts (SEO transparency) */}
      <section className="bg-navy-50/40 border-y border-navy-100 py-16" id="about-cohorts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 font-sans">Verified Stats</span>
            <h2 className="text-3xl font-black text-navy-950 tracking-tight">Our Verified Success Rates by Age Cohort</h2>
            <p className="text-xs text-navy-700 leading-relaxed">
              We practice full clinical disclosure. Success rates depend significantly on the age of the egg source. Here is how our specialists scale outcomes in Lagos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benchmarks.map((b, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-navy-152 shadow-sm space-y-4 hover:border-orange-200 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-extrabold text-navy-500 uppercase tracking-widest">{b.range}</span>
                  <span className="text-2xl font-black text-orange-600">{b.rate}</span>
                </div>
                <div className="h-1.5 w-full bg-navy-50 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: b.rate }}></div>
                </div>
                <p className="text-[10px] text-navy-700 leading-relaxed">{b.explanation}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-navy-600 leading-relaxed text-center mt-6 max-w-2xl mx-auto">
            *Verified outcomes reflect clinical intrauterine pregnancy confirmations on ultrasound (detectable fetal heartbeat at 7-8 gestational weeks). Success baseline rates are tracked under HEFAMAA clinical reporting regulations.
          </p>
        </div>
      </section>

      {/* 4. Specialist Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-doctors">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block">The Medical Committee</span>
          <h2 className="text-3xl font-black text-navy-950 tracking-tight">Your Specialist Advisors & Embryologists</h2>
          <p className="text-xs text-navy-700 leading-relaxed">
            Our medical staff includes clinical experts with extensive global validation, ensuring your diagnostic decisions are scientifically solid and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((doctor, index) => (
            <div key={index} className="bg-white border border-navy-100 rounded-3xl p-6 space-y-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="h-44 w-44 rounded-full overflow-hidden border-2 border-navy-50 shadow-md">
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="object-cover h-full w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-navy-950 text-base">{doctor.name}</h3>
                <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">{doctor.role}</span>
              </div>
              <p className="text-xs text-navy-700 leading-relaxed max-w-xs">{doctor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Clinical Vibe / Core Values Checklist */}
      <section className="bg-orange-50/15 border-t border-orange-100 py-16 text-center" id="about-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block font-sans">Why We Differ</span>
            <h2 className="text-3xl font-black text-navy-950 leading-tight">Our Core Clinical Ethics Code</h2>
            <p className="text-xs text-navy-700">Four cornerstones that govern everything we execute for Lagos parents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {coreValues.map((val, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-navy-150/50 space-y-2 shadow-sm">
                <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                  0{index + 1}
                </div>
                <h4 className="font-bold text-sm text-navy-950 pt-2">{val.title}</h4>
                <p className="text-xs text-navy-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
