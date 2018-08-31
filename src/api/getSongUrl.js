import axios from 'axios'
import {commonParams} from './config'

export function getSongUrl(songmid) {
  const url = '/getSongUrl'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    // jsonpCallback: 'MusicJsonCallback',
    loginUin: 0,
    hotUin: 0,
    format: 'json',
    // inCharset: 'utf-8',
    // notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    // callback: 'MusicJsonCallback',
    uin: 0,
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: 3169472464
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
