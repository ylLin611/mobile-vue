import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { configType, interceptorsType } from './type'
import { useCommonStore } from '@/stores/common'
import { Toast } from 'vant'

const store = useCommonStore()
class FiveReauest {
  private instance: AxiosInstance
  private interceptors?: interceptorsType
  private showLoading?: boolean
  private DEFAULT_LOADING = true

  constructor(config: configType) {
    // 创建 axios 实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.DEFAULT_LOADING = this.showLoading =
      config.showLoading ?? this.DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 设置请求实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 配置所有实例的 request 拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 加载弹框
        store.updateLoading(true)
        return config
      },
      (err) => {
        return err
      }
    )
    // 配置所有实例的 response 拦截器
    this.instance.interceptors.response.use(
      (res) => {
        store.updateLoading(false)
        return res
      },
      (err) => {
        store.updateLoading(false)
        throw err
      }
    )
  }
  // 发送请求，并且配置单独请求的拦截器
  request<T = any>(config: configType): Promise<T> {
    return new Promise((resolve, reject) => {
      // request 拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading !== undefined) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request(config)
        .then((res) => {
          // response 拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = this.DEFAULT_LOADING
          if (res.data.code == '200') {
            Toast('成功')
          } else {
            // 返回结果
            resolve(res.data.payload)
          }
        })
        .catch((err) => {
          this.showLoading = this.DEFAULT_LOADING
          reject(err)
          console.log(`【请求失败】${err}`)
          return err
        })
    })
  }
  get<T = any>(config: configType): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: configType): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: configType): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: configType): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default FiveReauest
