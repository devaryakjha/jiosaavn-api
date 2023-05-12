import { cipher, util } from 'node-forge'
const placeHolderThumbnail =
  'https://staticsaavnvaranasi.s3.ap-south-1.amazonaws.com/audio.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCmFwLXNvdXRoLTEiRzBFAiEA%2F%2FQzkkpYIlDZPjhm04Uc96%2F9IofZoWwZICoythH0Qd8CIHhBw4z8E%2F0Kc%2FkTqjPFPZjvTIlep2E6wacsopl2Vm7wKu0CCJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNTg0NTgxNjUzMTExIgyKiI9a9bVIqHm9Pr8qwQKPKqDLKf3zuKABuOxnEkS4VkvNz0bA3HLKKRNSpZWd7XBqDOoYPfPTsCzORAXntzY428b%2F0%2BFdvZj0%2FiWzs7AS7wucj3Mp6qdXX0P%2Bb8Pz7D6jlmcHSJy2SsPyD%2F712LBviWtVvYQzJjDP4oSkY79d64EWvzXbnOHMluqVJKpdb4jpR03syjQ%2BsyyZ2BXnBDxKEjMsEEzHq3ab2cT7irh5jJqyJYYRWwdaq4tT%2B8oTTGxyBbRZmavzQM9d0OBX4SMJ7hBjEnsagsVtwTf507%2FmRzkLhANbgpoO9nBAIPEm7OgsDeLhE0IOcj1m6NFcmYgtVeKZ%2FHo8H2%2FCi0ydFujlUMQAPIy4a1TmT9aYGDRlKDcGU9eKRyp%2BInSwxabgME5PdXjO6YWyRRkBtc3hLmE3AQMhY9dRTSRexZ%2FtvFVTDO4w1dbuogY6swLksQNOxXiqwkp4nOAqqGMqup2hIuXzCmkeeAj%2BGUG2KBak3ciLfNUohF93Fx90OBeQzSBnT0v0N34e91IW9QGXPNWtzc%2BF0Kjea6z7wmdprtKjRd1VFyo5cS%2FVD6zja3pN602hy1qgFwZSjNDbYO7AYhN1UWX749zQx3NRZdrvDqSHyXhL8KSdA8Y7%2BmiTrvcud8%2FS5qoYPIvpeTynwDmw4r6lCA5gZlyfUU2PaIRywK0MA%2BvuNbqs3kRqD9H1VW0lT4nNWxX0SnPmrb%2FkvYl83KAajkZQtoRw%2FWS%2BjaNgfQ8F3j%2ByNdapYKLJRbghB%2F%2Bwj2dpUDGRHCP%2FSA8XmZ2AaKIYRdkQgyYRFO8t%2BUZU30bb61tAH4LLOxf%2FNQYsLiml4OYFxfN5Q%2BE%2FAS0Fdh16sWIE&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230510T144300Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYQG6IEJ323HVXASW%2F20230510%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=f579710de03d466997ee35ff34093f612ae53bbb49426a05d6c4c7262bf1a6bf'
// create download links for different bitrates
export const createDownloadLinks = (encryptedMediaUrl: string) => {
  if (!encryptedMediaUrl) return []

  const qualities = [
    { id: '_12', bitrate: '12kbps' },
    { id: '_48', bitrate: '48kbps' },
    { id: '_96', bitrate: '96kbps' },
    { id: '_160', bitrate: '160kbps' },
    { id: '_320', bitrate: '320kbps' },
  ]

  const key = '38346591'
  const iv = '00000000'

  const encrypted = util.decode64(encryptedMediaUrl)
  const decipher = cipher.createDecipher('DES-ECB', util.createBuffer(key, 'utf8'))

  decipher.start({ iv: util.createBuffer(iv, 'utf8') })
  decipher.update(util.createBuffer(encrypted))
  decipher.finish()

  const decryptedLink = decipher.output.getBytes()

  const links =
    qualities.map((quality) => ({
      quality: quality.bitrate,
      link: decryptedLink.replace('_96', quality.id),
    })) || []

  return links
}

// create image links for different resolutions
export const createImageLinks = (link?: string) => {
  const qualities = ['50x50', '150x150', '500x500']
  if (!link) return qualities.map((quality) => ({ quality, link: placeHolderThumbnail }))

  return (
    qualities.map((quality) => {
      const newlink = new URL(
        link
          .replace(new RegExp('\\d{1,3}x\\d{1,3}'), quality)
          .replace(new RegExp('\\d{1,3}x\\d{1,3}_\\d{1,3}x\\d{1,3}', 'i'), quality)
      )
      newlink.search = ''
      return {
        quality,
        link: newlink.href,
      }
    }) || []
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
