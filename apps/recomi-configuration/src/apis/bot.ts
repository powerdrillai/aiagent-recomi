import request from "@/utils/request";

export interface CreateBotData {
  name: string;
  secretKey?: string;
}

export interface UpdateBotData {
  name?: string;
  secretKey?: string;
}

export interface Bot {
  _id: string;
  name: string;
  secretKey?: string;
  createdAt: string;
  updatedAt: string;
}

// Create a new bot
export const createBot = (data: CreateBotData) =>
  request.post<Bot>("/bots/create", data);

// Get all bots
export const getAllBots = () => request.get<Bot[]>("/bots");

// Get a specific bot by ID
export const getBotById = (botId: string) => request.get<Bot>(`/bots/${botId}`);

// Update a bot
export const updateBot = (botId: string, data: UpdateBotData) =>
  request.put<Bot>(`/bots/${botId}`, data);

// Delete a bot
export const deleteBot = (botId: string) =>
  request.delete<void>(`/bots/${botId}`);
