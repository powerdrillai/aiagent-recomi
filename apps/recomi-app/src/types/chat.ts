import type { ContentBlock } from ".";

export enum MessageAuthor {
  AI = "ai",
  USER = "user",
}

export interface Message {
  id: string;
  content: ContentBlock[];
  author: MessageAuthor;
  loading?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  languageType: "EN" | "ZH-CN";
}

export interface ChatConfig {
  modelGroup: string;
}

export interface ChatResponse {
  choices: {
    delta: {
      content: string;
    };
  }[];
}

export enum ContentType {
  MESSAGE = "MESSAGE",
  CODE = "CODE",
  IMAGE = "IMAGE",
  IMAGES = "IMAGES",
  TABLE = "TABLE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  PROCESS = "PROCESS",
  SOURCES = "SOURCES",
  QUOTE = "QUOTE",
  CHART = "CHART",
  TITLE_GENERATION = "TITLE_GENERATION",
  QUESTIONS = "QUESTIONS", // ask more questions
  OPTIONS = "OPTIONS", // options for question
  QUICK_QUERY = "QUICK_QUERY", // 上下文中出现问题直接提问
  TRIGGER = "TRIGGER", // 生成conclusion的按钮
  CONCLUSION = "CONCLUSION", // 生成的CONCLUSION
  ERROR = "ERROR", // ERROR Retry
}
