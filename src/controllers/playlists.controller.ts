import { globalConstants } from '../constants'
import { PlaylistsService } from '../services/playlists.service'
import type { PlaylistResponse } from '../interfaces/playlist.interface'
import type { CustomResponse } from '../interfaces/response.interface'
import type { NextFunction, Request, RequestHandler, Response } from 'express'

export class PlaylistsController {
  private playlistsService: PlaylistsService

  constructor() {
    this.playlistsService = new PlaylistsService()
  }

  public playlistDetails: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<PlaylistResponse>>,
    next: NextFunction
  ) => {
    try {
      const { id, language } = req.query

      const result = await this.playlistsService.detailsById(id as string, { language: language as string | undefined })

      res.json({ status: globalConstants.status.success, message: null, data: result })
    } catch (error) {
      next(error)
    }
  }
}
