
import React, { useState } from 'react';
import { User, Globe, Moon, Sun, Bell, LogOut, Save, X, Edit3 } from 'lucide-react';
import { UserProfile, AppLanguage } from '../types';

interface SettingsTabProps {
  lang: AppLanguage;
  setLang: (l: AppLanguage) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  onLogout: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ 
  lang, setLang, isDarkMode, toggleDarkMode, profile, setProfile, onLogout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [notifsEnabled, setNotifsEnabled] = useState(true);

  const handleProfileSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const labels = {
    title: lang === 'bn' ? 'সেটিংস' : 'Settings',
    profileEdit: lang === 'bn' ? 'প্রোফাইল এডিট' : 'Edit Profile',
    appSettings: lang === 'bn' ? 'অ্যাপ সেটিংস' : 'App Settings',
    language: lang === 'bn' ? 'ভাষা' : 'Language',
    theme: lang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode',
    notif: lang === 'bn' ? 'নোটিফিকেশন' : 'Notifications',
    logout: lang === 'bn' ? 'লগ আউট' : 'Log Out',
    save: lang === 'bn' ? 'সংরক্ষণ' : 'Save',
    cancel: lang === 'bn' ? 'বাতিল' : 'Cancel'
  };

  return (
    <div className="space-y-10 pb-20 max-w-2xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-4xl font-black dark:text-white mb-2">{labels.title}</h2>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs px-1">{lang === 'bn' ? 'আপনার অ্যাপ কন্ট্রোল করুন' : 'Manage your experience'}</p>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-sky-500/10 transition-colors"></div>
        <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-8 sm:space-y-0 sm:space-x-10 relative z-10">
          <div className="w-32 h-32 rounded-[40px] bg-sky-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-sky-600/30 uppercase">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{lang === 'bn' ? 'নাম' : 'Name'}</label>
                  <input 
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-black text-lg"
                    value={editForm.name}
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{lang === 'bn' ? 'বিভাগ' : 'Dept'}</label>
                  <input 
                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold"
                    value={editForm.department}
                    onChange={e => setEditForm({...editForm, department: e.target.value})}
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button onClick={handleProfileSave} className="flex-1 bg-sky-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-sky-700 shadow-lg">
                    {labels.save}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200">
                    {labels.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-black text-3xl dark:text-white tracking-tight uppercase">{profile.name}</h3>
                <p className="text-sm font-black text-sky-600 dark:text-sky-400 mt-2 uppercase tracking-[0.2em]">{profile.department}</p>
                <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tighter">{profile.grade}</p>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-8 px-8 py-3.5 bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-sky-100 transition-all border border-sky-100 dark:border-sky-800 shadow-lg flex items-center space-x-2"
                >
                  <Edit3 size={14} />
                  <span>{labels.profileEdit}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4">{labels.appSettings}</h4>
        <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          
          <div className="p-8 flex items-center justify-between border-b dark:border-slate-800">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-sky-50 dark:bg-sky-900/40 text-sky-600 rounded-3xl"><Globe size={28} /></div>
              <div>
                <p className="text-lg font-black dark:text-white">{labels.language}</p>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">{lang === 'bn' ? 'বাংলা' : 'English'}</p>
              </div>
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl shadow-inner border dark:border-slate-700">
              <button onClick={() => setLang('bn')} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${lang === 'bn' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-lg' : 'text-slate-400'}`}>BN</button>
              <button onClick={() => setLang('en')} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-lg' : 'text-slate-400'}`}>EN</button>
            </div>
          </div>

          <button onClick={toggleDarkMode} className="w-full p-8 flex items-center justify-between border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/40 text-amber-600 rounded-3xl">{isDarkMode ? <Sun size={28} /> : <Moon size={28} />}</div>
              <div className="text-left">
                <p className="text-lg font-black dark:text-white">{labels.theme}</p>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">{isDarkMode ? 'ডার্ক' : 'লাইট'}</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full p-1.5 transition-all flex items-center ${isDarkMode ? 'bg-sky-600' : 'bg-slate-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-2xl transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </button>

          <button onClick={() => setNotifsEnabled(!notifsEnabled)} className="w-full p-8 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 rounded-3xl"><Bell size={28} /></div>
              <div className="text-left">
                <p className="text-lg font-black dark:text-white">{labels.notif}</p>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">{notifsEnabled ? 'চালু' : 'বন্ধ'}</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full p-1.5 transition-all flex items-center ${notifsEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-2xl transform transition-transform ${notifsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </button>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-8 bg-slate-900 border border-slate-800 text-red-500 rounded-[32px] font-black text-lg flex items-center justify-center space-x-4 shadow-2xl hover:bg-red-600 hover:text-white transition-all active:scale-[0.98]"
      >
        <LogOut size={24} strokeWidth={3} />
        <span className="uppercase tracking-[0.3em]">{labels.logout}</span>
      </button>

      <div className="text-center py-10 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] dark:text-slate-400">StudyMate v2.6.0 • Academic Powerhouse</p>
      </div>
    </div>
  );
};

export default SettingsTab;
