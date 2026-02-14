
import React from 'react';
import { 
  Wallet,
  BookOpen, 
  StickyNote, 
  Globe, 
  Languages, 
  BookMarked, 
  Bot, 
  Settings 
} from 'lucide-react';
import { TabType } from './types';

export const COLORS = {
  primary: '#0ea5e9', 
  secondary: '#14b8a6', 
  income: '#10b981',
  expense: '#f43f5e',
};

export const TABS = [
  { id: TabType.EXPENSE_TRACKER, label: 'হিসাব কিতাব', icon: <Wallet size={20} /> },
  { id: TabType.ASSIGNMENTS, label: 'অ্যাসাইনমেন্ট', icon: <BookOpen size={20} /> },
  { id: TabType.NOTES, label: 'নোটখাতা', icon: <StickyNote size={20} /> },
  { id: TabType.BROWSER, label: 'ব্রাউজার', icon: <Globe size={20} /> },
  { id: TabType.TRANSLATOR, label: 'অনুবাদ', icon: <Languages size={20} /> },
  { id: TabType.DICTIONARY, label: 'অভিধান', icon: <BookMarked size={20} /> },
  { id: TabType.AI_ASSISTANT, label: 'AI সহায়তা', icon: <Bot size={20} /> },
  { id: TabType.SETTINGS, label: 'সেটিংস', icon: <Settings size={20} /> },
];

export const BANGLA_DAYS = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
export const BANGLA_MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
