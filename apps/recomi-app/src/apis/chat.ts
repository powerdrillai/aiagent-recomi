import type { ChatSession } from "@/types/chat";
import request from "@/utils/request";

export interface CreateSessionData {
  /**
   * The ID of the agent. You don't need to specify it or set it to **DATA_ANALYSIS_AGENT**.
   */
  agentId?: string;
  /**
   * Job mode. Possible values are:
   * - `AUTO`: Powerdrill automatically detects your intent and selects the appropriate job
   * mode from data analysis and information retrieval.
   * - `DATA_ANALYTICS`: Powerdrill focuses specifically on data analysis.
   */
  jobMode?: JobMode;
  /**
   * The language in which the output is generated. Possible values are:
   * - `AUTO`: adaptive recognition
   * - `EN`: English
   * - `ES`: Spanish
   * - `AR`: Arabic
   * - `PT`: Portuguese
   * - `ID`: Indonesian
   * - `JA`: Japanese
   * - `RU`: Russian
   * - `HI`: Hindi
   * - `FR`: French
   * - `DE`: German
   * - `VI`: Vietnamese
   * - `TR`: Turkish
   * - `PL`: Polish
   * - `IT`: Italian
   * - `KO`: Korean
   * - `ZH-CN`: Simplified Chinese
   * - `ZH-TW`: Traditional Chinese
   */
  languageType?: LanguageType;
  /**
   * The maximum number of messages retained per session, with a value range of 0 to 10. The
   * default is 10.
   *
   * You can set it to 0 if you don't want your answer is to contain any context of job
   * history.
   */
  maxMessagesInContext?: number;
  /**
   * The session name, which can be up to 128 characters in length. If it exceeds this limit,
   * it will be truncated.
   */
  title: string;
}

export enum JobMode {
  Auto = "AUTO",
  DataAnalytics = "DATA_ANALYTICS",
}

export enum LanguageType {
  Ar = "AR",
  Auto = "AUTO",
  De = "DE",
  En = "EN",
  Es = "ES",
  Fr = "FR",
  Hi = "HI",
  ID = "ID",
  It = "IT",
  Ja = "JA",
  Ko = "KO",
  Pl = "PL",
  Pt = "PT",
  Ru = "RU",
  Tr = "TR",
  Vi = "VI",
  ZhCN = "ZH-CN",
  ZhTw = "ZH-TW",
}

export interface CreateJobData {
  answerConfig?: AnswerConfig;
  /**
   * The ID of the dataset to attach to the session. If not specified, the job will run
   * without being associated with any dataset.
   */
  datasetId?: string;
  /**
   * Specifies the IDs of the data sources to use in the conversation, rather than the entire
   * dataset. You can specify up to 1,000 data sources.
   */
  datasourceIdList?: string[];
  /**
   * Job mode. Possible values are:
   * - `AUTO`: Powerdrill automatically detects your intent and selects the appropriate job
   * mode from data analysis and information retrieval.
   * - `DATA_ANALYTICS`: Powerdrill focuses specifically on data analysis.
   */
  jobMode?: JobMode;
  /**
   * The language in which the output is generated. Possible values are:
   * - `AUTO`: adaptive recognition
   * - `EN`: English
   * - `ES`: Spanish
   * - `AR`: Arabic
   * - `PT`: Portuguese
   * - `ID`: Indonesian
   * - `JA`: Japanese
   * - `RU`: Russian
   * - `HI`: Hindi
   * - `FR`: French
   * - `DE`: German
   * - `VI`: Vietnamese
   * - `TR`: Turkish
   * - `PL`: Polish
   * - `IT`: Italian
   * - `KO`: Korean
   * - `ZH-CN`: Simplified Chinese
   * - `ZH-TW`: Traditional Chinese
   */
  languageType?: LanguageType;
  /**
   * The question you want Powerdrill to answer.
   */
  question: string;
  /**
   * The session ID.
   */
  sessionId: string;
  /**
   * Whether to use stream mode. If set to `true`, Powerdrill will send real-time updates to
   * the client, delivering continuous data as it becomes available. If set to `false`,
   * Powerdrill will return the full response only once the entire answer is ready.
   *
   * If not specified, the default value `false` will be used.
   *
   * For details about how to understand streaming responses, see "Content description" in
   * [Streaming](/api-reference/streaming#content-description).
   */
  stream?: boolean;
}

/**
 * answerConfig
 */
export interface AnswerConfig {
  /**
   * The model used for generating responses, for example, **default**.
   */
  modelGroup: ModelGroup;
  /**
   * Specifies the level of randomness in the AI model's responses, ranging from **0** (safer
   * choices) to **1** (more exploratory choices). The default value is **0**.
   */
  temperature?: number;
  [property: string]: any;
}

/**
 * The model used for generating responses, for example, **default**.
 */
export enum ModelGroup {
  Default = "default",
}

export const createSession = (CreateSessionData: CreateSessionData) =>
  request.post<ChatSession>("/sessions", {
    ...CreateSessionData,
    userId: import.meta.env.VITE_USER_ID,
  });
