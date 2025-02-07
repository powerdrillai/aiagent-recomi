import request from "@/utils/request";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const getPublicKey = () => request.get<string>("/auth/publicKey");

export const login = (data: LoginData) =>
  request.post<{
    access_token: string;
  }>("/auth/login", data);

export const register = (data: RegisterData) =>
  request.post("/auth/register", data);
