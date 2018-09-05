var axios = require('axios');
var express = require('express');
var app = express();
var router = express.Router();
var port =9000
//  这里做代理接口请求，一下接口限制了请求的来源
//推荐页面歌单列表
router.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
//获取vkey，拼接 歌曲播放源url
router.get('/getSongUrl', function (req, res) {
  var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
//获取歌词
router.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
//获取歌单列表
router.get('/getDiscSongList', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
//获取搜索列表，qq音乐的这个接口有些问题
router.get('/getSearchList', function (req, res) {
  //以下三个是pc端搜索接口
  // var url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg' //根据关键字获取搜索列表
  // var url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp' //
  // var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' //点击搜索列表中的歌曲，跳转到歌曲详情页面
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp' //移动端qq音乐搜索接口
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/',
      host: 'y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.use('',router)
app.use(express.static('./dist'))
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
