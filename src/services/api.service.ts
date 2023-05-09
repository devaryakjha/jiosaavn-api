import got from 'got-cjs'
import { getConfig } from '../configs'
import type { Got } from 'got-cjs'
import type { Config } from '../interfaces/config.interface'

export class ApiService {
  private httpClient: Got
  protected config: Config
  private baseURL: Config['baseURL']
  protected endpoints: Config['endpoint']

  constructor() {
    const config = getConfig()
    this.config = config
    this.baseURL = config.baseURL
    this.endpoints = config.endpoint

    this.httpClient = got.extend({
      prefixUrl: this.baseURL,
      searchParams: new URLSearchParams([
        ['_format', 'json'],
        ['_marker', '0'],
        ['ctx', 'web6dot0'],
      ]),
      responseType: 'json',
      headers: {
        cookie: 'L=english; gdpr_acceptance=true; DL=english',
      },
      hooks: {
        beforeRequest: [
          (options) => {
            // set default language in cookie
            const languageHeader = (options.searchParams as URLSearchParams).get('language') || 'english'

            options.headers = {
              cookie: `L=${encodeURIComponent(languageHeader)}; gdpr_acceptance=true; DL=english`,
            }
          },
        ],
      },
    })
  }

  protected http<T>(url: string, isVersion4: boolean, query?: Record<string, string | number>): Promise<T> {
    const v4 = isVersion4 ? { api_version: 4 } : undefined
    const queryParams = { ...v4, ...query }

    return this.httpClient<T>({ searchParams: { __call: url, ...queryParams } }).json()
  }
}
