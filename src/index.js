const request = require('request-promise')
const base64 = require('node-base64-image')
const querystring = require('querystring')

const uri = 'https://trace.moe/'

/**
 * TraceMoe helper class
 */
class TraceMoe {
  /**
   * It is a collection of functions that are easy to use trace.moe.
   * @param {string} apiKey your trace.moe api key
   */
  constructor (apiKey) {
    if (typeof apiKey === 'string') {
      this.apiKey = apiKey
      this.uri = {
        search: uri + 'api/search?token=' + this.apiKey,
        me: uri + 'api/me?token=' + this.apiKey,
        previewImage: uri + 'thumbnail.php?anilist_id={anilist_id}&file={filename}&t={at}&token={tokenthumb}',
        previewVideo: uri + 'preview.php?anilist_id={anilist_id}&file={filename}&t={at}&token={tokenthumb}'
      }
      this.ready = true
    } else {
      throw Error('apiKey is must string')
    }
  }

  /**
   * This is a function that checks if this class is ready.
   */
  isReady () {
    if (this.ready !== true) {
      throw Error('is not ready')
    }
  }

  /**
   * Find out what animations are based on images.
   * @param {string} image The uri or file path of the image to retrieve.
   */
  search (image) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        if (typeof image !== 'string') {
          reject(Error('image is must string'))
        } else {
          const data = await this.imgEncode(image)

          const formData = querystring.stringify({image: data})

          let response = await request({
            uri: this.uri.search,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': formData.length
            },
            body: formData,
            method: 'POST'
          })
          resolve(JSON.parse(response))
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * You can verify that your API Key is valid.
   */
  me () {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        const response = await request({
          uri: this.uri.me
        })
        resolve(JSON.parse(response))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * An animation preview is received as the url of the image.
   * @param {number} anilistId It is anilist ID of animation to receive preview.
   * @param {string} filename The file name of the animation to receive the preview.
   * @param {number} at Which part of the animation will you get? You can set it here.
   * @param {string} tokenthumb Put the tokenthumb you received in the search results here.
   */
  previewImage (anilistId, filename, at, tokenthumb) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        if (typeof anilistId !== 'number') {
          reject(Error('anilist_id is must string'))
        } else if (typeof filename !== 'string') {
          reject(Error('filename is must string'))
        } else if (typeof at !== 'number') {
          reject(Error('at is must number'))
        } else if (typeof tokenthumb !== 'string') {
          reject(Error('tokenthumb is must string'))
        } else {
          resolve(this.uri.previewImage
            .replace(/{anilist_id}/, encodeURIComponent('' + anilistId))
            .replace(/{filename}/, encodeURIComponent(filename))
            .replace(/{at}/, encodeURIComponent('' + at))
            .replace(/{tokenthumb}/, encodeURIComponent(tokenthumb)))
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * An animation preview is received as the url of the video.
  * @param {number} anilistId It is anilist ID of animation to receive preview.
   * @param {string} filename The file name of the animation to receive the preview.
   * @param {number} at Which part of the animation will you get? You can set it here.
   * @param {string} tokenthumb Put the tokenthumb you received in the search results here.
   */
  previewVideo (anilistId, filename, at, tokenthumb) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        if (typeof anilistId !== 'number') {
          reject(Error('anilist_id is must string'))
        } else if (typeof filename !== 'string') {
          reject(Error('filename is must string'))
        } else if (typeof at !== 'number') {
          reject(Error('at is must number'))
        } else if (typeof tokenthumb !== 'string') {
          reject(Error('tokenthumb is must string'))
        } else {
          resolve(this.uri.previewVideo
            .replace(/{anilist_id}/, encodeURIComponent('' + anilistId))
            .replace(/{filename}/, encodeURIComponent(filename))
            .replace(/{at}/, encodeURIComponent('' + at))
            .replace(/{tokenthumb}/, encodeURIComponent(tokenthumb)))
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Encodes the image to base64.
   * @param {string} image The file path or URL of the image to encode.
   */
  imgEncode (image) {
    return new Promise((resolve, reject) => {
      base64.encode(image, {
        string: true
      },
      (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
}

module.exports = TraceMoe
