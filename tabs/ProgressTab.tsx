
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Trophy, TrendingUp } from 'lucide-react';
import { AppLanguage } from '../types';

const ProgressTab: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const examData = lang === 'bn' ? [
    { name: 'ক্লাস টেস্ট ১', gpa: 4.5 },
    { name: 'মাসিক পরীক্ষা ১', gpa: 4.2 },
    { name: 'অর্ধবার্ষিক', gpa: 4.8 },
    { name: 'ক্লাস টেস্ট ২', gpa: 5.0 },
    { name: 'প্রাক-নির্বাচনী', gpa: 4.9 },
  ] : [
    { name: 'Class Test 1', gpa: 4.5 },
    { name: 'Monthly Exam 1', gpa: 4.2 },
    { name: 'Half Yearly', gpa: 4.8 },
    { name: 'Class Test 2', gpa: 5.0 },
    { name: 'Pre-Test', gpa: 4.9 },
  ];

  const subjects = lang === 'bn' ? [
    { name: 'পদার্থবিজ্ঞান', grade: 'A+', progress: 95, color: 'bg-blue-500' },
    { name: 'গণিত', grade: 'A+', progress: 98, color: 'bg-teal-500' },
    { name: 'রসায়ন', grade: 'A', progress: 85, color: 'bg-emerald-500' },
    { name: 'ইংরেজি', grade: 'A-', progress: 72, color: 'bg-amber-500' },
  ] : [
    { name: 'Physics', grade: 'A+', progress: 95, color: 'bg-blue-500' },
    { name: 'Math', grade: 'A+', progress: 98, color: 'bg-teal-500' },
    { name: 'Chemistry', grade: 'A', progress: 85, color: 'bg-emerald-500' },
    { name: 'English', grade: 'A-', progress: 72, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-sky-200 dark:shadow-none">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sky-100 text-xs font-bold tracking-widest uppercase">
              {lang === 'bn' ? 'বর্তমান GPA' : 'Current GPA'}
            </h2>
            <div className="text-4xl font-black mt-1">৪.৮৫</div>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
            <Trophy size={24} />
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <p className="text-[10px] text-sky-100">{lang === 'bn' ? 'টার্গেট' : 'Target'}</p>
            <p className="font-bold text-sm">৫.০০</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <p className="text-[10px] text-sky-100">{lang === 'bn' ? 'র‍্যাংক' : 'Rank'}</p>
            <p className="font-bold text-sm">#৩</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold mb-4 dark:text-white flex items-center">
          <TrendingUp size={18} className="mr-2 text-sky-500" /> 
          {lang === 'bn' ? 'পরীক্ষার ফলাফল ট্রেন্ড' : 'Exam Results Trend'}
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={examData}>
              <defs>
                <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="gpa" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold dark:text-white px-2">
          {lang === 'bn' ? 'বিষয়ভিত্তিক অগ্রগতি' : 'Subject-wise Progress'}
        </h3>
        {subjects.map((sub, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold dark:text-slate-200">{sub.name}</span>
              <span className="text-xs font-black text-sky-600">{sub.grade}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${sub.color} transition-all duration-1000`} 
                style={{ width: `${sub.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 font-bold text-sm">
        {lang === 'bn' ? 'বিস্তারিত রিপোর্ট ডাউনলোড করুন' : 'Download Detailed Report'}
      </button>
    </div>
  );
};

export default ProgressTab;
