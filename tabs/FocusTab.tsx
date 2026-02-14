
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { AppLanguage } from '../types';

const FocusTab: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to resolve "Cannot find namespace 'NodeJS'"
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const data = lang === 'bn' ? [
    { day: 'শনি', mins: 45 },
    { day: 'রবি', mins: 120 },
    { day: 'সোম', mins: 60 },
    { day: 'মঙ্গল', mins: 150 },
    { day: 'বুধ', mins: 90 },
    { day: 'বৃহঃ', mins: 200 },
    { day: 'শুক্র', mins: 30 },
  ] : [
    { day: 'Sat', mins: 45 },
    { day: 'Sun', mins: 120 },
    { day: 'Mon', mins: 60 },
    { day: 'Tue', mins: 150 },
    { day: 'Wed', mins: 90 },
    { day: 'Thu', mins: 200 },
    { day: 'Fri', mins: 30 },
  ];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-4">
      {/* Timer Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-slate-200 dark:stroke-slate-800 fill-none stroke-[8]"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-sky-500 fill-none stroke-[8] transition-all duration-1000"
            strokeDasharray={753.98}
            strokeDashoffset={753.98 - (753.98 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">{formatTime(timeLeft)}</span>
          <span className="text-slate-400 text-xs mt-2 uppercase tracking-widest">
            {lang === 'bn' ? 'ফোকাস সেশন' : 'Focus Session'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-6 items-center">
        <button onClick={resetTimer} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
          <RotateCcw size={24} />
        </button>
        <button 
          onClick={() => setIsActive(!isActive)}
          className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-sky-200 dark:shadow-none hover:bg-sky-700 transition-all active:scale-95"
        >
          {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <button onClick={() => setIsSoundOn(!isSoundOn)} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
          {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-400">
              {lang === 'bn' ? 'মোট পড়া হয়েছে' : 'Total Study Time'}
            </h3>
            <p className="text-2xl font-bold dark:text-white">
              {lang === 'bn' ? '১২ ঘণ্টা ৪২ মি.' : '12h 42m'}
            </p>
          </div>
          <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-lg font-bold">+১৮%</span>
        </div>
        
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="mins" radius={[4, 4, 4, 4]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#0ea5e9' : '#e2e8f0'} />
                ))}
              </Bar>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FocusTab;
