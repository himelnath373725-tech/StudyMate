
import React, { useState } from 'react';
import { Note, AppLanguage } from '../types';
import { Search, Grid, List, Pin, MoreVertical, Plus, Clock, StickyNote } from 'lucide-react';

interface NotesTabProps {
  lang: AppLanguage;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesTab: React.FC<NotesTabProps> = ({ lang, notes, setNotes }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));

  const addNew = () => {
    const fresh: Note = {
      id: Date.now().toString(),
      title: lang === 'bn' ? 'নতুন নোট' : 'New Note',
      content: lang === 'bn' ? 'এখানে লিখতে শুরু করুন...' : 'Start writing here...',
      date: '২৪ মার্চ',
      isPinned: false
    };
    setNotes([fresh, ...notes]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <h2 className="text-3xl font-black dark:text-white shrink-0">
          {lang === 'bn' ? 'নোটখাতা' : 'Notebook'}
        </h2>
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder={lang === 'bn' ? 'সার্চ করুন...' : 'Search...'}
            className="w-full bg-white dark:bg-slate-900 pl-14 pr-6 py-5 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-lg focus:ring-4 focus:ring-sky-500/20 focus:outline-none transition-all dark:text-white font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl shrink-0 self-end lg:self-auto border border-slate-200 dark:border-slate-800 shadow-inner">
          <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-md text-sky-600' : 'text-slate-400'}`}>
            <Grid size={24} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-md text-sky-600' : 'text-slate-400'}`}>
            <List size={24} />
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8' : 'flex flex-col space-y-6'}>
          {filtered.map(note => (
            <div key={note.id} className="group p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-lg relative hover:shadow-2xl transition-all flex flex-col min-h-[220px]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-black text-xl line-clamp-1 pr-8 dark:text-slate-100">{note.title}</h3>
                {note.isPinned && <Pin size={18} className="text-sky-500 rotate-45 absolute top-8 right-8" />}
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-5 leading-relaxed flex-1">{note.content}</p>
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/80">
                <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  <Clock size={14} className="mr-2 text-sky-500" />
                  {note.date}
                </div>
                <button className="text-slate-300 hover:text-sky-500 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-100/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
           <StickyNote size={64} className="text-slate-300 dark:text-slate-700 mb-6" />
           <p className="text-slate-500 font-bold text-lg">{lang === 'bn' ? 'কোনো নোট নেই' : 'Notebook is empty'}</p>
        </div>
      )}

      <button 
        onClick={addNew}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-16 h-16 bg-sky-600 text-white rounded-3xl shadow-2xl shadow-sky-900/40 flex items-center justify-center hover:bg-sky-700 transition-all active:scale-90 z-50 border-4 border-white dark:border-slate-950"
      >
        <Plus size={36} strokeWidth={3} />
      </button>
    </div>
  );
};

export default NotesTab;
