
import React, { useState } from 'react';
import { User, GraduationCap, ChevronRight } from 'lucide-react';
import { AppLanguage } from '../types';

interface AuthScreenProps {
  onLogin: (name: string) => void;
  lang: AppLanguage;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, lang }) => {
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 bg-sky-600 rounded-[32px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-sky-600/30">
        <GraduationCap size={48} />
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight">StudyMate Bangla</h1>
        <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-xs">{lang === 'bn' ? 'অ্যাকাডেমিক সহায়ক' : 'Academic Assistant'}</p>
      </div>

      <div className="w-full max-w-md bg-slate-900 p-10 rounded-[48px] border border-slate-800 shadow-2xl">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-xl font-black text-white">{lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter Your Name'}</h2>
            <p className="text-sm text-slate-500 font-medium">{lang === 'bn' ? 'অ্যাপ ব্যবহার শুরু করতে একটি নাম দিন' : 'Choose a name to start using the app'}</p>
          </div>

          <div className="relative group">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-500 transition-colors" size={20} />
            <input 
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border-2 border-transparent focus:border-sky-600 p-5 pl-14 rounded-3xl text-white outline-none transition-all font-bold text-lg"
              placeholder={lang === 'bn' ? 'এখানে আপনার নাম লিখুন...' : 'Type your name here...'}
            />
          </div>
          
          <button 
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-sky-600 text-white py-5 rounded-3xl font-black flex items-center justify-center space-x-3 hover:bg-sky-700 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-sky-600/20"
          >
            <span>{lang === 'bn' ? 'প্রবেশ করুন' : 'Enter App'}</span>
            <ChevronRight size={20} />
          </button>
        </form>
      </div>

      <div className="mt-12 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Academic Excellence • v2.6.0</p>
      </div>
    </div>
  );
};

export default AuthScreen;
