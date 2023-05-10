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
    this.httpClient = axios.create({
      baseURL: this.baseURL,
      params: {
        _format: 'json',
        _marker: '0',
        ctx: 'web6dot0',
      },
    })
    this.httpClient.interceptors.request.use((value) => {
      value.headers['Content-Type'] = 'application/json'
      return value
    })
  }

  protected async http<T>(
    url: string,
    isVersion4: boolean,
    query: Record<string, string | number | undefined> = {}
  ): Promise<T> {
    const v4 = isVersion4 ? { api_version: 4 } : undefined
    const queryParams = { ...v4, ...query }
    const language = (query['language'] as string | undefined) || 'english'
    const res = await this.httpClient.get<T>('', {
      params: { __call: url, ...queryParams },
      headers: {
        Cookie: `DL=english; L=${encodeURIComponent(language)};`,
      },
    })
    console.error(`get_${url}`, JSON.stringify(res.config))
    return res.data
  }
}
