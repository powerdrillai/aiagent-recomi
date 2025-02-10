import { enqueueSnackbar } from "notistack";

// type ToastType = "success" | "error" | "warning" | "info";

// interface ToastConfig {
//   message: string;
//   type: ToastType;
// }

export function useMessage() {
  // TODO 没时间改了。。。

  return {
    success: (message: string) =>
      enqueueSnackbar(message, { variant: "success" }),
    error: (message: string) => enqueueSnackbar(message, { variant: "error" }),
    warning: (message: string) =>
      enqueueSnackbar(message, { variant: "warning" }),
    info: (message: string) => enqueueSnackbar(message, { variant: "info" }),
  };
}
