declare global {
  interface BaseResponse<T> {
    code: number;
    data: T;
    msg: string;
  }
}

// Why export {}:
// declare global 需要在模块上下文中生效，即文件中必须有 import 或 export 语句，
// 否则 TypeScript 认为它是一个全局脚本，而不会应用 declare global 里面的类型。
export {};
