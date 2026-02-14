
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2, Maximize2, RefreshCcw } from 'lucide-react';
import { ChatMessage, AppLanguage } from '../types';
import { askGemini } from '../services/geminiService';

const AiAssistantTab: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      role: 'assistant', 
      text: lang === 'bn' ? 'স্বাগতম! আমি আপনার AI সহায়ক। পড়ালেখার বিষয়ে যেকোনো প্রশ্ন করতে পারেন।' : 'Welcome! I am your AI assistant. You can ask me any academic questions.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askGemini(input);
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        text: response || (lang === 'bn' ? 'দুঃখিত, আমি উত্তর খুঁজে পাইনি।' : 'Sorry, I couldn\'t find an answer.') 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        text: lang === 'bn' ? 'দুঃখিত, এখন সার্ভারে কিছু সমস্যা হচ্ছে।' : 'Sorry, there is a server problem right now.' 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-2xl md:text-3xl font-bold dark:text-white flex items-center">
          <Bot className="mr-3 text-sky-500" size={32} /> {lang === 'bn' ? 'AI সহায়তা' : 'AI Support'}
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><RefreshCcw size={20} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><Maximize2 size={20} /></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 pb-6 px-2 scroll-smooth bg-slate-50/50 dark:bg-slate-900/30 rounded-[32px] p-6 border border-slate-100 dark:border-slate-800">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[90%] md:max-w-[75%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-white dark:bg-slate-800 text-indigo-600 border border-slate-100 dark:border-slate-700'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-5 rounded-[24px] text-sm md:text-base shadow-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-sky-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-3 rounded-full text-sm text-slate-500 shadow-sm">
              <Loader2 size={18} className="animate-spin text-sky-500" />
              <span className="font-medium">{lang === 'bn' ? 'AI উত্তর তৈরি করছে...' : 'AI is thinking...'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl mt-6 flex items-center space-x-3">
        <input 
          type="text" 
          placeholder={lang === 'bn' ? 'আপনার অ্যাকাডেমিক প্রশ্নটি এখানে লিখুন...' : 'Type your academic question here...'}
          className="flex-1 bg-transparent px-2 py-2 text-base focus:outline-none dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="w-12 h-12 bg-sky-600 text-white rounded-2xl flex items-center justify-center hover:bg-sky-700 transition-all active:scale-90 disabled:opacity-50 shadow-lg shadow-sky-100 dark:shadow-none"
        >
          <Send size={22} />
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {(lang === 'bn' 
          ? ['সারসংক্ষেপ করো', 'সহজ করে বোঝাও', 'গুরুত্বপূর্ণ টপিকগুলো বলো', 'উদাহরণ দাও']
          : ['Summarize', 'Explain simply', 'Key topics', 'Give examples']
        ).map(tag => (
          <button key={tag} className="text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-100 dark:border-slate-700 hover:border-sky-300 hover:text-sky-600 transition-all">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AiAssistantTab;
