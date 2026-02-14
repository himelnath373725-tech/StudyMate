
import React, { useState, useEffect } from 'react';
import { TabType, UserProfile, AppLanguage, Transaction, Assignment, Note, DictionaryWord } from './types';
import { TABS } from './constants';
import ExpenseTrackerTab from './tabs/ExpenseTrackerTab';
import AssignmentTab from './tabs/AssignmentTab';
import NotesTab from './tabs/NotesTab';
import BrowserTab from './tabs/BrowserTab';
import TranslatorTab from './tabs/TranslatorTab';
import DictionaryTab from './tabs/DictionaryTab';
import AiAssistantTab from './tabs/AiAssistantTab';
import SettingsTab from './tabs/SettingsTab';
import AuthScreen from './components/AuthScreen';
import { LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.EXPENSE_TRACKER);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); 
  const [language, setLanguage] = useState<AppLanguage>('bn');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    department: 'বিজ্ঞান বিভাগ',
    grade: 'একাদশ শ্রেণী'
  });

  // Empty Global States - Strictly no pre-filled data
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [words, setWords] = useState<DictionaryWord[]>([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-100 transition-colors duration-300';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 transition-colors duration-300';
    }
  }, [isDarkMode]);

  const handleLogin = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} lang={language} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case TabType.EXPENSE_TRACKER: return <ExpenseTrackerTab lang={language} transactions={expenses} setTransactions={setExpenses} />;
      case TabType.ASSIGNMENTS: return <AssignmentTab lang={language} assignments={assignments} setAssignments={setAssignments} />;
      case TabType.NOTES: return <NotesTab lang={language} notes={notes} setNotes={setNotes} />;
      case TabType.BROWSER: return <BrowserTab lang={language} />;
      case TabType.TRANSLATOR: return <TranslatorTab lang={language} />;
      case TabType.DICTIONARY: return <DictionaryTab lang={language} words={words} setWords={setWords} />;
      case TabType.AI_ASSISTANT: return <AiAssistantTab lang={language} />;
      case TabType.SETTINGS: return (
        <SettingsTab 
          lang={language}
          setLang={setLanguage}
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          profile={profile}
          setProfile={setProfile}
          onLogout={() => {
            setIsLoggedIn(false);
            setProfile({ name: '', department: 'বিজ্ঞান বিভাগ', grade: 'একাদশ শ্রেণী' });
          }}
        />
      );
      default: return <ExpenseTrackerTab lang={language} transactions={expenses} setTransactions={setExpenses} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-inherit transition-all duration-300">
      {/* Sidebar for Tablet/Desktop */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50">
        <div className="p-8">
          <h1 className="text-2xl font-black text-sky-600">StudyMate</h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">Bangla Edition</p>
        </div>

        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all duration-200 ${
                activeTab === tab.id 
                ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/20 font-black' 
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              {tab.icon}
              <span className="text-sm">{language === 'bn' ? tab.label : tab.id.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 m-2">
           <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-100 dark:border-slate-700">
              <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-lg uppercase">
                {profile.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black dark:text-slate-100 truncate uppercase">{profile.name}</p>
                <p className="text-[9px] text-slate-500 truncate font-black uppercase tracking-tighter">{profile.department}</p>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <LogOut size={16} />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-inherit">
        <header className="md:hidden p-5 pt-7 sticky top-0 bg-white/95 dark:bg-slate-950/95 z-40 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-black text-sky-600">StudyMate</h1>
            <button 
              onClick={() => setActiveTab(TabType.SETTINGS)}
              className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-xl font-black uppercase"
            >
              {profile.name.charAt(0)}
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-10 lg:p-14 pb-32 md:pb-10">
          <div className="max-w-6xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50 pb-safe">
          <div className="overflow-x-auto scrollbar-hide flex items-center px-4 py-4 space-x-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center min-w-[70px] transition-all duration-200 ${
                  activeTab === tab.id 
                  ? 'text-sky-600 dark:text-sky-400 transform scale-105' 
                  : 'text-slate-500 dark:text-slate-500'
                }`}
              >
                <div className={`p-3 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-sky-50 dark:bg-sky-900/40 shadow-sm border border-sky-100 dark:border-sky-800' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] mt-2 font-black whitespace-nowrap tracking-tighter">
                  {language === 'bn' ? tab.label : tab.id.split('_')[0].charAt(0) + tab.id.split('_')[0].slice(1).toLowerCase()}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
