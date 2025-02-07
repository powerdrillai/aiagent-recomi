import { RecomiEeventMsg, RecomiState } from "@/types";

export class Recomi {
  public isInitialized: boolean = false;
  public showApp: boolean = false;
  public recomiAppIframeId: string | undefined;
  public SECRET_KEY: string | undefined;
  private static instance: Recomi;

  constructor() {}

  public static getInstance(): Recomi {
    if (!Recomi.instance) {
      Recomi.instance = new Recomi();
    }
    return Recomi.instance;
  }

  public init(SECRET_KEY: string): void {
    console.log("TODO 执行init");

    if (this.isInitialized) {
      console.warn("SDK already initialized");
      return;
    }

    this.SECRET_KEY = SECRET_KEY;
    this.isInitialized = true;
  }

  public getState(): RecomiState {
    console.log("getState");

    return this.isInitialized
      ? RecomiState.INITIALIZED
      : RecomiState.NOT_INITIALIZED;
  }

  public bindIframe(recomiAppIframeId: string) {
    this.recomiAppIframeId = recomiAppIframeId;
    this.changeAppVisiblity();

    const targetIframe = window.frames[import.meta.env.VITE_RECOMIAPP_IFRAMEID];

    targetIframe.onload = () => {
      const targetWindow = (targetIframe as any).contentWindow;
      const data = {
        message: RecomiEeventMsg.RECOMI_SDK_INITIALIZED,
        config: {
          SECRET_KEY: this.SECRET_KEY,
        },
      };

      if (targetWindow) {
        console.log(targetWindow, this.SECRET_KEY);

        const targetOrigin = import.meta.env.VITE_RECOMI_ORIGIN;
        console.log(targetOrigin);

        targetWindow?.postMessage(data, targetOrigin);
      }
    };
  }

  public changeAppVisiblity() {
    this.showApp = !this.showApp;
    console.log(this.showApp, this.recomiAppIframeId);

    if (this.recomiAppIframeId) {
      const recomiAppIframe = document.getElementById(this.recomiAppIframeId);
      if (!recomiAppIframe) {
        console.warn("unexpected unexisted ");
        return;
      } else {
        if (this.showApp) {
          recomiAppIframe.style.visibility = "visible";
        } else {
          recomiAppIframe.style.visibility = "hidden";
        }
      }
    } else {
      console.warn("lack of recomiAppIframeId");
    }
  }
}
