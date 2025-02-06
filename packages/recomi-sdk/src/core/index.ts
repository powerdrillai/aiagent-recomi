import { RecomiEeventMsg, RecomiState } from "@/types";

export class Recomi {
  public isInitialized: boolean = false;
  public showApp: boolean = false;
  public recomiAppIframeId: string | undefined;
  private API_KEY: string | undefined;
  private USER_ID: string | undefined;
  private static instance: Recomi;

  constructor() {}

  public static getInstance(): Recomi {
    if (!Recomi.instance) {
      Recomi.instance = new Recomi();
    }
    return Recomi.instance;
  }

  public setPrivateProperty(API_KEY: string, USER_ID: string) {
    this.API_KEY = API_KEY;
    this.USER_ID = USER_ID;
  }

  public getPrivateProperty() {
    return {
      API_KEY: this.API_KEY,
      USER_ID: this.USER_ID,
    };
  }

  public init(API_KEY: string, USER_ID: string): void {
    console.log("TODO 执行init");

    if (this.isInitialized) {
      console.warn("SDK already initialized");
      return;
    }

    this.setPrivateProperty(API_KEY, USER_ID);
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
        config: this.getPrivateProperty(),
      };

      if (targetWindow) {
        console.log(targetWindow, this.getPrivateProperty());

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
