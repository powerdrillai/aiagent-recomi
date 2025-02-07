import { RecomiEeventMsg } from "@recomi/recomi-sdk";
import { useEffect, useState } from "react";

import type { RecomiConfig } from "@/types/recomi";

import RecomiContext from "../Context/RecomiContext";

interface IRecomiProvider {
  children: React.ReactNode;
}

export default function RecomiProvider({ children }: IRecomiProvider) {
  const [recomiConfig, setRecomiConfig] = useState<RecomiConfig>();

  useEffect(() => {
    const handleMessage = (event: MessageEvent<any>) => {
      if (
        event?.data?.message &&
        event?.data?.message === RecomiEeventMsg.RECOMI_SDK_INITIALIZED
      ) {
        const { config } = event.data;
        console.log("Received message:", config);
        // TODO 尽量都要按照sdk的导出枚举写，不要写死
        if (config) {
          setRecomiConfig(config);
        }
        window.recomi = config;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      setRecomiConfig(undefined);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <RecomiContext.Provider value={recomiConfig || null}>
      {children}
    </RecomiContext.Provider>
  );
}
