export enum CEFRLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2"
}

export enum Language {
  Spanish = "Spanish",
  French = "French",
  German = "German",
  Italian = "Italian",
  Portuguese = "Portuguese",
  Chinese = "Chinese",
  Japanese = "Japanese"
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface User {
  user_id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface ChatSettings {
  language: Language;
  cefrLevel: CEFRLevel;
}