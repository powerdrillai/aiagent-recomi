import { Recomi } from "@/types/index";

declare global {
  interface Window {
    recomi: Recomi;
  }
}

export {}; // 确保文件被当作模块处理
