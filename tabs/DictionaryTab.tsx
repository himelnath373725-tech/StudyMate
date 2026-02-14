
import React, { useState } from 'react';
import { Search, Plus, Book, Trash2, Edit, Volume2, BookMarked } from 'lucide-react';
import { DictionaryWord, AppLanguage } from '../types';

interface DictionaryTabProps {
  lang: AppLanguage;
  words: DictionaryWord[];
  setWords: React.Dispatch<React.SetStateAction<DictionaryWord[]>>;
}

const DictionaryTab: React.FC<DictionaryTabProps> = ({ lang, words, setWords }) => {
  const [search, setSearch] = useState('');

  const filtered = words.filter(w => w.word.toLowerCase().includes(search.toLowerCase()) || w.meaning.includes(search));

  const addNew = () => {
    const fresh: DictionaryWord = {
      id: Date.now().toString(),
      word: 'Persevere',
      meaning: 'অধ্যাবসায় করা',
      example: 'To succeed, you must persevere.',
      dateAdded: '২৪ মার্চ'
    };
    setWords([fresh, ...words]);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {lang === 'bn' ? 'আমার অভিধান' : 'Dictionary'}
          </h2>
          <p className="text-slate-500 font-bold text-sm mt-1">{lang === 'bn' ? 'নিজের শব্দভাণ্ডার সমৃদ্ধ করুন' : 'Grow your vocabulary'}</p>
        </div>
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
          <input 
            type="text" 
            placeholder={lang === 'bn' ? 'শব্দ খুঁজুন...' : 'Search words...'}
            className="w-full bg-white dark:bg-slate-900 pl-16 pr-8 py-5 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-4 focus:ring-sky-500/20 focus:outline-none dark:text-white font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-8 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full -ml-16 -mt-16 blur-3xl"></div>
              <div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/30 rounded-[28px] flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:rotate-12 transition-transform relative z-10">
                <Book size={40} />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-2xl font-black dark:text-white truncate tracking-tight">{item.word}</h3>
                    <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-sky-500 transition-colors"><Volume2 size={18} /></button>
                  </div>
                  <button 
                    onClick={() => setWords(words.filter(w => w.id !== item.id))}
                    className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                  ><Trash2 size={20} /></button>
                </div>
                <p className="text-sky-600 dark:text-sky-400 font-black text-xl mb-4">{item.meaning}</p>
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[24px] text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed font-medium">
                  "{item.example}"
                </div>
                <div className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3 shadow-lg shadow-sky-500/50" />
                  {lang === 'bn' ? 'যুক্ত হয়েছে:' : 'Added:'} {item.dateAdded}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-100/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
           <BookMarked size={64} className="text-slate-300 dark:text-slate-700 mb-6" />
           <p className="text-slate-500 font-bold text-lg">{lang === 'bn' ? 'অভিধান খালি' : 'Dictionary is empty'}</p>
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

export default DictionaryTab;
