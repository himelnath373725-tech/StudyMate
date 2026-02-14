
import React, { useState } from 'react';
import { Assignment, AppLanguage } from '../types';
import { CheckCircle2, Circle, Clock, Filter, Plus, BookOpen } from 'lucide-react';

interface AssignmentTabProps {
  lang: AppLanguage;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
}

const AssignmentTab: React.FC<AssignmentTabProps> = ({ lang, assignments, setAssignments }) => {
  const [filter, setFilter] = useState<'pending' | 'completed'>('pending');

  const filtered = assignments.filter(a => filter === 'completed' ? a.completed : !a.completed);

  const toggleComplete = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const addNew = () => {
    const fresh: Assignment = {
      id: Date.now().toString(),
      title: lang === 'bn' ? 'নতুন অ্যাসাইনমেন্ট' : 'New Assignment',
      subject: lang === 'bn' ? 'বিষয়' : 'Subject',
      deadline: '৩০ মার্চ',
      priority: 'Medium',
      completed: false
    };
    setAssignments([...assignments, fresh]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          {lang === 'bn' ? 'অ্যাসাইনমেন্ট' : 'Assignments'}
        </h2>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-full sm:w-auto shadow-inner border border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setFilter('pending')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-sm font-black transition-all ${filter === 'pending' ? 'bg-white dark:bg-slate-800 shadow-md text-sky-600' : 'text-slate-400'}`}
          >
            {lang === 'bn' ? 'বাকি' : 'Pending'}
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-sm font-black transition-all ${filter === 'completed' ? 'bg-white dark:bg-slate-800 shadow-md text-sky-600' : 'text-slate-400'}`}
          >
            {lang === 'bn' ? 'সম্পন্ন' : 'Done'}
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full -mr-8 -mt-8 blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <button onClick={() => toggleComplete(item.id)} className="text-slate-300 dark:text-slate-700 hover:text-sky-500 transition-colors">
                  {item.completed ? <CheckCircle2 size={32} className="text-emerald-500" /> : <Circle size={32} />}
                </button>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  item.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-sky-50 text-sky-600 dark:bg-sky-950/30'
                }`}>
                  {item.priority}
                </span>
              </div>
              
              <div className="flex-1 relative z-10">
                <h3 className={`text-xl font-black mb-2 ${item.completed ? 'line-through text-slate-400 dark:text-slate-600' : 'dark:text-white'}`}>{item.title}</h3>
                <p className="text-sm font-bold text-slate-500">{item.subject}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center text-xs text-slate-400 font-black uppercase tracking-wider">
                <Clock size={16} className="mr-2 text-sky-500" />
                <span>{lang === 'bn' ? 'শেষ তারিখ:' : 'Due:'} {item.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-100/50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
           <BookOpen size={64} className="text-slate-300 dark:text-slate-700 mb-6" />
           <p className="text-slate-500 font-bold text-lg">{lang === 'bn' ? 'কোনো অ্যাসাইনমেন্ট নেই' : 'All caught up!'}</p>
        </div>
      )}

      <button 
        onClick={addNew}
        className="w-full py-10 bg-sky-50 dark:bg-sky-900/10 border-4 border-dashed border-sky-200 dark:border-sky-900 rounded-[40px] text-sky-600 dark:text-sky-400 font-black text-xl hover:bg-sky-100 transition-all flex items-center justify-center space-x-4 shadow-xl"
      >
        <Plus size={32} strokeWidth={3} />
        <span>{lang === 'bn' ? 'নতুন অ্যাসাইনমেন্ট' : 'Add Assignment'}</span>
      </button>
    </div>
  );
};

export default AssignmentTab;
