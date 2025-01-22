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
  init: (API_KEY: string, USER_ID: string) => void;
  getState: () => RecomiState;
  bindIframe: (chatAppIframeId: string) => void;
  setPrivateProperty: (API_KEY: string, USER_ID: string) => void;
  getPrivateProperty: () => { API_KEY: string; USER_ID: string };
  changeAppVisiblity: () => void;
}

export const enum RecomiEeventMsg {
  RECOMI_SDK_INITIALIZED = "RecomiSdkInitialized",
}
