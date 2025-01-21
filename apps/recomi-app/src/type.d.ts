import type { Recomi } from "@recomi/recomi-sdk";

declare global {
  interface Window {
    recomi: Recomi;
  }

  interface BaseResponse<T> {
    code: number;
    data: T;
    msg: string;
  }
}
