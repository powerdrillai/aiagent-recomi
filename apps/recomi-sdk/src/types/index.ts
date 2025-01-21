export interface Config {
  iframeUrl: string;
}

export const enum RecomiState {
  INITIALIZED = "initialized",
  NOTINITIALIZED = "not-initialized",
}

export interface Recomi {
  isInitialized: boolean;
  showApp: boolean;
  chatAppIframeId?: string;
  init: () => void;
  getState: () => RecomiState;
  bindIframe: (chatAppIframeId: string) => void;
  changeAppVisiblity: () => void;
}
