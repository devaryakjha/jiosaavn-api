import type { AlbumArtistResponse } from './album.interface'
import type { DownloadLink } from './image.interface'
import type { SongResponse, V4SongRequest } from './song.interface'

export interface PlaylistSearchRequest {
  total: number
  start: number
  results: PlaylistRequest[]
}

export interface PlaylistRequest {
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  perma_url: string
  image: string
  language: string
  year: string
  play_count: string
  explicit_content: string
  list_count: string
  list_type: string
  list: V4SongRequest[]
  more_info: PlaylistRequestMoreInfo
  modules: Modules
}

export interface Modules {
  list: Artists
  relatedPlaylist: Artists
  currentlyTrendingPlaylists: Artists
  artists: Artists
}

export interface Artists {
  source: string
  position: number
  score: string
  bucket: string
  scroll_type: string
  title: string
  subtitle: string
  highlight: string
  simpleHeader: boolean
  noHeader: boolean
  view_more: any[]
  is_JT_module: boolean
  source_api?: boolean
  source_params?: SourceParams
}

export interface SourceParams {
  entity_type?: string
  entity_language?: string
  listid?: string
}

export interface PlaylistRequestMoreInfo {
  uid: string
  is_dolby_content: boolean
  subtype: any[]
  last_updated: string
  username: string
  firstname: string
  lastname: string
  is_followed: string
  isFY: boolean
  follower_count: string
  fan_count: string
  playlist_type: string
  share: string
  sub_types: any[]
  images: any[]
  H2: null
  subheading: null
  video_count: string
  artists: AlbumArtistResponse[]
  subtitle_desc: string[]
}
export interface PlaylistSearchResponse {
  total: number
  start: number
  results: PlaylistResponse[]
}

export interface PlaylistResponse {
  id: string
  userId: string
  name: string
  songCount: string
  fanCount: string
  followerCount: string
  username: string
  firstname: string
  language: string
  lastname: string
  shares: string
  image: DownloadLink
  url: string
  songs: SongResponse[]
}
