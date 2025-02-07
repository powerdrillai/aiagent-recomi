import request from "@/utils/request";

export interface CreateBotData {
  name: string;
  secretkey?: string;
}

export const createBot = (data: CreateBotData) =>
  request.post("/bots/create", data);
