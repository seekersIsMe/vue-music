import * as types from './mutations-type'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
//单选歌曲
export const selectPlay=function ({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  //在随机播放模式下，获取点击歌曲在随机列表中的index，并更新state中currentIndex
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
//随机播放
export const randomPlay_ = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const clickSearchSong=function ({commit,state},song) {
  console.log('列表',state.sequenceList)
  let playList=state.playList.slice()
  let sequenceList=state.sequenceList.slice()
  let currentIndex=state.currentIndex;
  let currentSong=playList[currentIndex];
  let index=findIndex(playList,song);
  if(index!==-1){
    // 插入一首歌
    currentIndex=index;
  }else{
    currentIndex++;
    playList.splice(currentIndex,0,song)
  }
  sequenceList.push(song)
  commit(types.SET_PLAYLIST,playList)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
