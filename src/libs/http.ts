import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class Http {
  basuUrl: string;
  http: AxiosInstance;
  requstConfig: AxiosRequestConfig;
  constructor(basuUrl = "http://127.0.0.1:8080") {
    this.basuUrl = basuUrl;
    this.requstConfig = {
      baseURL: this.basuUrl,
      headers: { "X-Requested-With": "XMLHttpRequest" },
      withCredentials: true,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
    } as AxiosRequestConfig;
    this.http = axios.create(this.requstConfig);
  }
  get(url: string) {
    return this.http.get(url, this.requstConfig);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post(url: string, data?: any) {
    return this.http.post(url, data, this.requstConfig);
  }
}
