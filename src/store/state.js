import {playMode} from 'common/js/config'
import {loadFavorite} from 'common/js/cache'
const state={
  singer: {},
  playStart:false,
  isFull:false,//播放器是否全屏
  mode:playMode.sequence,//播放模式
  playList:[],//当前播放列表
  sequenceList:[],//顺序播放列表，原始列表
  currentIndex: -1,//播放歌曲在当前列表中的index索引，
  favoriteList: loadFavorite(),
  disc:{},
  topList:{}
}
export default state
