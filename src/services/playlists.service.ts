import { PayloadService } from './payload.service'
import type { PlaylistRequest } from '../interfaces/playlist.interface'

export class PlaylistsService extends PayloadService {
  constructor() {
    super()
  }

  public detailsById = async (id: string): Promise<PlaylistRequest> => {
    // api v4 does not contain media_preview_url
    const response = await this.http<PlaylistRequest>(this.endpoints.playlists.id, false, {
      listid: id,
    })

    // const playlistResults = this.playlistPayload(response)

    return response
  }
}
