import axios, { type AxiosInstance } from 'axios'
import { RequestConfig, RequestInterceptor } from './type'

const DEFAULT_LOADING = true

class FRequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptor
  showLoading: boolean
  loading?: any

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 如果new FRequest有拦截器，添加到axios拦截器上
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全部拦截
    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          // 加载动画
          this.loading = ''
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      res => {
        // 结束加载
        this.loading = ''
        const code = res.data && res.data.code || 200
        let msg = ''
        if (code < 200 || code >= 300) {
          // 处理报错信息
          msg = getErrorMsg(code)
        } else {
          return res.data
        }
      },
      err => {
        // 结束加载
        this.loading = ''
        err.data = {}
        err.data.msg = `请求异常！`
        return Promise.resolve(err)
      }
    )
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 请求可传参数
      // 单个请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        }).catch(err => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get(config: RequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config: RequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config: RequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config: RequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}
const getErrorMsg = (code: number) => {
  return '错误'
}
export default FRequest
