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
  username: string;
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
