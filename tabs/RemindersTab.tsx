
import React, { useState } from 'react';
import { Bell, Clock, Calendar, MoreVertical, Plus } from 'lucide-react';
import { AppLanguage } from '../types';

const RemindersTab: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const [reminders] = useState([
    { id: '1', title: 'লাইব্রেরি বই ফেরত', date: '১৮ মার্চ', time: '০২:০০ PM', priority: 'High' },
    { id: '2', title: 'মাশরাফি স্যারের সাথে দেখা', date: '২০ মার্চ', time: '১০:৩০ AM', priority: 'Medium' },
    { id: '3', title: 'রুম পরিষ্কার', date: '১৭ মার্চ', time: '০৮:০০ PM', priority: 'Low' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="font-bold text-lg dark:text-white">
          {lang === 'bn' ? 'আসন্ন রিমাইন্ডার' : 'Upcoming Reminders'}
        </h2>
        <div className="p-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 rounded-xl">
          <Bell size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {reminders.map(rem => (
          <div key={rem.id} className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center group hover:border-sky-200 transition-all">
            <div className={`w-1 h-12 rounded-full mr-4 ${
              rem.priority === 'High' ? 'bg-red-500' : rem.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <div className="flex-1">
              <h3 className="font-bold text-sm dark:text-slate-200">{rem.title}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase">
                  <Calendar size={12} className="mr-1" /> {rem.date}
                </div>
                <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase">
                  <Clock size={12} className="mr-1" /> {rem.time}
                </div>
              </div>
            </div>
            <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        ))}
      </div>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-sky-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-700 transition-all active:scale-95 z-50">
        <Plus size={32} />
      </button>
    </div>
  );
};

export default RemindersTab;
