import { useCallback } from "react";
import { createRoot } from "react-dom/client";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastConfig {
  message: string;
  type: ToastType;
}

export function useMessage() {
  const showToast = useCallback((config: ToastConfig) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleClose = () => {
      root.unmount();
      container.remove();
    };

    // ts err
    // root.render(
    //   <Toast
    //     message={config.message}
    //     type={config.type}
    //     onClose={handleClose}
    //   />
    // );
  }, []);

  return {
    success: (message: string) => showToast({ message, type: "success" }),
    error: (message: string) => showToast({ message, type: "error" }),
    warning: (message: string) => showToast({ message, type: "warning" }),
    info: (message: string) => showToast({ message, type: "info" }),
  };
}
