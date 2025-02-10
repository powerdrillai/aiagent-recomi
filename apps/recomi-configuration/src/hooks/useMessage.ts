import { useToast } from "./useToast";

// type ToastType = "success" | "error" | "warning" | "info";

// interface ToastConfig {
//   message: string;
//   type: ToastType;
// }

export function useMessage() {
  const { toast } = useToast();
  // TODO 没时间改了。。。

  return {
    success: (message: string) => toast({ title: message }),
    error: (message: string) => toast({ title: message }),
    warning: (message: string) => toast({ title: message }),
    info: (message: string) => toast({ title: message }),
  };
}
