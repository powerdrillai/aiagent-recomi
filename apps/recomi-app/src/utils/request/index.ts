import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";

// 基础配置，url和超时时间
const baseConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 60000,
};

export class Request {
  // axios 实例
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(baseConfig, config));

    // 请求拦截器
    this.instance.interceptors.request.use(
      (conf: any) => {
        console.log(window.recomi);
        const cloneConf = { ...conf };
        // 添加通用header
        cloneConf.headers = {
          ...cloneConf.headers,
          Authorization: `Bearer ${window.recomi.API_KEY}`,
        };
        return cloneConf;
      },
      (error: AxiosError) => Promise.reject(error),
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response: AxiosResponse<BaseResponse<any>>) => {
        const { data } = response;
        // { code: 0, data: T, msg: '' }
        // 标准响应结构体，返回data.data
        if (data?.code || data?.code === 0) {
          return data.data;
        }
        return data;
      },
      async (error: AxiosError<any>) => {
        const { response } = error;
        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf("timeout") !== -1) {
          console.error("请求超时，请稍后再试");
        }
        if (response) {
          console.error(response?.statusText);
        }
        return Promise.reject(error);
      },
    );
  }

  // 定义请求方法
  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
const request = new Request({});

export default request;
