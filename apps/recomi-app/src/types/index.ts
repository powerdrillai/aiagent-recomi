export enum ChartTypeEnum {
  line = "Line",
  area = "Area",
  bar = "Bar",
  pie = "Pie",
  doughnut = "Doughnut",
  table = "Table",
}

export type ChartType = keyof typeof ChartTypeEnum;

export type AnswerProps = {
  question: string;
  datasetIds: string[];
  sessionId: string;
  modelConfig?: {
    code: string;
    temperature: number;
  };
  imageKeys?: string[];
  audioKeys?: string[];
  quote?: {
    messageId: string;
    onlyText: boolean;
  };
  type?: string;
  fromMessageComponent?: {
    messageId: string;
    optionIdList: string[];
  };
};

export type ChartContent = {
  code: string;
  codeType: string;
  datasourceId: string;
  datasetId: string;
  columns: string[];
  name: string;
  url?: string;
  imageUrl?: string;
  taskId?: string;
  chartConfig: {
    xLabel?: string;
    yLabel?: string;
    xField?: string;
    yFields?: string[];
    showXGridLines?: boolean;
    showYGridLines?: boolean;
    legend?: "top" | "bottom" | "left" | "right" | "none";
    showValueLabels?: boolean;
    smoothLine?: boolean;
    isStacked?: boolean;
    isHorizontal?: boolean;
    isPercentage?: boolean;
    chartType?: ChartType;
    chartName?: string;
    supportedTypes?: ChartType[];
    columns?: string[];
    excludeColumns?: string[];
    showRowNumbers?: boolean;
    showColumnFilters?: boolean;
    labelPosition?: "inside" | "outside";
  };
};

export type ContentBlock = {
  type: ContentType;
  block: string;
  blockId?: string;
  chartContent?: ChartContent;
  fileName?: string;
  codeExecution?: string; // 代码执行结果，目前error需要展示出来
  fileURLs?: string[]; // 本地上传的文件比如图片生成的访问地址
  textToSpeech?: boolean; // 点击文生语音按钮生成的语音带的标识， 值为true
  hasAudios?: boolean;
  hasCodes?: boolean;
  hasImages?: boolean;
  hasFiles?: boolean;
  questions?: string[]; // ask more questions
  options?: {
    disabled?: boolean;
    selected?: string[];
    choice: "multi" | "single";
    optionList: { id: string; content: string }[];
  };
  selectedOptions?: string[];
};

export enum ContentType {
  MESSAGE = "MESSAGE",
  CODE = "CODE",
  IMAGE = "IMAGE",
  IMAGES = "IMAGES",
  TABLE = "TABLE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  PROCESS = "PROCESS",
  SOURCES = "SOURCES",
  QUOTE = "QUOTE",
  CHART = "CHART",
  TITLE_GENERATION = "TITLE_GENERATION",
  QUESTIONS = "QUESTIONS", // ask more questions
  OPTIONS = "OPTIONS", // options for question
  QUICK_QUERY = "QUICK_QUERY", // 上下文中出现问题直接提问
  TRIGGER = "TRIGGER", // 生成conclusion的按钮
  CONCLUSION = "CONCLUSION", // 生成的CONCLUSION
  ERROR = "ERROR", // ERROR Retry
}

export type TaskContent = {
  taskName: string; // 任务名称
  taskId: string; // 任务id
  taskStatus: TaskStatus; // 任务状态
  taskStage: string;
  isHistory?: boolean; // 是否是历史记录的消息
  files?: string; // 可能有的文件名称
  content: ContentBlock[]; // 具体内容
};

export enum TaskStatus {
  RUNNING = "running",
  DONE = "done",
  ERROR = "error",
}
