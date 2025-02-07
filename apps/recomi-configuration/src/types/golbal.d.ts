declare global {
  interface BaseResponse<T> {
    code: number;
    data: T;
    msg: string;
  }
}
