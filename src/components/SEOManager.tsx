/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { PageId, ServiceDetail } from '../types';

interface SEOManagerProps {
  pageId: PageId;
  currentService?: ServiceDetail | null;
}

export default function SEOManager({ pageId, currentService }: SEOManagerProps) {
  useEffect(() => {
    // 1. Resolve Titles and Descriptions based on active page
    let title = 'Lagos IVF Specialist Clinic | Leading Fertility Center in Nigeria';
    let description = 'Lagos IVF Specialist Clinic is Nigeria’s state-of-the-art fertility center located in Victoria Island, Lagos. Offering world-class IVF, ICSI, surrogacy, egg/sperm donation, and sex selection with exceptional success rates and transparent pricing.';
    let keywords = ['fertility clinic Lagos', 'IVF Lagos', 'Lagos IVF Clinic', 'ICSI treatment Lagos', 'surrogacy Nigeria', 'egg donation Lagos', 'sex selection Nigeria', 'best fertility specialist Lagos'];
    let canonical = 'https://lagosivfspecialists.com';
    let schemaType = 'MedicalClinic';

    const baseUrl = 'https://lagosivfspecialists.com';

    if (pageId === 'about') {
      title = 'Our Pioneers & Success Rates | Lagos IVF Specialist Clinic';
      description = 'Meet the leading specialists, embryologists, and consultants at Lagos IVF Clinic. Learn about our state-of-the-art cleanroom labs, our ethical mission, and our verified clinical success rates.';
      keywords = [...keywords, 'about ivf clinic lagos', 'fertility specialists lagos', 'ivf success rate nigeria', 'best embryologists lagos'];
      canonical = `${baseUrl}/about-us`;
    } else if (pageId === 'services') {
      if (currentService) {
        title = `${currentService.title} in Lagos | Lagos IVF Clinic`;
        description = currentService.metaDescription;
        keywords = currentService.keywords;
        canonical = `${baseUrl}/services/${currentService.id}`;
        schemaType = 'MedicalProcedure';
      } else {
        title = 'Our Advanced Fertility & IVF Services | Lagos IVF Specialist Clinic';
        description = 'Explore our advanced reproductive technology services in Lagos: Sex Selection (PGT-A), Sperm Injection (ICSI), Gestational Surrogacy, and Egg or Sperm Donors.';
        keywords = [...keywords, 'fertility services lagos', 'egg donor program nigeria', 'sperm bank lagos', 'surrogacy treatment lagos', 'icsi lagos'];
        canonical = `${baseUrl}/services`;
      }
    } else if (pageId === 'contact') {
      title = 'Contact & Direct Location Map | Lagos IVF Specialist Clinic';
      description = 'Contact Lagos IVF Specialist Clinic today. Located at 12B Landmark Avenue, Victoria Island, Lagos. Call or visit us. Free parking and confidential appointments available.';
      keywords = [...keywords, 'contact lagos ivf', 'fertility clinic location lagos', 'victoria island ivf clinic', 'fertility clinic phone nigeria'];
      canonical = `${baseUrl}/contact-us`;
    } else if (pageId === 'book') {
      title = 'Book a Personalized Fertility Consultation | Lagos IVF Clinic';
      description = 'Schedule a secure, confidential fertility consultation. Use our live interactive calendar to pick your preferred date, time-slot, and specialist in Lagos.';
      keywords = [...keywords, 'book ivf consultation lagos', 'fertility doctor appointment nigeria', 'schedule semen analysis lagos'];
      canonical = `${baseUrl}/book-appointment`;
    } else if (pageId === 'blog') {
      title = 'Lagos Fertility & IVF Knowledge Guide | Lagos IVF Specialist Clinic';
      description = 'Sovereign medical insights, embryo development guidelines, and clinical procedures authored directly by the elite embryology coordinators of Lagos IVF Specialist Clinic.';
      keywords = [...keywords, 'fertility news lagos', 'ivf blog nigeria', 'surrogacy guide lagos', 'reproductory medicine journals'];
      canonical = `${baseUrl}/blog`;
    } else if (pageId === 'admin') {
      title = 'Clinical Content Studio Management | Lagos IVF Specialist Clinic';
      description = 'Secure, authenticated coordinator interface to modify website text and manage medical blog education articles.';
      keywords = [...keywords];
      canonical = `${baseUrl}/admin`;
    }

    // 2. Apply to HTML Document
    document.title = title;

    // Update Meta Description
    let metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (!metaDescriptionEl) {
      metaDescriptionEl = document.createElement('meta');
      metaDescriptionEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionEl);
    }
    metaDescriptionEl.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywordsEl = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsEl) {
      metaKeywordsEl = document.createElement('meta');
      metaKeywordsEl.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywordsEl);
    }
    metaKeywordsEl.setAttribute('content', keywords.join(', '));

    // Update Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    // 3. Inject Structured Data Schema (JSON-LD)
    const existingSchemaScript = document.getElementById('ivf-clinic-seo-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'ivf-clinic-seo-schema';

    let schemaData: any = {};

    if (schemaType === 'MedicalProcedure' && currentService) {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        'name': currentService.title,
        'procedureSteps': currentService.processSteps.map(step => step.title).join(', '),
        'description': currentService.shortDescription,
        'outcome': currentService.successRate,
        'relevantSpecialty': {
          '@type': 'MedicalSpecialty',
          'name': 'ReproductiveEndocrinology'
        },
        'author': {
          '@type': 'MedicalOrganization',
          'name': 'Lagos IVF Specialist Clinic',
          'url': 'https://lagosivfspecialists.com'
        }
      };
    } else {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        '@id': 'https://lagosivfspecialists.com/#clinic',
        'name': 'Lagos IVF Specialist Clinic',
        'description': 'Lagos IVF Specialist Clinic is the leading state-of-the-art fertility center in Lagos, Nigeria, specializing in IVF, ICSI, sex selection, gestational surrogacy, egg donation, and sperm donation.',
        'url': 'https://lagosivfspecialists.com',
        'telephone': '+234-803-900-3000',
        'priceRange': '₦₦₦',
        'image': 'https://picsum.photos/seed/lagosivf/800/600',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '12B Landmark Avenue, Off Admiralty Way, Victoria Island',
          'addressLocality': 'Lagos',
          'addressRegion': 'Lagos State',
          'addressCountry': 'Nigeria'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '6.4281',
          'longitude': '3.4219'
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens': '08:00',
            'closes': '17:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': 'Saturday',
            'opens': '09:00',
            'closes': '14:00'
          }
        ],
        'medicalSpecialty': 'ReproductiveEndocrinology',
        'availableService': SERVICES_DATA_MINIMAL_MAPPED
      };
    }

    schemaScript.text = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(schemaScript);

    return () => {
      // Clean up the schema tag when page changes/unmounts
      const cleanScript = document.getElementById('ivf-clinic-seo-schema');
      if (cleanScript) {
        cleanScript.remove();
      }
    };
  }, [pageId, currentService]);

  return null; // Side-effect only component
}

const SERVICES_DATA_MINIMAL_MAPPED = [
  { '@type': 'MedicalTherapy', 'name': 'Sex Selection Family Balancing' },
  { '@type': 'MedicalTherapy', 'name': 'Confidential Sperm Donation' },
  { '@type': 'MedicalTherapy', 'name': 'Gestational Surrogacy' },
  { '@type': 'MedicalTherapy', 'name': 'Elite Egg Donation' },
  { '@type': 'MedicalTherapy', 'name': 'Intracytoplasmic Sperm Injection' }
];
