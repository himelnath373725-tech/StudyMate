
import React, { useState } from 'react';
import { Plus, Wallet, ArrowUpCircle, ArrowDownCircle, Trash2, PieChart, Landmark } from 'lucide-react';
import { Transaction, AppLanguage, TransactionType } from '../types';

interface ExpenseTrackerTabProps {
  lang: AppLanguage;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const ExpenseTrackerTab: React.FC<ExpenseTrackerTabProps> = ({ lang, transactions, setTransactions }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', amount: '', type: 'expense' as TransactionType, category: 'অন্যান্য' });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    
    const newTx: Transaction = {
      id: Date.now().toString(),
      title: form.title,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date().toLocaleDateString('bn-BD')
    };
    
    setTransactions([newTx, ...transactions]);
    setForm({ title: '', amount: '', type: 'expense', category: 'অন্যান্য' });
    setShowAdd(false);
  };

  const removeTx = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Balance Dashboard */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[56px] border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:bg-sky-500/20 transition-colors"></div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-6">{lang === 'bn' ? 'মোট ব্যালেন্স' : 'Total Balance'}</p>
          <div className="flex items-center space-x-4">
            <span className="text-6xl font-black text-white tracking-tighter">৳{balance.toLocaleString()}</span>
            {balance < 0 && <span className="text-xs bg-rose-500/20 text-rose-500 px-3 py-1 rounded-full font-black uppercase">Low</span>}
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 p-6 bg-emerald-500/5 rounded-[32px] border border-emerald-500/10">
              <div className="flex items-center text-emerald-500 mb-3">
                <ArrowUpCircle size={20} className="mr-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'bn' ? 'আয়' : 'Income'}</span>
              </div>
              <p className="text-2xl font-black text-white">৳{totalIncome.toLocaleString()}</p>
            </div>
            <div className="flex-1 p-6 bg-rose-500/5 rounded-[32px] border border-rose-500/10">
              <div className="flex items-center text-rose-500 mb-3">
                <ArrowDownCircle size={20} className="mr-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'bn' ? 'ব্যয়' : 'Expense'}</span>
              </div>
              <p className="text-2xl font-black text-white">৳{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="lg:w-96 bg-white dark:bg-slate-900 p-10 rounded-[56px] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-xl">
           <div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/30 rounded-full flex items-center justify-center text-sky-600 mb-6">
             <Landmark size={40} />
           </div>
           <h3 className="font-black dark:text-white text-xl uppercase tracking-tighter">{lang === 'bn' ? 'হিসাব শুরু করুন' : 'Financial Hub'}</h3>
           <p className="text-sm text-slate-500 font-bold mt-4 leading-relaxed">{lang === 'bn' ? 'একজন শিক্ষার্থী হিসেবে নিজের আয়ের তুলনায় খরচ নিয়ন্ত্রণ করা জরুরি।' : 'Managing your scholarship, allowance, and daily costs effectively starts here.'}</p>
           <button 
             onClick={() => setShowAdd(true)}
             className="mt-10 w-full py-5 bg-sky-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-sky-700 transition-all shadow-2xl shadow-sky-600/30"
           >
             {lang === 'bn' ? 'নতুন এন্ট্রি' : 'New Entry'}
           </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{lang === 'bn' ? 'সাম্প্রতিক ট্রানজ্যাকশন' : 'Recent Activity'}</h3>
            <PieChart size={18} className="text-slate-400" />
        </div>
        
        {transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transactions.map(tx => (
              <div key={tx.id} className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center group hover:border-sky-500/30 transition-all overflow-hidden relative">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center flex-shrink-0 ${
                  tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {tx.type === 'income' ? <ArrowUpCircle size={28} /> : <ArrowDownCircle size={28} />}
                </div>
                <div className="flex-1 ml-6 min-w-0">
                  <h4 className="font-black text-xl dark:text-slate-100 truncate tracking-tight">{tx.title}</h4>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{tx.category} • {tx.date}</p>
                </div>
                <div className="text-right ml-4">
                  <p className={`text-2xl font-black ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                  </p>
                  <button 
                    onClick={() => removeTx(tx.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 bg-slate-100/30 dark:bg-slate-900/20 rounded-[56px] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
             <Wallet size={80} className="mb-8 opacity-10" />
             <p className="font-black text-lg uppercase tracking-[0.3em] opacity-40">{lang === 'bn' ? 'কোনো ডাটা নেই' : 'No Financial Data'}</p>
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[64px] shadow-2xl p-12 border border-slate-200 dark:border-slate-800 animate-in zoom-in-90 duration-300">
            <h2 className="text-3xl font-black dark:text-white mb-10 tracking-tighter">{lang === 'bn' ? 'নতুন লেনদেন' : 'New Transaction'}</h2>
            <form onSubmit={handleAdd} className="space-y-8">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-3xl border dark:border-slate-700">
                <button 
                  type="button" 
                  onClick={() => setForm({...form, type: 'income'})}
                  className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${form.type === 'income' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30' : 'text-slate-500'}`}
                >{lang === 'bn' ? 'আয়' : 'Income'}</button>
                <button 
                  type="button" 
                  onClick={() => setForm({...form, type: 'expense'})}
                  className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${form.type === 'expense' ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/30' : 'text-slate-500'}`}
                >{lang === 'bn' ? 'ব্যয়' : 'Expense'}</button>
              </div>

              <div className="space-y-5">
                <input 
                  type="text" 
                  placeholder={lang === 'bn' ? 'লেনদেনের নাম (উদাঃ মেস ভাড়া)' : 'Description (e.g. Mess Rent)'}
                  className="w-full bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border-2 border-transparent focus:border-sky-500 outline-none font-bold dark:text-white text-lg"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  required
                />
                <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-400">৳</span>
                    <input 
                      type="number" 
                      placeholder={lang === 'bn' ? 'পরিমাণ' : 'Amount'}
                      className="w-full bg-slate-50 dark:bg-slate-800 p-6 pl-12 rounded-3xl border-2 border-transparent focus:border-sky-500 outline-none font-black text-3xl dark:text-white"
                      value={form.amount}
                      onChange={e => setForm({...form, amount: e.target.value})}
                      required
                    />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 py-6 bg-sky-600 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs hover:bg-sky-700 shadow-2xl shadow-sky-600/30"
                >{lang === 'bn' ? 'যুক্ত করুন' : 'Add Transaction'}</button>
                <button 
                  type="button" 
                  onClick={() => setShowAdd(false)}
                  className="px-10 py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[32px] font-black uppercase tracking-widest text-xs"
                >{lang === 'bn' ? 'বন্ধ' : 'Close'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTrackerTab;
