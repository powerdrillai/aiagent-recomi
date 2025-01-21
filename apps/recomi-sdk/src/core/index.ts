import { RecomiState } from "@/types";

export class Recomi {
  public isInitialized: boolean = false;
  public showApp: boolean = false;
  public chatAppIframeId: string | undefined;
  private static instance: Recomi;

  constructor() {}

  public static getInstance(): Recomi {
    if (!Recomi.instance) {
      Recomi.instance = new Recomi();
    }
    return Recomi.instance;
  }

  public init(): void {
    console.log("TODO 执行init");

    if (this.isInitialized) {
      console.warn("SDK already initialized");
      return;
    }

    this.isInitialized = true;
  }

  public getState(): RecomiState {
    console.log("getState");

    return this.isInitialized
      ? RecomiState.INITIALIZED
      : RecomiState.NOTINITIALIZED;
  }

  public bindIframe(chatAppIframeId: string) {
    this.chatAppIframeId = chatAppIframeId;
    this.changeAppVisiblity();
  }

  public changeAppVisiblity() {
    this.showApp = !this.showApp;
    console.log(this.showApp, this.chatAppIframeId);

    if (this.chatAppIframeId) {
      const chatAppIframe = document.getElementById(this.chatAppIframeId);
      if (!chatAppIframe) {
        console.warn("unexpected unexisted ");
        return;
      } else {
        if (this.showApp) {
          chatAppIframe.style.visibility = "visible";
        } else {
          chatAppIframe.style.visibility = "hidden";
        }
      }
    } else {
      console.warn("lack of chatAppIframeId");
    }
  }
}
