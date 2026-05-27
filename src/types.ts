/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'about' | 'services' | 'contact' | 'book';

export type ServiceId = 
  | 'sex-selection' 
  | 'sperm-donation' 
  | 'surrogacy' 
  | 'egg-donation' 
  | 'sperm-injection';

export interface ServiceDetail {
  id: ServiceId;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  metaDescription: string;
  keywords: string[];
  indications: string[];
  processSteps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  successRate: string;
  iconName: string;
  images: string[];
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: ServiceId | 'general-consultation';
  date: string;
  timeSlot: string;
  specialist: string;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}
