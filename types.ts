
export enum TabType {
  EXPENSE_TRACKER = 'EXPENSE_TRACKER',
  ASSIGNMENTS = 'ASSIGNMENTS',
  NOTES = 'NOTES',
  BROWSER = 'BROWSER',
  TRANSLATOR = 'TRANSLATOR',
  DICTIONARY = 'DICTIONARY',
  AI_ASSISTANT = 'AI_ASSISTANT',
  SETTINGS = 'SETTINGS'
}

export type AppLanguage = 'bn' | 'en';

export interface UserProfile {
  name: string;
  department: string;
  grade: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
}

export interface DictionaryWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  dateAdded: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

// Added RoutineItem interface to fix import error in RoutineTab.tsx
export interface RoutineItem {
  id: string;
  subject: string;
  time: string;
  teacher: string;
  color: string;
}
