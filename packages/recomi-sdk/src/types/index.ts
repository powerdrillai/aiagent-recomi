export interface Config {
  iframeUrl: string;
}

export const enum RecomiState {
  INITIALIZED = "initialized",
  NOT_INITIALIZED = "not-initialized",
}

export interface Recomi {
  isInitialized: boolean;
  showApp: boolean;
  chatAppIframeId?: string;
  API_KEY?: string;
  init: (API_KEY: string) => void;
  getState: () => RecomiState;
  bindIframe: (chatAppIframeId: string) => void;
  changeAppVisiblity: () => void;
}

export const enum RecomiEeventMsg {
  RECOMI_SDK_INITIALIZED = "RecomiSdkInitialized",
}
