import { PayloadService } from './payload.service'
import type { ModulesRequest, ModulesResponse } from '../interfaces/modules.interface'

export class ModulesService extends PayloadService {
  constructor() {
    super()
  }

  public modules = async (language: string): Promise<ModulesResponse> => {
    const response = await this.http<ModulesRequest>(this.endpoints.modules, true, {
      language,
    })
    try {
      const modulesResult = this.modulesPayload(response)
      return modulesResult
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
