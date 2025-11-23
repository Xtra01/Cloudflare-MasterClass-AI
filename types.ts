
export type Language = 'tr' | 'en';

export enum ContentType {
  TUTORIAL = 'TUTORIAL',
  DEEP_DIVE = 'DEEP_DIVE',
  CONFIG_GENERATOR = 'CONFIG_GENERATOR'
}

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface Topic {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Category {
  id: string;
  title: LocalizedText;
  topics: Topic[];
}

export interface GeneratedContent {
  title: string;
  content: string; // Markdown formatted string
  relatedTopics: string[];
  language: Language;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

// Cache stores content keyed by TopicID, then by Language
export type ContentCache = Record<string, Record<Language, GeneratedContent>>;
