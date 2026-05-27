/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, ArrowLeft, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { BlogPost, PageId } from '../types';

interface BlogProps {
  blogPosts: BlogPost[];
  onNavigate: (page: PageId) => void;
}

export default function Blog({ blogPosts, onNavigate }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Derive unique categories dynamically
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filters posts by search string and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((_, idx) => idx === 0) || blogPosts[0];

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="blog-root-section">
      
      <AnimatePresence mode="wait">
        {selectedPost ? (
          /* ARTICLE DETAILED VIEW */
          <motion.article
            key="article-details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back to Blog Listing banner */}
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 text-sm font-bold text-navy-600 hover:text-orange-600 transition-colors uppercase tracking-wider cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blog Articles
            </button>

            {/* Category tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-xs font-bold text-orange-655 border border-orange-100">
              <Tag className="h-3 w-3" />
              <span>{selectedPost.category}</span>
            </div>

            {/* Main Title and Excerpt */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight uppercase font-sans">
                {selectedPost.title}
              </h1>
              <p className="text-base sm:text-lg text-navy-700 font-medium italic leading-relaxed border-l-4 border-orange-500 pl-4">
                {selectedPost.excerpt}
              </p>
            </div>

            {/* Author and Date Meta Ribbon */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 border-b border-navy-100 text-xs text-navy-500 font-bold tracking-wide uppercase">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-orange-550" />
                <span>By {selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-orange-550" />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-orange-550" />
                <span>5 Min Read</span>
              </div>
            </div>

            {/* High-res Core Cover Image */}
            <div className="rounded-2xl overflow-hidden border border-navy-100/50 shadow-lg aspect-video max-h-[420px]">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rich Text Body rendering */}
            <div className="text-navy-900 text-sm sm:text-base leading-relaxed space-y-6 pt-4 font-sans prose prose-neutral max-w-none">
              {selectedPost.content.split('\n\n').map((para, index) => {
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl sm:text-2xl font-black text-navy-950 pt-4 uppercase tracking-tight">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }
                if (para.startsWith('1. ') || para.startsWith('- ')) {
                  const items = para.split('\n');
                  return (
                    <ul key={index} className="space-y-2 pl-4 list-disc marker:text-orange-500">
                      {items.map((item, keyIdx) => (
                        <li key={keyIdx} className="text-navy-850 font-medium">
                          {item.replace(/^[-\d.\s]+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="font-medium text-navy-800">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Author Signature Widget */}
            <div className="bg-navy-50/60 border border-navy-100/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 mt-12 text-left">
              <div className="h-12 w-12 rounded-full bg-navy-950 flex items-center justify-center text-white text-lg font-bold font-mono">
                {selectedPost.author.charAt(3) || 'L'}
              </div>
              <div>
                <p className="text-xs text-navy-400 font-extrabold uppercase tracking-widest font-mono">Published Expert Counsel</p>
                <h4 className="font-extrabold text-navy-950 text-base">{selectedPost.author}</h4>
                <p className="text-xs text-navy-600 font-semibold mt-0.5">Assigned to the leading clinical advisory board at Lagos IVF Specialist Clinic.</p>
              </div>
            </div>

            {/* Consultation CTA Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-navy-950 text-white flex flex-col md:flex-row justify-between items-center gap-6 mt-12 shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-600/10 blur-2xl"></div>
              <div className="space-y-2 relative z-10 max-w-xl">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-orange-400">Trusted Reproductive Medicine</span>
                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">Seeking personalized advice for your fertility journey?</h3>
                <p className="text-xs text-navy-200/90 leading-relaxed font-semibold">Book a live, high-precision consultation on Victoria Island. Live and virtual coordinator sessions available daily.</p>
              </div>
              <button
                onClick={() => onNavigate('book')}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-550 border border-orange-600 hover:border-orange-550 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all cursor-pointer select-none shrink-0"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </motion.article>
        ) : (
          /* ARTICLES LIST VIEW */
          <motion.div
            key="articles-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header section with description */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                <BookOpen className="h-3 w-3" />
                <span>REPRODUCTIVE EDUCATION HUB</span>
              </span>
              <h1 className="text-4xl font-extrabold text-navy-950 tracking-tight uppercase leading-none">
                Lagos Fertility & IVF <span className="text-orange-600">Knowledge Guide</span>
              </h1>
              <p className="text-xs sm:text-sm text-navy-600 leading-relaxed font-medium">
                Sovereign medical insights, embryo development guidelines, and clinical procedures authored directly by the elite embryology coordinators of Lagos IVF Specialist Clinic.
              </p>
            </div>

            {/* Quick Actions Search & Category filter chips bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-navy-100/50 py-4 max-w-4xl mx-auto">
              
              {/* Category selector chips */}
              <div className="flex flex-wrap gap-2 items-center justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-navy-700 border-navy-250 hover:bg-navy-50 hover:text-navy-950'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic search input box */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search articles & topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-white border border-navy-200 hover:border-navy-300 focus:border-orange-500 focus:outline-none rounded-xl pl-9 pr-4 py-2.5 font-semibold text-navy-950 transition-colors"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-navy-450 pointer-events-none" />
              </div>

            </div>

            {/* Featured Post Highlight (Only if search aligns) */}
            {filteredPosts.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
              <div 
                className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-navy-150/60 bg-white grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left"
                id="featured-blog-post-card"
              >
                <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-video relative">
                  <span className="absolute top-4 left-4 bg-navy-950 text-[9px] font-black uppercase text-white tracking-widest px-3 py-1 rounded-full z-10 select-none">
                    Featured Counsel
                  </span>
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:col-span-6 flex flex-col justify-center space-y-4">
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider font-mono">{featuredPost.category}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-navy-950 uppercase tracking-tight leading-tight hover:text-orange-600 transition-colors cursor-pointer" onClick={() => handleReadPost(featuredPost)}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-navy-650 leading-relaxed font-semibold">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-navy-450 font-bold uppercase tracking-wider font-mono">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-orange-500" /> By {featuredPost.author.split(',')[0]}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleReadPost(featuredPost)}
                      className="inline-flex items-center gap-1 bg-navy-950 text-white hover:bg-orange-600 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-lg transition-colors cursor-pointer select-none"
                    >
                      Read Full Article
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* General Articles Grid layout */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="blog-articles-grid">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border border-navy-150/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-navy-150 transition-all flex flex-col h-full text-left"
                  >
                    {/* Cover Photo block */}
                    <div className="aspect-video relative overflow-hidden bg-navy-100">
                      <span className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-navy-950 px-2.5 py-0.5 rounded-md border border-navy-50 select-none">
                        {post.category}
                      </span>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handleReadPost(post)}
                      />
                    </div>

                    {/* Content text card body */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] text-navy-400 font-extrabold uppercase tracking-widest block">{post.date}</span>
                        <h3 className="text-base font-black text-navy-950 hover:text-orange-600 transition-colors uppercase tracking-tight leading-snug cursor-pointer" onClick={() => handleReadPost(post)}>
                          {post.title}
                        </h3>
                        <p className="text-xs text-navy-600 leading-relaxed font-semibold line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read CTA and author ribbon */}
                      <div className="pt-4 border-t border-navy-50 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                        <span className="text-navy-450 truncate max-w-[120px]">By {post.author.split(',')[0]}</span>
                        <button
                          onClick={() => handleReadPost(post)}
                          className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                        >
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* No search results feedback state */
              <div className="text-center py-16 bg-white border border-navy-100 rounded-3xl max-w-lg mx-auto p-8 space-y-4">
                <div className="h-12 w-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-navy-950">No educational articles found</h3>
                  <p className="text-xs text-navy-600 mt-1">We couldn&apos;t match &quot;{searchQuery}&quot; with our active reproductive medicine logs. Try searching standard terms like &quot;IVF&quot;, &quot;surrogacy&quot;, or &quot;PGT-A&quot;.</p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Clear Active Filters
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
