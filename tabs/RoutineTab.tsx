
import React from 'react';
import { RoutineItem, AppLanguage } from '../types';
import { BANGLA_DAYS, BANGLA_MONTHS } from '../constants';
import { Plus, Trash2, Edit2, Calendar, LayoutList } from 'lucide-react';

interface RoutineTabProps {
  lang: AppLanguage;
  items: RoutineItem[];
  setItems: React.Dispatch<React.SetStateAction<RoutineItem[]>>;
}

const RoutineTab: React.FC<RoutineTabProps> = ({ lang, items, setItems }) => {
  const now = new Date();
  const todayDate = lang === 'bn' 
    ? `${now.getDate()} ${BANGLA_MONTHS[now.getMonth()]}, ${now.getFullYear()}`
    : now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const todayDay = lang === 'bn' 
    ? BANGLA_DAYS[now.getDay()]
    : now.toLocaleDateString('en-US', { weekday: 'long' });

  const addDummyRoutine = () => {
    const newItem: RoutineItem = {
      id: Date.now().toString(),
      subject: lang === 'bn' ? 'নতুন বিষয়' : 'New Subject',
      time: '০৯:০০ AM',
      teacher: lang === 'bn' ? 'শিক্ষকের নাম' : 'Teacher Name',
      color: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:border-sky-800'
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {lang === 'bn' ? 'আজকের রুটিন' : 'Today\'s Routine'}
          </h2>
          <p className="text-slate-500 font-bold mt-1">{todayDate} • {todayDay}</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 p-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-sky-200">
          <Calendar size={18} />
          <span>{lang === 'bn' ? 'সাপ্তাহিক রুটিন' : 'Weekly View'}</span>
        </button>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className={`p-6 rounded-[32px] border ${item.color} shadow-sm transition-all hover:shadow-xl hover:-translate-y-1`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-black text-2xl mb-2">{item.subject}</h3>
                  <div className="flex flex-col space-y-1 font-bold opacity-80">
                    <span className="text-sm">{item.time}</span>
                    <span className="text-xs">{item.teacher}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="p-2 hover:bg-black/5 rounded-full"><Edit2 size={18} /></button>
                  <button 
                    onClick={() => setItems(items.filter(i => i.id !== item.id))}
                    className="p-2 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                  ><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-100/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
           <LayoutList size={64} className="text-slate-300 dark:text-slate-700 mb-6" />
           <p className="text-slate-500 font-bold text-lg">{lang === 'bn' ? 'কোনো ক্লাস শিডিউল করা নেই' : 'No classes scheduled yet'}</p>
           <button 
             onClick={addDummyRoutine}
             className="mt-6 px-8 py-3 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-700 transition-all shadow-lg shadow-sky-900/20"
           >
             {lang === 'bn' ? 'নতুন যোগ করুন' : 'Add New'}
           </button>
        </div>
      )}

      <button 
        onClick={addDummyRoutine}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-16 h-16 bg-sky-600 text-white rounded-3xl shadow-2xl shadow-sky-900/40 flex items-center justify-center hover:bg-sky-700 transition-all active:scale-90 z-50 border-4 border-white dark:border-slate-950"
      >
        <Plus size={36} strokeWidth={3} />
      </button>
    </div>
  );
};

export default RoutineTab;
