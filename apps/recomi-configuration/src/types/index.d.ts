// Auth Types
export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialize: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
}

// Profile Types
export interface Profile {
  id: string;
  username: string;
  updated_at: string;
}

// Bot Types
export interface Bot {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  api_key: string;
  dataset_id: string;
  status: "active" | "inactive" | "error";
  created_at: string;
  updated_at: string;
}

export interface BotCreationData {
  userId: string;
  name: string;
  description?: string;
  apiKey: string;
  datasetId: string;
}

export interface BotUpdateData {
  id: string;
  name?: string;
  description?: string;
  status?: Bot["status"];
}

// Theme Types
export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Message Types
export interface MessageState {
  success: (content: string) => void;
  error: (content: string) => void;
  warning: (content: string) => void;
  info: (content: string) => void;
}
