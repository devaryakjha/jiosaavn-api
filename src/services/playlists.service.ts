import { PayloadService } from './payload.service'
import type { PlaylistRequest, PlaylistResponse } from '../interfaces/playlist.interface'

interface IDetailsById {
  language?: string
}

export class PlaylistsService extends PayloadService {
  constructor() {
    super()
  }

  public detailsById = async (id: string, { language }: IDetailsById): Promise<PlaylistResponse> => {
    // api v4 does not contain media_preview_url

    const response = await this.http<PlaylistRequest>(this.endpoints.playlists.id, true, {
      listid: +id,
      language,
    })
    try {
      const playlistResults = this.playlistPayload(response)

      return playlistResults
    } catch (error) {
      console.error('Failed to parse playlist payload', error, response)
      throw error
    }
  }
}
