import JSEncrypt from "jsencrypt";
import { create } from "zustand";

import {
  getPublicKey,
  login,
  type LoginData,
  register,
  type RegisterData,
} from "@/apis/auth";

// 定义 AuthStore 的类型
type AuthStore = {
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  publicKey: string | null;
  initialize: () => void;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  username: null,
  isAuthenticated: false,
  publicKey: null,
  isLoading: false,

  initialize: async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (token) {
        set({ isLoading: false, isAuthenticated: true });
      } else {
        set({ isLoading: false, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ isLoading: false });
    }
  },

  login: async ({ username, password }: LoginData) => {
    let { publicKey } = get();

    if (!publicKey) {
      publicKey = await getPublicKey();
      set({ publicKey });
    }

    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    const encryptedPassword = encrypt.encrypt(password);
    if (encryptedPassword) {
      const { access_token } = await login({
        username,
        password: encryptedPassword,
      });
      localStorage.setItem("auth-token", access_token);
      set({ username: username, isAuthenticated: true });
    }
  },

  register: async ({ email, password, username }: RegisterData) => {
    await register({ email, password, username });
    set({ username: email, isAuthenticated: true });
  },

  logout: async () => {
    localStorage.removeItem("auth-token");
    set({ username: null, isAuthenticated: false });
  },
}));
