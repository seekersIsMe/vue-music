<template>
  <div class="player" v-show="playlist&&playlist.length>0">
    <transition name="normal">
      <div class="big" v-show="fullScreen">
        <div class="bg">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="header">
          <div class="icon">
            <i class="icon-back" @click="shrink"></i>
          </div>
          <div class="title">
            <p class="name">{{currentSong.name}}</p>
            <p class="singer">{{currentSong.singer}}</p>
          </div>
        </div>
        <div class="middle" @touchstart="middleTouchStart" @touchmove="middleTouchMove" @touchend="middleTouchEnd">
          <div class="middle-cd" ref="cd">
            <div class="cdCircle" :class="cdRotate">
              <img :src="currentSong.image" alt="">
            </div>
            <div class="playingLyric">
              {{playingLyric}}
            </div>
          </div>

          <div class="lyric" v-if="currentLyric" ref="lyric">
            <scroll :data="currentLyric.lines" class="currentLyric" ref="lyricList" :listenScroll="true">
              <div>
                <p v-for="(item,index) in currentLyric.lines" ref="lyricLine" :class="{'active':currentLineNum==index}">
                  {{item.txt}}</p>
              </div>
            </scroll>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':cdShow}"></span>
            <span class="dot" :class="{'active':!cdShow}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <progressBar :progressPercent="progressPercent" @move="move"></progressBar>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>

          <div class="operators">
            <div class="icon i-left">
              <i :class="switchModeIcon" @click.stop.prevent="changeMode"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev" @click.stop.prevent="preSong" :class="disableCls"></i>
            </div>
            <div class="icon i-center">
              <i :class="[playIcon,disableCls]" @click="switchSong"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next" @click.stop.prevent="nextSong" :class="disableCls"></i>
            </div>
            <div class="icon i-right">
              <i :class="favorite?'icon-favorite':'icon-favorite'"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="small" v-show="!fullScreen" @click="popUp">
        <div class="front">
          <img :src="currentSong.image" alt="" class="smallCD" :class="cdRotate">
          <div class="name">
            <p class="songName">{{currentSong.name}}</p>
            <p class="singerName">{{currentSong.singer}}</p>
          </div>

        </div>
        <div class="ctrlBtn">
          <circlePregress :precent="progressPercent">
            <i class="icon-mini" :class="smallPlayIcon" @click.stop.prevent="switchSong"></i>
          </circlePregress>
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="player" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>
<style lang="less">
  @import "../../common/less/const";

  .big {
    &.normal-enter-active, &.normal-leave-active {
      transition: all 1s linear;
      .header, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      }
    }
    &.normal-enter, &.normal-leave-to {
      opacity: 0;
      .header {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
    .bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0.6;
      filter: blur(20px);
      z-index: -1;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .header {
      position: relative;
      margin-bottom: 20px;
      .icon {
        z-index: 10;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: 22px;
          color: #ffcd32;
          transform: rotate(-90deg);
          box-sizing: border-box;
          width: 40px;
          height: 40px;

        }
      }
      .title {
        margin-top: -40px;
        height: 60px;
        z-index: 1;
        text-align: center;
        color: @color-text;
        .name {
          width: 70%;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 40px;
          line-height: 40px;
          white-space: nowrap;
          font-size: @font-size-large;
        }
        .singer {
          line-height: 20px;
          font-size: @font-size-medium;
        }
      }
    }
    .middle {
      position: absolute;
      top: 80px;
      bottom: 150px;
      left: 0;
      right: 0;
      .middle-cd {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 150px;
        z-index: 10;
        .cdCircle {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 150px;
          z-index: 2;
          &.play {
            animation: rotate 10s linear infinite;
          }
          &.pause {
            animation-play-state: paused
          }
          margin-left: 10vw;
          width: 80vw;
          height: 80vw;
          padding: 10px;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 50%;
          background-color: #404040;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .playingLyric {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          height: 20px;
          line-height: 20px;
          height: 20px;
          padding: 0 20px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .lyric {
        transform: translate3d(100%, 0, 0);
        .currentLyric {
          width: 100%;
          height: 100%;
        }
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 150px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        overflow: hidden;
        z-index: 2;
        p {
          &.active {
            color: #fff
          }
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 32px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          &.active {
            width: 20px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.8)
          }
        }

      }
      .progress-wrapper {
        display: flex;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        line-height: 40px;
        align-items: center;
        span {
          display: inline-block;
          color: #fff;
          font-size: 12px;
          line-height: 30px;
          width: 30px;
          flex: 1;
        }
      }
      .operators {
        font-size: 30px;
        color: @color-theme;
        display: flex;
        justify-content: space-between;
        width: 100%;
        div {
          flex: 1;
          text-align: center;
        }
        div:nth-child(1), div:nth-child(2) {
          text-align: right;
        }
        div:nth-child(4), div:nth-child(5) {
          text-align: left;
        }
      }
    }

  }

  .small {
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.5s linear;
    }
    &.mini-enter, &.mini-leave-to {
      transform: translate3d(0, 100px, 0);
    }
    &.mini-enter-to, &.mini-leave {
      transform: translate3d(0, 0, 0);
    }
    position: fixed;
    left: 0;
    height: 60px;
    bottom: 0;
    right: 0;
    display: flex;
    background: #333;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .front {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
      overflow: hidden;
      .smallCD {
        flex: 0 0 40px;
        display: inline-block;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
      .name {
        flex: 1;
        overflow: hidden;
        margin-left: 10px;
        .songName {
          margin-bottom: 2px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
          color: #fff;
        }
        .singerName {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
        }
      }

    }
    .ctrlBtn {
      margin-left: 10px;
      flex: 0 0 80px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: rgba(255, 205, 49, 0.5);
      .icon-mini {
        font-size: 32px;
        position: absolute;
        top: 2px;
        left: 2px;
      }
      .icon-playlist {
        font-size: 30px;
        margin-left: 15px;
      }

    }
  }

  i {
    &.disable {
      color: @color-theme-d
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import {playMode} from 'common/js/config'
  import progressBar from 'base/progressBar/progressBar'
  import circlePregress from 'base/circlePregress/circlePregress'
  import scroll from 'base/scroll/scroll'
  import {shuffle} from 'common/js/util'
  import Lyric from 'lyric-parser'
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform');
  const opacity = prefixStyle('opacity');
  const transitionDuration = prefixStyle('transitionDuration')
  export default {
    data() {
      return {
        favorite: false,
        songReady: false,
        currentTime: 0,
        currentLyric: null,
        cdShow: true,
        playingLyric: '',
        currentLineNum: 0
      }
    },
    created() {
      this.touch = {};
    },
    computed: {
      progressPercent() {
        return this.currentTime / this.currentSong.duration
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      cdRotate() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      smallPlayIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      switchModeIcon() {
        return this.mode === 0 ? 'icon-sequence' : this.mode === 1 ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'playing',
        'fullScreen',
        'playlist',
        'sequenceList',
        'mode',
        'currentIndex',
        'currentSong',
        'favoriteList'
      ])
    },
    methods: {
      middleTouchStart(e) {
        let x = e.touches[0].pageX;
        let y = e.touches[0].pageY;
        this.touch.start = {
          x,
          y
        }
        let middleWidth = this.$refs.cd.clientWidth;
        this.touch.middleWidth = middleWidth;
      },
      middleTouchMove(e) {
        let x = e.touches[0].pageX;
        let y = e.touches[0].pageY;
        let percent;
        let dis = x - this.touch.start.x;
        let disY = y - this.touch.start.y;
        let move;
        if (Math.abs(disY) < Math.abs(dis)) {
          if (this.cdShow === true) {
            if (dis < 0) {
              percent = -dis > this.touch.middleWidth ? 0 : 1 - (-dis / this.touch.middleWidth);
              move = -dis > this.touch.middleWidth ? this.touch.middleWidth : -dis;
              this.cdLyricMove(move, percent, 0)
              this.touch.percent = 1 - percent;
              this.touch.dis = dis;
            } else {
              this.touch.percent = void 0
              this.touch.dis = void 0;
            }
          } else {
            if (dis > 0) {
              percent = dis > this.touch.middleWidth ? 0 : 1 - (dis / this.touch.middleWidth);
              move = dis > this.touch.middleWidth ? this.touch.middleWidth : dis;
              this.cdLyricMove(move, percent, 0);
              this.touch.percent = 1 - percent;
              this.touch.dis = dis;
            } else {
              this.touch.percent = void 0
              this.touch.dis = void 0;
            }
          }
        } else {
          this.touch.percent = void 0
          this.touch.dis = void 0;
        }
      },
      middleTouchEnd(e) {
        //触摸事件结束时，event对象没有touches属性
        let dis = this.touch.dis;
        let percent = this.touch.percent;
        if(dis&&percent){
          if (dis < 0) {
            if (percent >= 0.1) {
              this.cdLyricMove(this.touch.middleWidth, 0, 300)
              this.$refs.lyric.style.zIndex = 10;
              this.$refs.cd.style.zIndex = 2
              this.cdShow = false;
            } else {
              this.cdLyricMove(0, 1, 0)
            }
          }
          if (dis > 0) {
            if (percent >= 0.1) {
              this.cdLyricMove(this.touch.middleWidth, 0, 300);
              this.$refs.lyric.style.zIndex = 2;
              this.$refs.cd.style.zIndex = 10
              this.cdShow = true;
            } else {
              this.cdLyricMove(0, 1, 0)
            }
          }
        }else{
          this.cdLyricMove(0, 1, 0)
        }
      },
      cdLyricMove(move, percent, time) {
        if (this.cdShow) {
          this.$refs.lyric.style[transform] = `translate3d(calc(100% - ${move}px),0,0)`;
          this.$refs.lyric.style[transitionDuration] = `${time}ms`;
          this.$refs.cd.style[opacity] = percent
        } else {
          this.$refs.lyric.style[transform] = `translate3d(${move}px,0,0)`;
          this.$refs.lyric.style[transitionDuration] = `${time}ms`;
          this.$refs.cd.style[opacity] = 1 - percent
        }
      },
      getLyric() {
        this.currentSong.getLyric().then((res) => {
          if (this.currentSong.lyric !== res) {
            return
          }
          this.currentLyric = new Lyric(res, this.lyricHanlder);
          console.log('歌词对象', this.currentLyric)
          if (this.playing) {
            this.currentLyric.play();
          }
        })
      },
      lyricHanlder({lineNum, txt}) {
        this.currentLineNum = lineNum
        this.playingLyric = txt;
        if (lineNum < 5) {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        } else {
          let lyficLine = this.$refs.lyricLine[lineNum];
          this.$refs.lyricList.scrollToElement(lyficLine, 1000)
        }
        console.log('歌词')
        console.log(lineNum)
        console.log(txt)
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.nextSong()
        }
      },
      //bar move 歌曲进度条
      move(percent) {
        this.currentTime = percent * this.currentSong.duration;
        this.$refs.player.currentTime = this.currentTime;
        if (!this.playing) {
          this.switchSong()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(this.currentTime * 1000)
        }
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime;
      },
      error() {
        this.songReady = true;
      },
      ready() {
        this.songReady = true;
      },
      changeMode() {
        if (this.mode > 1) {
          this.setMode(0)
        } else {
          this.setMode(this.mode + 1)
        }
        let list = null;
        if (this.mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList;
        }
        this.resetCurrentIndex(list);
        this.setPlayList(list);
      },
      resetCurrentIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index);
      },
      preSong() {
        if (!this.songReady) {
          return
        }
        const len = this.playlist.length;
        if (this.currentIndex === 0) {
          this.setCurrentIndex(len - 1)
        } else {
          this.setCurrentIndex(this.currentIndex - 1)
        }
        //当播放状态为暂停时，切换歌曲时改变了currentIndex，进而改变currentSong，进而播放歌曲，
        // 但是state里面的playing状态没有更新过来
        if (!this.playing) {
          this.switchSong()
        }
        this.songReady = false;
      },
      nextSong() {
        if (!this.songReady) {
          return
        }
        const len = this.playlist.length;
        if (this.currentIndex === len - 1) {
          this.setCurrentIndex(0)
        } else {
          this.setCurrentIndex(this.currentIndex + 1)
        }
        if (!this.playing) {
          this.switchSong()
        }
        this.songReady = false;
      },
      loop() {
        this.$refs.player.currentTime = 0;
        this.$refs.player.play();
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      switchSong() {
        this.setPlaying(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      shrink() {
        this.setFull(false);
      },
      popUp() {
        this.setFull(true);
      },
      switchFavorite() {

      },
      playStop() {

      },
      playStart() {

      },
      format(time) {
        time = time | 0;
        let min = this._pad(time / 60 | 0);
        let second = this._pad(time % 60)
        return `${min}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num
      },
      ...mapMutations({
        setPlaying: 'SET_PLAYING_STATE',
        setFull: 'SET_FULL_SCREEN',
        setPlayList: 'SET_PLAYLIST',
        setMode: 'SET_PLAY_MODE',
        setFavorite: 'SET_FAVORITE_LIST',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      //媒体播放时要等，audio加载完，解决方法是$nextTick回调里面调用
      //Uncaught (in promise) DOMException: The play() request was interrupted by a new load request
      //
      currentSong(newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$nextTick(()=>{
            this.$refs.player.play()
            this.getLyric()
          })
        }, 1000)
      },
      playing() {
        this.$nextTick(() => {
          if (this.playing) {
            this.$refs.player.play()
          } else {
            console.log('暂停')
            this.$refs.player.pause()
          }
        })
      }
    },
    components: {
      progressBar,
      circlePregress,
      scroll
    }
  }
</script>
