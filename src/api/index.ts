// 案例学习：https://alova.js.org/zh-CN/tutorial/best-practice/manage-apis
import type { AlovaMethodCreateConfig, Method } from 'alova'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'

/**  创建 Alova 实例 */
export const instance = createAlova({
  baseURL: import.meta.env.VITE_ALOVA_BASE_URI,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  timeout: 50000,
  cacheFor: {
    GET: {
      mode: 'restore',
      expire: 1000,
    },
  },
  beforeRequest(method) { // 这里设置请求拦截器
    // 请求头中添加Authorization认证信息
    const curToken = localStorage.getItem('Authorization')
    method.config.headers.Authorization = `Bearer ${curToken}`
  },
  responded: { // 这里设置响应拦截器
    onSuccess: async (response, _method) => {
      if (response.status === 401) {
        // 这里可以做一些操作，例如跳转到登录页
        const router = useRouter()
        setTimeout(() => {
          localStorage.removeItem('Authorization')
          router.push('/login')
        }, 1000)
      }
      if (response.status >= 400)
        throw new Error(response.statusText)

      const json = await response.json()
      if (response.status > 400)
        throw new Error(json.message)

      if (json.code !== 200)
        throw new Error(json.message)

      return json
    },
    onError: (err, _method) => {
      // eslint-disable-next-line no-console
      console.log('响应error:', err.message)
    },
  },
})

/**
 * 封装Alova
 * 统一传参
 */
interface Data {
  [index: string]: unknown
}
type Config = AlovaMethodCreateConfig<any, Data, unknown> | undefined

interface Http {
  get: (
    url: string,
    data?: Data,
    config?: Config
  ) => Method
  post: (
    url: string,
    data?: Data | Array<string>,
    config?: Config,
  ) => Method
  put: (
    url: string,
    data?: Data,
    config?: Config,
  ) => Method
  patch: (
    url: string,
    data?: Data,
    config?: Config,
  ) => Method
  delete: (
    url: string,
    data?: Data,
    config?: Config,
  ) => Method
}

const http: Http = {
  get(url: string, data?: any, config = {}) {
    return instance.Get(url, {
      params: data,
      ...config,
    })
  },
  post(url: any, data: any, config = {}) {
    return instance.Post(url, data, config)
  },
  put(url: any, data: any, config = {}) {
    return instance.Put(url, data, config)
  },
  patch(url: any, data: any, config = {}) {
    return instance.Patch(url, data, config)
  },
  delete(url: any, data: any, config = {}) {
    return instance.Delete(url, {
      data,
      ...config,
    })
  },
}

export default http
