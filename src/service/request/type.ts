import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface interceptorsType<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface configType<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptorsType<T>
  showLoading?: boolean
}
