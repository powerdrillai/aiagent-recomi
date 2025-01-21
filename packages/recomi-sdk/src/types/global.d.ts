import { Recomi } from "@/core/index";

declare global {
  interface Window {
    recomi: Recomi;
  }
}
