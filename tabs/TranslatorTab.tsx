
import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Mic, Volume2, Sparkles } from 'lucide-react';
import { translateText } from '../services/geminiService';
import { AppLanguage } from '../types';

const TranslatorTab: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Bangla');

  const handleTranslate = async () => {
    if (!inputText) return;
    setIsTranslating(true);
    try {
      const result = await translateText(inputText, targetLang);
      setOutputText(result || '');
    } catch (error) {
      console.error(error);
      setOutputText(lang === 'bn' ? 'অনুবাদে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।' : 'Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex-1 text-center font-bold text-sm text-sky-600">{sourceLang}</div>
        <button onClick={swapLanguages} className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 hover:text-sky-600">
          <ArrowRightLeft size={18} />
        </button>
        <div className="flex-1 text-center font-bold text-sm text-sky-600">{targetLang}</div>
      </div>

      <div className="space-y-4">
        <div className="relative bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <textarea 
            className="w-full h-32 bg-transparent text-sm resize-none focus:outline-none dark:text-white" 
            placeholder={lang === 'bn' ? 'এখানে লিখুন...' : 'Type here...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2 border-t pt-2 dark:border-slate-700">
            <button className="p-2 text-slate-400 hover:text-sky-500"><Mic size={18} /></button>
            <button 
              onClick={handleTranslate}
              disabled={isTranslating}
              className="bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-sky-100 dark:shadow-none hover:bg-sky-700 disabled:opacity-50 flex items-center"
            >
              {isTranslating ? (lang === 'bn' ? 'অনুবাদ হচ্ছে...' : 'Translating...') : (lang === 'bn' ? 'অনুবাদ করুন' : 'Translate')}
              {!isTranslating && <Sparkles size={14} className="ml-1" />}
            </button>
          </div>
        </div>

        <div className="relative bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <p className="text-sm min-h-[100px] dark:text-slate-300">{outputText || (lang === 'bn' ? 'ফলাফল এখানে দেখা যাবে...' : 'Result will appear here...')}</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="p-2 text-slate-400 hover:text-slate-600"><Copy size={16} /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><Volume2 size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorTab;
