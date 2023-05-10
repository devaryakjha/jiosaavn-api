import type { AlbumArtistResponse } from './album.interface'
import type { DownloadLink } from './image.interface'

export interface SongSearchRequest {
  total: number
  start: number
  results: SongRequest[]
}

export interface SongRequest {
  id: string
  type: string
  song: string
  album: string
  year: string
  music: string
  music_id: string
  primary_artists: string
  primary_artists_id: string
  featured_artists: string
  featured_artists_id: string
  singers: string
  starring: string
  image: string
  label: string
  albumid: string
  language: string
  origin: string
  play_count: string
  copyright_text: string
  '320kbps': string
  is_dolby_content: boolean
  explicit_content: string
  has_lyrics: string
  lyrics_snippet: string
  encrypted_media_url: string
  encrypted_media_path: boolean
  media_preview_url?: string
  perma_url: string
  album_url: string
  duration: string
  artistMap: Record<string, string>
  rights: {
    code: number
    reason: string
    cacheable: boolean
    delete_cached_object: boolean
  }
  webp?: boolean
  cache_state: string
  starred: string
  release_date: any
  vcode?: string
  vlink?: string
  triller_available: boolean
  label_url: string
}

export interface SongSearchResponse {
  total: number
  start: number
  results: SongResponse[]
}

export interface SongResponse {
  id: string
  name: string
  type: string
  album: {
    id: string
    name: string
    url: string
  }
  year: string
  releaseDate: string
  duration: string
  label: string
  primaryArtists: string | AlbumArtistResponse[]
  primaryArtistsId: string
  featuredArtists: string | AlbumArtistResponse[]
  featuredArtistsId: string
  explicitContent: string
  playCount: string
  language: string
  hasLyrics: string
  url: string
  copyright: string
  image: DownloadLink
  downloadUrl: DownloadLink
}

export interface V4SongRequest {
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
  list: string
  more_info: ListMoreInfo
}

export interface ListMoreInfo {
  music: string
  album_id: string
  album: string
  label: string
  origin: string
  is_dolby_content: boolean
  '320kbps': string
  encrypted_media_url: string
  encrypted_cache_url: string
  album_url: string
  duration: string
  rights: Rights
  cache_state: string
  has_lyrics: string
  lyrics_snippet: string
  starred: string
  copyright_text: string
  artistMap: ArtistMap
  release_date: string
  label_url: string
  triller_available: boolean
  is_ringtone_available: boolean
  request_jiotune_flag: boolean
  webp: string
  vcode?: string
  vlink?: string
  lyrics_id?: string
}

export interface ArtistMap {
  primary_artists: AlbumArtistResponse[]
  featured_artists: AlbumArtistResponse[]
  artists: AlbumArtistResponse[]
}

export interface Rights {
  code: string
  cacheable: string
  delete_cached_object: string
  reason: string
}
