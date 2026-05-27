/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, CheckCircle, Trash2, Edit, Plus, RefreshCw, 
  Download, FileText, Key, Calendar, Users, Settings, Tag, LogOut, ArrowRight, Save,
  Bold, Italic, Heading, List, ListOrdered, Quote, Link, Image, Eye, Sparkles, Check
} from 'lucide-react';
import { BlogPost, PageId } from '../types';

interface AdminProps {
  blogPosts: BlogPost[];
  onUpdateBlogPosts: (posts: BlogPost[]) => void;
  onResetToDefaults: () => void;
  onNavigate: (page: PageId) => void;
}

interface WebConfig {
  heroTagline: string;
  heroBtnText: string;
  successRate: string;
  livingDeliveries: string;
  teamExperience: string;
}

export default function Admin({ blogPosts, onUpdateBlogPosts, onResetToDefaults, onNavigate }: AdminProps) {
  // Rich Text Editor & Live Preview Tab Mode
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  // Passcode authentication state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Admin Sub-Tab
  const [activeTab, setActiveTab] = useState<'appointments' | 'blogs' | 'site-copy' | 'system'>('appointments');

  // Booked sessions state fetched dynamically from localStorage
  const [appointments, setAppointments] = useState<any[]>([]);

  // Web configurations
  const [webConfig, setWebConfig] = useState<WebConfig>({
    heroTagline: '#1 Ranked Fertility Clinic in Lagos, Nigeria',
    heroBtnText: 'Book Live Consultation',
    successRate: '72%',
    livingDeliveries: '1,200+',
    teamExperience: '35+ Yrs',
  });

  // Blog Editor State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'IVF & Genetics',
    author: 'Chief Coordinator',
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800&h=530'
  });

  // Success indicator notice
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Unsplash preset cover photo catalog
  const PRESET_IMAGES = [
    'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800&h=530',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800&h=530',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800&h=530',
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800&h=530',
    'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800&h=530',
  ];

  // Helper method: Insert markdown tag at cursor in content body
  const insertMarkdown = (tagBefore: string, tagAfter: string = '') => {
    const textarea = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = editingPost ? (editingPost.content || '') : (newPost.content || '');
    
    const selectedText = currentVal.substring(start, end);
    const replacement = tagBefore + (selectedText || '') + tagAfter;
    const updatedContent = currentVal.substring(0, start) + replacement + currentVal.substring(end);

    if (editingPost) {
      setEditingPost({ ...editingPost, content: updatedContent });
    } else {
      setNewPost({ ...newPost, content: updatedContent });
    }

    // Refocus & select the inserted range
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tagBefore.length,
        start + tagBefore.length + (selectedText || '').length
      );
    }, 50);
  };

  // Helper method: Live rendering of clinical markdown content
  const renderMarkdownPreview = (content: string) => {
    if (!content) return <p className="text-navy-400 italic text-xs">Start writing to see live clinical preview...</p>;

    return content.split('\n\n').map((para, index) => {
      // 1. Headings
      if (para.startsWith('### ')) {
        return (
          <h3 key={index} className="text-sm sm:text-base font-black text-navy-950 pt-2 pb-1 uppercase tracking-tight border-b border-navy-50">
            {para.replace('### ', '')}
          </h3>
        );
      }
      // 2. Blockquotes or Tips
      if (para.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-orange-500 bg-orange-50/50 p-4 rounded-xl text-xs text-navy-800 font-medium italic my-2">
            {para.replace('> ', '')}
          </blockquote>
        );
      }
      // 3. Lists (unordered)
      if (para.startsWith('- ')) {
        const items = para.split('\n');
        return (
          <ul key={index} className="list-disc list-inside pl-4 space-y-1.5 text-xs text-navy-800 font-medium">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      // 4. Lists (ordered)
      if (para.match(/^\d+\.\s/)) {
        const items = para.split('\n');
        return (
          <ol key={index} className="list-decimal list-inside pl-4 space-y-1.5 text-xs text-navy-850 font-medium">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
            ))}
          </ol>
        );
      }
      // Default text paragraph
      return (
        <p key={index} className="text-xs text-navy-800 leading-relaxed font-semibold">
          {para.split('\n').map((line, lIdx) => (
            <span key={lIdx} className="block mt-1">
              {line.split('**').map((part, pIdx) => {
                if (pIdx % 2 === 1) {
                  return <strong key={pIdx} className="font-black text-navy-950 bg-navy-50/70 px-1 rounded">{part}</strong>;
                }
                return part.split('*').map((subPart, sIdx) => {
                  if (sIdx % 2 === 1) {
                    return <em key={sIdx} className="italic text-orange-600">{subPart}</em>;
                  }
                  return subPart;
                });
              })}
            </span>
          ))}
        </p>
      );
    });
  };

  // Hydrate appointments & page texts on load
  useEffect(() => {
    // Populate appointments
    const loadAppointments = () => {
      try {
        const localData = localStorage.getItem('lagos_ivf_appointments') || '[]';
        setAppointments(JSON.parse(localData).reverse()); // newest first
      } catch (e) {
        setAppointments([]);
      }
    };

    // Populate customized page text configuration
    const loadWebConfig = () => {
      try {
        const stored = localStorage.getItem('lagos_ivf_web_config');
        if (stored) {
          setWebConfig(JSON.parse(stored));
        }
      } catch (e) {
        // default remains
      }
    };

    loadAppointments();
    loadWebConfig();

    // Check if verified in active session
    if (sessionStorage.getItem('lagos_ivf_admin_token') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const triggerBanner = (message: string) => {
    setSaveBanner(message);
    setTimeout(() => {
      setSaveBanner(null);
    }, 4000);
  };

  // Authenticate clinical passcode handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '1234' || passcode.trim().toLowerCase() === 'admin123') {
      setIsAuthenticated(true);
      setPasscodeError(false);
      sessionStorage.setItem('lagos_ivf_admin_token', 'true');
    } else {
      setPasscodeError(true);
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lagos_ivf_admin_token');
  };

  // BOOKING CONTROLLER ACTIONS
  const handleDeleteAppointment = (id: string) => {
    try {
      const db = localStorage.getItem('lagos_ivf_appointments') || '[]';
      const parsed = JSON.parse(db);
      const filtered = parsed.filter((item: any) => item.id !== id);
      localStorage.setItem('lagos_ivf_appointments', JSON.stringify(filtered));
      setAppointments(filtered.reverse());
      triggerBanner('Appointment booking deleted successfully.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = (id: string) => {
    try {
      const db = localStorage.getItem('lagos_ivf_appointments') || '[]';
      const parsed = JSON.parse(db);
      const updated = parsed.map((item: any) => {
        if (item.id === id) {
          return { ...item, status: item.status === 'Contacted' ? 'Pending' : 'Contacted' };
        }
        return item;
      });
      localStorage.setItem('lagos_ivf_appointments', JSON.stringify(updated));
      setAppointments(updated.reverse());
      triggerBanner('Appointment status updated.');
    } catch (err) {
      console.error(err);
    }
  };

  // BLOG CONTROLLER FUNCTIONS
  const handleSaveBlogEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const updated = blogPosts.map(post => post.id === editingPost.id ? editingPost : post);
    onUpdateBlogPosts(updated);
    setEditingPost(null);
    triggerBanner('Blog article updated successfully.');
  };

  const handleSaveNewBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      alert('Please fill out the article title and content body.');
      return;
    }

    const postToCreate: BlogPost = {
      id: `blog-custom-${Date.now()}`,
      title: newPost.title,
      excerpt: newPost.excerpt || (newPost.content.slice(0, 120) + '...'),
      content: newPost.content,
      category: newPost.category || 'IVF & Genetics',
      author: newPost.author || 'Lagos IVF Coordinator',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      coverImage: newPost.coverImage || PRESET_IMAGES[0]
    };

    const updated = [postToCreate, ...blogPosts];
    onUpdateBlogPosts(updated);
    setIsAddingNew(false);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'IVF & Genetics',
      author: 'Chief Coordinator',
      coverImage: PRESET_IMAGES[0]
    });
    triggerBanner('New educational blog published successfully.');
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you absolutely sure you want to delete this blog post?')) {
      const updated = blogPosts.filter(post => post.id !== id);
      onUpdateBlogPosts(updated);
      triggerBanner('Blog article deleted.');
    }
  };

  // COPY DATA CONFIGURATION SAVE
  const handleSaveWebConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('lagos_ivf_web_config', JSON.stringify(webConfig));
    window.dispatchEvent(new Event('lagos_ivf_web_config_updated'));
    triggerBanner('Website core statistics metadata updated live.');
  };

  // PORTABILITY ACTION EXPORT
  const handleExportBackup = () => {
    const backupObj = {
      blogPosts,
      webConfig,
      appointments,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `lagos-ivf-config-cms-${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
    triggerBanner('CMS backup JSON downloaded successfully.');
  };

  const handleTriggerResetToDefault = () => {
    if (window.confirm('Reset all blogs, customized rates, and CMS configurations to standard default clinic values? This will not clear your current appointments checklist.')) {
      onResetToDefaults();
      localStorage.removeItem('lagos_ivf_web_config');
      window.dispatchEvent(new Event('lagos_ivf_web_config_updated'));
      setWebConfig({
        heroTagline: '#1 Ranked Fertility Clinic in Lagos, Nigeria',
        heroBtnText: 'Book Live Consultation',
        successRate: '72%',
        livingDeliveries: '1,200+',
        teamExperience: '35+ Yrs',
      });
      triggerBanner('Site returned to original static baseline configuration.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="admin-root-section">
      
      {/* Absolute floating save indicator banner */}
      <AnimatePresence>
        {saveBanner && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 border border-emerald-500 text-white rounded-xl px-5 py-3 shadow-2xl flex items-center gap-2 select-none"
          >
            <CheckCircle className="h-4.5 w-4.5 text-white active:scale-95 shrink-0" />
            <span className="text-xs font-bold tracking-wide uppercase">{saveBanner}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* PASSCODE INTERLOCK LAYER */
          <motion.div
            key="lock-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-md mx-auto aspect-[4/3] bg-white border border-navy-150 rounded-3xl shadow-xl p-8 flex flex-col justify-center text-center space-y-6 text-navy-950 text-left"
          >
            <div className="h-14 w-14 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center mx-auto text-navy-900 shadow-sm">
              <Lock className="h-6 w-6 stroke-[2.2px] text-orange-655" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider font-mono">AUTHORIZED CO-WORKERS ONLY</span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-navy-950">Lekki/VI Clinic CMS</h1>
              <p className="text-xs text-navy-500 leading-normal max-w-xs mx-auto">
                Modify website texts, customize stats rates, and manage medical blog education articles in real-time. Use passcode <span className="font-mono font-bold bg-navy-50 text-navy-900 border border-navy-100 px-1.5 rounded">1234</span> or <span className="font-mono font-bold bg-navy-50 text-navy-900 border border-navy-100 px-1.5 rounded">admin123</span>.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter medical security passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`w-full text-center text-sm font-bold bg-white border focus:outline-none rounded-xl py-3.5 tracking-[0.2em] uppercase font-mono ${
                    passcodeError ? 'border-red-500 focus:border-red-500' : 'border-navy-200 focus:border-orange-500'
                  }`}
                  autoFocus
                />
                <Key className="absolute left-4 top-4.5 h-4 w-4 text-navy-300" />
              </div>

              {passcodeError && (
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Passcode invalid. Please check credentials.</p>
              )}

              <button
                type="submit"
                className="w-full text-xs font-extrabold uppercase tracking-widest bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-100 uppercase"
              >
                Access Workspaces
              </button>
            </form>
          </motion.div>
        ) : (
          /* FULL CMS WORKPLACE VIEW */
          <motion.div
            key="cms-core"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 text-left"
          >
            {/* CMS Top Metadata row */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-navy-100 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] font-black uppercase text-emerald-600 tracking-wider font-mono">Dynamic Mode Online</p>
                </div>
                <h1 className="text-3xl font-black uppercase text-navy-950 tracking-tight">Clinic Content Studio (Route A)</h1>
                <p className="text-xs text-navy-500">Perform direct textual updates, control active bookings, and write fertility tips seamlessly.</p>
              </div>

              <div className="flex items-center gap-3 select-none">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl bg-navy-50 hover:bg-navy-100 text-navy-950 text-xs font-bold uppercase tracking-wider border border-navy-150 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-100"
                >
                  View Live Blog
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Workplace Dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Controls Column Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full text-left p-4.5 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'appointments'
                      ? 'bg-navy-950 text-white border-navy-950 shadow-lg'
                      : 'bg-white text-navy-800 border-navy-150 hover:bg-navy-50 hover:border-navy-200'
                  }`}
                >
                  <Users className="h-4.5 w-4.5 stroke-[2.2px]" />
                  <div className="flex-grow">
                    <span>Patient Transmissions</span>
                    {appointments.length > 0 && (
                      <span className="ml-2 bg-orange-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-normal">
                        {appointments.length}
                      </span>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`w-full text-left p-4.5 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'blogs'
                      ? 'bg-navy-950 text-white border-navy-950 shadow-lg'
                      : 'bg-white text-navy-800 border-navy-150 hover:bg-navy-50 hover:border-navy-200'
                  }`}
                >
                  <FileText className="h-4.5 w-4.5 stroke-[2.2px]" />
                  <span>Educational Blogs</span>
                </button>

                <button
                  onClick={() => setActiveTab('site-copy')}
                  className={`w-full text-left p-4.5 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'site-copy'
                      ? 'bg-navy-950 text-white border-navy-950 shadow-lg'
                      : 'bg-white text-navy-800 border-navy-150 hover:bg-navy-50 hover:border-navy-200'
                  }`}
                >
                  <Settings className="h-4.5 w-4.5 stroke-[2.2px]" />
                  <span>Web Statistics Block</span>
                </button>

                <button
                  onClick={() => setActiveTab('system')}
                  className={`w-full text-left p-4.5 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === 'system'
                      ? 'bg-navy-950 text-white border-navy-950 shadow-lg'
                      : 'bg-white text-navy-800 border-navy-150 hover:bg-navy-50 hover:border-navy-200'
                  }`}
                >
                  <RefreshCw className="h-4.5 w-4.5 stroke-[2.2px]" />
                  <span>Config Backup & Reset</span>
                </button>
              </div>

              {/* Working space modules block (3 COLS) */}
              <div className="lg:col-span-3 bg-white border border-navy-150 rounded-3xl p-6 sm:p-8 shadow-sm">
                
                {/* TAB 1: BOOKING RECORDS VIEW */}
                {activeTab === 'appointments' && (
                  <div className="space-y-6">
                    <div className="border-b border-navy-50 pb-4">
                      <h2 className="text-xl font-black uppercase text-navy-950">Patient Form Bookings</h2>
                      <p className="text-[11px] text-navy-500 mt-0.5">Full checklist of contact and appointment records submitted dynamically inside this session by Lagos IVF patients.</p>
                    </div>

                    {appointments.length > 0 ? (
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {appointments.map((apt: any) => (
                          <div 
                            key={apt.id}
                            className={`p-5 rounded-2xl border text-xs text-navy-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                              apt.status === 'Contacted' 
                                ? 'bg-navy-50/40 border-navy-100 line-through text-navy-400' 
                                : 'bg-white border-navy-200 shadow-sm'
                            }`}
                          >
                            <div className="space-y-1.5 flex-grow text-left">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-extrabold text-navy-950 font-mono bg-navy-50 border border-navy-200 px-2 py-0.5 rounded">
                                  {apt.id}
                                </span>
                                {apt.AppointmentTicketID ? (
                                  <span className="text-[9px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">
                                    Appointment Calendar Form
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-black uppercase tracking-wider text-navy-600 bg-navy-50 border border-navy-200 px-2 py-0.5 rounded">
                                    General Inquiry Form
                                  </span>
                                )}
                                {apt.status === 'Contacted' && (
                                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                                    Archived / Solved
                                  </span>
                                )}
                              </div>

                              <h3 className="font-black text-navy-900 text-sm">{apt.PatientFullName || apt.PatientName || apt.fullName}</h3>
                              <p className="font-medium text-navy-600 flex items-center gap-1.5 flex-wrap">
                                <span>📧 {apt.EmailAddress || apt.email}</span>
                                <span className="text-navy-300">|</span>
                                <span>📞 {apt.PhoneWhatsApp || apt.phone}</span>
                              </p>

                              {apt.ScheduledPeriod && (
                                <p className="font-bold text-orange-655 mt-1">🗓️ Slot: {apt.ScheduledPeriod}</p>
                              )}

                              {apt.SelectedServicePathway && (
                                <p className="font-bold text-navy-900">🧬 Pathway: {apt.SelectedServicePathway}</p>
                              )}

                              {(apt.DetailedMessage || apt.ClinicalBriefNotes) && (
                                <div className="mt-2 text-navy-650 bg-navy-50/40 border border-navy-100/50 p-2.5 rounded-lg italic">
                                  &quot;{apt.DetailedMessage || apt.ClinicalBriefNotes}&quot;
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 select-none self-end md:self-center">
                              <button
                                onClick={() => handleToggleStatus(apt.id)}
                                className={`p-2 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                                  apt.status === 'Contacted'
                                    ? 'bg-navy-100 border-navy-200 text-navy-550 hover:bg-navy-150'
                                    : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                                }`}
                              >
                                {apt.status === 'Contacted' ? 'Unarchive' : 'Mark Done'}
                              </button>
                              <button
                                onClick={() => handleDeleteAppointment(apt.id)}
                                className="p-2 rounded-xl border border-red-100 bg-red-50 text-red-650 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer"
                                aria-label="Delete transmission entry"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-navy-200 rounded-3xl p-8 space-y-3">
                        <Calendar className="h-8 w-8 text-navy-300 mx-auto" />
                        <div>
                          <h4 className="font-bold text-navy-950 uppercase text-xs">No active submissions received</h4>
                          <p className="text-[10px] text-navy-500 mt-0.5">All booking appointments and contact form submissions sent inside this browser sandbox will list here instantly.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: BLOG POSTS ORGANIZER */}
                {activeTab === 'blogs' && (
                  <div className="space-y-6">
                    <div className="border-b border-navy-50 pb-4 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-black uppercase text-navy-950">Manage Patient Articles</h2>
                        <p className="text-[11px] text-navy-500 mt-0.5">Author standard guides, replace photos, and publish key medical journals immediately.</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingPost(null);
                          setIsAddingNew(true);
                          setEditorMode('write');
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-100"
                      >
                        <Plus className="h-4 w-4" />
                        New Article
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {isAddingNew || editingPost ? (
                        /* ADDING / EDITING DIALOG INLINE */
                        <motion.form
                          key="form-edit"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onSubmit={editingPost ? handleSaveBlogEdit : handleSaveNewBlog}
                          className="space-y-4 border border-navy-200 rounded-2xl p-5 bg-navy-50/30"
                        >
                          <div className="flex justify-between items-center border-b border-navy-100 pb-2.5">
                            <h3 className="font-black text-navy-950 text-xs sm:text-sm uppercase">
                              {editingPost ? 'Edit Educational Article' : 'Compose New Reproductive Guide'}
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingNew(false);
                                setEditingPost(null);
                                setEditorMode('write');
                              }}
                              className="text-xs uppercase font-bold text-navy-400 hover:text-navy-950 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Guide Title *</label>
                              <input
                                type="text"
                                value={editingPost ? editingPost.title : (newPost.title || '')}
                                onChange={(e) => {
                                  if (editingPost) setEditingPost({ ...editingPost, title: e.target.value });
                                  else setNewPost({ ...newPost, title: e.target.value });
                                }}
                                className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Category Tag</label>
                              <select
                                value={editingPost ? editingPost.category : (newPost.category || '')}
                                onChange={(e) => {
                                  if (editingPost) setEditingPost({ ...editingPost, category: e.target.value });
                                  else setNewPost({ ...newPost, category: e.target.value });
                                }}
                                className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                              >
                                <option value="IVF & Genetics">IVF & Genetics</option>
                                <option value="Patient Care">Patient Care</option>
                                <option value="Surrogacy Support">Surrogacy Support</option>
                                <option value="Embrologology News">Embrologology News</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Author Name Designation</label>
                              <input
                                type="text"
                                value={editingPost ? editingPost.author : (newPost.author || '')}
                                onChange={(e) => {
                                  if (editingPost) setEditingPost({ ...editingPost, author: e.target.value });
                                  else setNewPost({ ...newPost, author: e.target.value });
                                }}
                                className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Excerpt Outline Summarizer</label>
                              <input
                                type="text"
                                value={editingPost ? editingPost.excerpt : (newPost.excerpt || '')}
                                onChange={(e) => {
                                  if (editingPost) setEditingPost({ ...editingPost, excerpt: e.target.value });
                                  else setNewPost({ ...newPost, excerpt: e.target.value });
                                }}
                                className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                                placeholder="Brief summary sentence overview..."
                              />
                            </div>
                          </div>

                          {/* VISUAL COVER FEATURED IMAGE WORKSPACE */}
                          <div className="space-y-2.5 border border-navy-150 rounded-2xl p-4 bg-white/50 backdrop-blur-xs shadow-xs">
                            <label className="text-[10px] font-black uppercase text-orange-600 tracking-wider flex items-center gap-1.5 select-none">
                              <Image className="h-4 w-4" />
                              Blogger Featured Cover Image Workspace
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                              {/* Left side: Live visual preview container */}
                              <div className="md:col-span-4 space-y-1">
                                <span className="text-[9px] font-bold text-navy-400 uppercase tracking-widest block">Live Render Preview</span>
                                <div className="aspect-[4/3] bg-navy-50 rounded-xl overflow-hidden border border-navy-150 relative flex items-center justify-center group shadow-xs">
                                  {(() => {
                                    const activeImg = editingPost ? editingPost.coverImage : (newPost.coverImage || '');
                                    if (activeImg) {
                                      return (
                                        <img
                                          src={activeImg}
                                          alt="Featured Cover Preview"
                                          referrerPolicy="no-referrer"
                                          className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-105"
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800&h=530';
                                          }}
                                        />
                                      );
                                    }
                                    return (
                                      <div className="text-center p-4">
                                        <Image className="h-8 w-8 text-navy-300 mx-auto stroke-[1.5]" />
                                        <span className="text-[9px] text-navy-450 block mt-1 font-semibold uppercase">No Image Picked</span>
                                      </div>
                                    );
                                  })()}
                                  <div className="absolute top-2 left-2 bg-navy-950/80 text-[8px] font-black uppercase text-white px-1.5 py-0.5 rounded tracking-wider select-none">
                                    Active Cover
                                  </div>
                                </div>
                              </div>

                              {/* Right side: Custom URL paste & Visual presets select list */}
                              <div className="md:col-span-8 flex flex-col justify-between gap-3">
                                {/* Custom URL Text Input */}
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-navy-800 uppercase tracking-widest">Provide Featured Image URL (Paste Custom Link)</span>
                                    <span className="text-[8px] font-bold text-emerald-600 uppercase font-mono bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">Any Unsplash, Imgur, or direct URL</span>
                                  </div>
                                  <input
                                    type="text"
                                    value={editingPost ? editingPost.coverImage : (newPost.coverImage || '')}
                                    onChange={(e) => {
                                      if (editingPost) setEditingPost({ ...editingPost, coverImage: e.target.value });
                                      else setNewPost({ ...newPost, coverImage: e.target.value });
                                    }}
                                    className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                                    placeholder="Paste custom secure image URL here (e.g. from unsplash)..."
                                  />
                                </div>

                                {/* Premium Presets Visual Gallery */}
                                <div className="space-y-1">
                                  <span className="text-[9px] font-black text-navy-800 uppercase tracking-widest block">Or Pick From Medical-themed Presets:</span>
                                  <div className="flex gap-2 pb-1 overflow-x-auto select-none no-scrollbar">
                                    {PRESET_IMAGES.map((img, idx) => {
                                      const isSelected = editingPost ? editingPost.coverImage === img : newPost.coverImage === img;
                                      return (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => {
                                            if (editingPost) setEditingPost({ ...editingPost, coverImage: img });
                                            else setNewPost({ ...newPost, coverImage: img });
                                          }}
                                          className={`relative aspect-[4/3] h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                                            isSelected ? 'border-orange-500 ring-2 ring-orange-500/10 scale-95' : 'border-navy-150 hover:border-navy-300'
                                          }`}
                                        >
                                          <img
                                            src={img}
                                            alt={`Preset Image Picker ${idx + 1}`}
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                          />
                                          {isSelected && (
                                            <div className="absolute inset-0 bg-orange-600/30 flex items-center justify-center">
                                              <div className="bg-orange-600 p-0.5 rounded-full text-white">
                                                <Check className="h-3 w-3 stroke-[3]" />
                                              </div>
                                            </div>
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* RICH TEXT EDITOR WITH REAL-TIME PREVIEW SYSTEM */}
                          <div className="space-y-1.5">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-1 border-b border-navy-100">
                              <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">
                                Detailed Guide Content Body *
                              </label>

                              {/* Editor Modes Toggles */}
                              <div className="flex bg-navy-100/70 p-0.5 rounded-lg text-[10px] font-bold select-none border border-navy-150">
                                <button
                                  type="button"
                                  onClick={() => setEditorMode('write')}
                                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                                    editorMode === 'write' ? 'bg-white text-navy-950 shadow-xs' : 'text-navy-500 hover:text-navy-950'
                                  }`}
                                >
                                  <Edit className="h-3 w-3" />
                                  Write &amp; Format
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditorMode('preview')}
                                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                                    editorMode === 'preview' ? 'bg-white text-navy-950 shadow-xs' : 'text-navy-500 hover:text-navy-950'
                                  }`}
                                >
                                  <Eye className="h-3 w-3" />
                                  Live Clinical View
                                </button>
                              </div>
                            </div>

                            <AnimatePresence mode="wait">
                              {editorMode === 'write' ? (
                                <motion.div
                                  key="editor-write"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="space-y-2"
                                >
                                  {/* Rich Formatting Helper Toolbar */}
                                  <div className="flex flex-wrap items-center gap-1 p-2 bg-navy-50 border border-navy-200 rounded-lg select-none">
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('**', '**')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer font-bold"
                                      title="Bold text selection"
                                    >
                                      <Bold className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('*', '*')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer italic"
                                      title="Italic text selection"
                                    >
                                      <Italic className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('### ', '')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer font-bold font-mono text-[10px]"
                                      title="Insert Heading H3 block"
                                    >
                                      <Heading className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="h-4 w-[1px] bg-navy-200 mx-1"></div>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('- ', '')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer"
                                      title="Insert Unordered Bullet listing"
                                    >
                                      <List className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('1. ', '')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer"
                                      title="Insert Numberic list"
                                    >
                                      <ListOrdered className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('> ', '')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer"
                                      title="Insert Blockquote highlight"
                                    >
                                      <Quote className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="h-4 w-[1px] bg-navy-200 mx-1"></div>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('[', '](https://)')}
                                      className="p-1.5 rounded hover:bg-white text-navy-700 hover:text-navy-950 hover:shadow-xs transition-all cursor-pointer"
                                      title="Link to web destination"
                                    >
                                      <Link className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertMarkdown('### 💡 CLINICAL SAFETY TIP\n', '')}
                                      className="p-1.5 px-2 bg-orange-50 hover:bg-orange-100 text-orange-600 hover:text-orange-700 rounded text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shrink-0 ml-auto"
                                      title="Insert dynamic clinical tip block"
                                    >
                                      <Sparkles className="h-3 w-3 animate-pulse" />
                                      Insert Clinical Tip
                                    </button>
                                  </div>

                                  <textarea
                                    id="blog-content-textarea"
                                    rows={9}
                                    value={editingPost ? editingPost.content : (newPost.content || '')}
                                    onChange={(e) => {
                                      if (editingPost) setEditingPost({ ...editingPost, content: e.target.value });
                                      else setNewPost({ ...newPost, content: e.target.value });
                                    }}
                                    className="w-full text-xs font-mono font-medium bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none leading-relaxed shadow-inner"
                                    placeholder="Write your guide content. Leading with '### ' creates responsive sections. Use '**' around core concepts for bold emphasis."
                                    required
                                  />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="editor-preview"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="border border-navy-200 rounded-xl p-5 bg-white space-y-4 max-h-[350px] overflow-y-auto shadow-inner"
                                >
                                  {/* Author banner */}
                                  <div className="flex justify-between items-center bg-navy-50/50 p-2.5 rounded-lg border border-navy-100">
                                    <div>
                                      <span className="text-[8px] font-black text-orange-650 uppercase tracking-widest font-mono block">Category</span>
                                      <p className="text-[11px] font-black text-navy-950 uppercase mt-0.5">
                                        {editingPost ? editingPost.category : (newPost.category || 'IVF & Genetics')}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[8px] font-black text-navy-400 uppercase tracking-widest font-mono block">Authored By</span>
                                      <p className="text-[11px] font-extrabold text-navy-800 mt-0.5">
                                        {editingPost ? editingPost.author : (newPost.author || 'Chief Coordinator')}
                                      </p>
                                    </div>
                                  </div>

                                  <h2 className="text-base sm:text-lg font-black text-navy-950 uppercase tracking-tight leading-snug">
                                    {editingPost ? editingPost.title : (newPost.title || 'Untitled Guide Draft')}
                                  </h2>

                                  {/* Excerpt panel */}
                                  {(editingPost ? editingPost.excerpt : newPost.excerpt) && (
                                    <div className="border-l-3 border-orange-500 pl-3 italic text-xs text-navy-500 font-medium">
                                      {editingPost ? editingPost.excerpt : newPost.excerpt}
                                    </div>
                                  )}

                                  {/* Render HTML content block preview */}
                                  <div className="space-y-4 pt-3 border-t border-navy-100">
                                    {editingPost 
                                      ? renderMarkdownPreview(editingPost.content || '') 
                                      : renderMarkdownPreview(newPost.content || '')}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <button
                            type="submit"
                            className="w-full text-xs font-bold uppercase tracking-widest bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition-transform flex items-center justify-center gap-2 cursor-pointer select-none"
                          >
                            <Save className="h-4 w-4" />
                            {editingPost ? 'Save Updates' : 'Publish to Medical Guide'}
                          </button>
                        </motion.form>
                      ) : (
                        /* ARTICLES MANAGER ROW GRID */
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                          {blogPosts.map((post) => (
                            <div
                              key={post.id}
                              className="p-4 rounded-xl border border-navy-150 flex items-center justify-between gap-4 text-xs font-medium text-navy-800 hover:bg-navy-50/20 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={post.coverImage}
                                  alt={post.title}
                                  referrerPolicy="no-referrer"
                                  className="h-10 w-14 object-cover rounded-md border border-navy-100 hidden sm:block shrink-0"
                                />
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded font-mono">
                                    {post.category}
                                  </span>
                                  <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm line-clamp-1">{post.title}</h4>
                                  <p className="text-[10px] text-navy-450">Written by {post.author.split(',')[0]} on {post.date}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 select-none shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingPost(post);
                                    setEditorMode('write');
                                  }}
                                  className="p-2 rounded-lg bg-navy-50 hover:bg-orange-50 text-navy-700 hover:text-orange-655 border border-navy-100 transition-colors cursor-pointer"
                                  aria-label="Edit educational article content"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="p-2 rounded-lg bg-red-50 hover:bg-red-500 text-red-650 hover:text-white border border-red-100 hover:border-red-500 transition-colors cursor-pointer"
                                  aria-label="Delete educational article"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* TAB 3: WEB STATS MANAGER */}
                {activeTab === 'site-copy' && (
                  <div className="space-y-6">
                    <div className="border-b border-navy-50 pb-4">
                      <h2 className="text-xl font-black uppercase text-navy-950">Customize Core Website Content</h2>
                      <p className="text-[11px] text-navy-500 mt-0.5">Customize real-time diagnostic performance statistics and hero layout indicators shown to patients on the home page.</p>
                    </div>

                    <form onSubmit={handleSaveWebConfig} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Home Hero Tagline Prompt</label>
                          <input
                            type="text"
                            value={webConfig.heroTagline}
                            onChange={(e) => setWebConfig({ ...webConfig, heroTagline: e.target.value })}
                            className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Action Call Button Text</label>
                          <input
                            type="text"
                            value={webConfig.heroBtnText}
                            onChange={(e) => setWebConfig({ ...webConfig, heroBtnText: e.target.value })}
                            className="w-full text-xs font-semibold bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-navy-100 pt-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Success Rate Stat Value</label>
                          <input
                            type="text"
                            value={webConfig.successRate}
                            onChange={(e) => setWebConfig({ ...webConfig, successRate: e.target.value })}
                            className="w-full text-xs font-black bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none text-orange-655"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Healthy Deliveries Stat</label>
                          <input
                            type="text"
                            value={webConfig.livingDeliveries}
                            onChange={(e) => setWebConfig({ ...webConfig, livingDeliveries: e.target.value })}
                            className="w-full text-xs font-black bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none text-orange-655"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-navy-900 tracking-wider">Staff Experience Stat</label>
                          <input
                            type="text"
                            value={webConfig.teamExperience}
                            onChange={(e) => setWebConfig({ ...webConfig, teamExperience: e.target.value })}
                            className="w-full text-xs font-black bg-white border border-navy-200 rounded-lg p-2.5 focus:border-orange-500 focus:outline-none text-orange-655"
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full text-xs font-extrabold uppercase tracking-widest bg-navy-950 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors cursor-pointer select-none"
                        >
                          Save Changes Live
                        </button>
                      </div>

                    </form>
                  </div>
                )}

                {/* TAB 4: PORTABILITY CENTRE */}
                {activeTab === 'system' && (
                  <div className="space-y-6 text-left">
                    <div className="border-b border-navy-50 pb-4">
                      <h2 className="text-xl font-black uppercase text-navy-950">Backup, Data Portability & Resets</h2>
                      <p className="text-[11px] text-navy-500 mt-0.5">Route A supports state conservation. Click below to copy/export all customized guides as JSON, or return the clinic parameters to baseline states.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="bg-navy-50/40 border border-navy-100 p-5 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm uppercase flex items-center gap-1.5 leading-normal">
                            <Download className="h-4 w-4 text-orange-550" />
                            Backup Data Configuration
                          </h4>
                          <p className="text-[10px] text-navy-500 leading-normal font-semibold">Copy or download a complete snapshot of custom articles, metrics and form transmission logs to secure offline.</p>
                        </div>
                        <button
                          onClick={handleExportBackup}
                          className="px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          Export CMS JSON Config
                        </button>
                      </div>

                      <div className="bg-orange-50/10 border border-orange-100 p-5 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm uppercase flex items-center gap-1.5 leading-normal">
                            <RefreshCw className="h-4 w-4 text-orange-555" />
                            System Reset parameters
                          </h4>
                          <p className="text-[10px] text-navy-450 leading-normal font-semibold font-semibold">Clear custom edits, reset blogs, and return IVF success metrics to factory-supplied baseline specs.</p>
                        </div>
                        <button
                          onClick={handleTriggerResetToDefault}
                          className="px-4 py-2.5 rounded-xl bg-orange-650 hover:bg-orange-700 text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-orange-100"
                        >
                          Reset Database To Default
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
