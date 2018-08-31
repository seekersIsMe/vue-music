//歌曲接口
import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log('测试promise',typeof Promise)
    return Promise.resolve(res.data)
  })
}
