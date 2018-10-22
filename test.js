const TraceMoe = require('./src/index.js')
const token = 'your token';

(async () => {
  try {
    const api = new TraceMoe(token)

    let data = await api.search('https://i.ytimg.com/vi/scxlo8z36Ls/maxresdefault.jpg')
    // saekano ♭ Ep.0

    console.log(data)
    let video = await api.previewVideo(data.docs[0].anilist_id, data.docs[0].filename, data.docs[0].at, data.docs[0].tokenthumb)
    console.log(video)
  } catch (e) {
    console.error(e)
  }
})()
