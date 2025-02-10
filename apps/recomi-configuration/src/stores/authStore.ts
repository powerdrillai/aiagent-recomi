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
  fetchPublicKey: () => Promise<string>;
};

const internalFetchPublicKey = async (get: any, set: any) => {
  const { publicKey } = get();
  if (!publicKey) {
    const newPublicKey = await getPublicKey();
    set({ publicKey: newPublicKey });
    return newPublicKey;
  }
  return publicKey;
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

  fetchPublicKey: async () => {
    return await internalFetchPublicKey(get, set);
  },

  login: async ({ username, password }: LoginData) => {
    const publicKey = await internalFetchPublicKey(get, set);

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
  },

  logout: async () => {
    localStorage.removeItem("auth-token");
    set({ username: null, isAuthenticated: false });
  },
}));
