// create download links for different bitrates
export const createDownloadLinks = (link?: string) => {
  if (!link) return []

  const qualities = [
    { id: '_12', bitrate: '12kbps' },
    { id: '_48', bitrate: '48kbps' },
    { id: '_96', bitrate: '96kbps' },
    { id: '_160', bitrate: '160kbps' },
    { id: '_320', bitrate: '320kbps' },
  ]

  const links =
    qualities.map((quality) => ({
      quality: quality.bitrate,
      link: link.replace('preview.saavncdn.com', 'aac.saavncdn.com').replace('_96_p', quality.id),
    })) || []

  return links
}

// create image links for different resolutions
export const createImageLinks = (link = 'http://localhost:3000/audio.jpg') => {
  const qualities = ['50x50', '150x150', '500x500']

  return (
    qualities.map((quality) => ({
      quality,
      link: (link || 'http://localhost:3000/audio.jpg')
        .replace(new RegExp('\\d{1,3}x\\d{1,3}'), quality)
        .replace(new RegExp('\\d{1,3}x\\d{1,3}_\\d{1,3}x\\d{1,3}', 'i'), quality),
    })) || []
  )
}

// sanitize lyrics using sentence case
export const sanitizeLyrics = (lyrics: string) =>
  lyrics
    .replace(/"/gi, "'")
    .replace(/ {2}/gi, ' ')
    .split('<br>')
    .map((text) => {
      const firstLetter = text.slice(0, 1)
      return firstLetter.toUpperCase() + text.slice(1)
    })
    .join(' ')
