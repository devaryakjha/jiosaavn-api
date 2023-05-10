import axios from 'axios'
import { getConfig } from '../configs'
import type { Config } from '../interfaces/config.interface'
import type { Axios } from 'axios'

export class ApiService {
  private httpClient: Axios
  protected config: Config
  private baseURL: Config['baseURL']
  protected endpoints: Config['endpoint']

  constructor() {
    const config = getConfig()
    this.config = config
    this.baseURL = config.baseURL
    this.endpoints = config.endpoint
    const defaultTransformer = axios.defaults.transformRequest
    this.httpClient = axios.create({
      baseURL: this.baseURL,
      params: {
        _format: 'json',
        _marker: '0',
        ctx: 'web6dot0',
      },
      headers: {
        'Content-Type': 'application/json',
        cookie: `L=english; DL=english`,
      },
      transformRequest: [
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // (data, headers) => {
        //   return data
        // },
        ...(!defaultTransformer ? [] : Array.isArray(defaultTransformer) ? defaultTransformer : [defaultTransformer]),
      ],
    })
  }

  protected async http<T>(url: string, isVersion4: boolean, query?: Record<string, string | number>): Promise<T> {
    const v4 = isVersion4 ? { api_version: 4 } : undefined
    const queryParams = { ...v4, ...query }

    const res = await this.httpClient.get<T>('', { params: { __call: url, ...queryParams } })
    return res.data
  }
}
