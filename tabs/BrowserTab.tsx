
import React, { useState } from 'react';
import { Search, Globe, ShieldCheck, ExternalLink, RotateCw, ArrowLeft, ArrowRight, MoreHorizontal, Layout, Smartphone } from 'lucide-react';
import { AppLanguage } from '../types';

const BrowserTab: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      setQuery('');
    }
  };

  const openURL = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-white dark:bg-slate-950 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
      
      {/* Chrome Style Tab Bar */}
      <div className="bg-slate-100 dark:bg-slate-900 px-4 pt-3 flex items-end space-x-1 border-b dark:border-slate-800">
        <div className="bg-white dark:bg-slate-950 px-6 py-2 rounded-t-xl text-[10px] font-black uppercase tracking-widest text-sky-600 flex items-center shadow-sm">
           <Globe size={12} className="mr-2" />
           Google
        </div>
        <div className="flex-1"></div>
        <div className="flex space-x-2 pb-2 px-4">
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-950 flex items-center space-x-4 border-b dark:border-slate-800">
        <div className="flex space-x-2 shrink-0">
          <button className="p-2.5 text-slate-400 hover:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"><ArrowLeft size={20} /></button>
          <button className="p-2.5 text-slate-400 hover:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"><ArrowRight size={20} /></button>
          <button className="p-2.5 text-slate-400 hover:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"><RotateCw size={18} /></button>
        </div>

        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-900 pl-10 pr-4 py-3 rounded-full text-sm font-bold border-2 border-transparent dark:text-white shadow-inner truncate">
            https://www.google.com
          </div>
        </div>

        <div className="flex space-x-2 shrink-0">
           <button className="p-2.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><MoreHorizontal size={20} /></button>
        </div>
      </div>

      {/* Main Google Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 space-y-12">
        <div className="flex flex-col items-center">
            <div className="flex space-x-1 text-5xl md:text-8xl font-black select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mt-4">Safe Search Enabled</p>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4285F4] transition-colors" size={24} />
            <input 
              type="text" 
              value={query}
              autoFocus
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'গুগল এ সার্চ করুন...' : 'Search on Google...'}
              className="w-full bg-white dark:bg-slate-900 pl-16 pr-6 py-6 rounded-full text-lg font-bold border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none focus:border-[#4285F4] outline-none transition-all dark:text-white"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-3 text-slate-400">
                <button type="submit" className="hover:text-[#4285F4] transition-colors">
                    <ExternalLink size={20} />
                </button>
            </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4">
            <button 
                onClick={() => openURL('https://www.google.com')}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-transparent dark:border-slate-800"
            >
                Google Search
            </button>
            <button 
                className="px-6 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-transparent dark:border-slate-800"
            >
                I'm Feeling Lucky
            </button>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-8 w-full max-w-lg mt-8">
            {[
                { name: 'Wikipedia', url: 'https://bn.wikipedia.org' },
                { name: 'YouTube', url: 'https://youtube.com' },
                { name: '10MS', url: 'https://10minuteschool.com' },
                { name: 'GitHub', url: 'https://github.com' },
            ].map((site, i) => (
                <button 
                    key={i} 
                    onClick={() => openURL(site.url)}
                    className="flex flex-col items-center space-y-3 group"
                >
                    <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                        <Globe size={24} className="text-slate-400 group-hover:text-sky-600" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 dark:text-slate-400 group-hover:text-sky-600">{site.name}</span>
                </button>
            ))}
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t dark:border-slate-800 text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lang === 'bn' ? 'ব্রাউজার মোড: গুগল সার্চ' : 'Browser Mode: Google Search Only'}</p>
      </div>
    </div>
  );
};

export default BrowserTab;
