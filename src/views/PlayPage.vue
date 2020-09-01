<template>
  <div class="play-wrapper clearfix">
    <div class="play-wrapper-left">
      <!-- <div class="player-box margin" :style="{ height: `${containerHeight + 10}px` }"> -->
      <div class="player-container margin" :class="{ 'wide-size': mode === 1 }" ref="container">
        <VideoPlayer :mode="mode" :modeChange="modeChange" :danmuList="danmuList" />
      </div>
      <!-- </div> -->
      <div class="video-info"></div>
      <!-- 评论 -->
      <CommentList />
    </div>
    <div class="play-wrapper-right">
      <div class="left-box" :style="{ 'margin-top': `${mode === 1 ? containerHeight + 15 : 5}px` }">
        <!-- 弹幕 -->
        <DanmuList :danmuList="danmuList" />
        <!-- 选集 -->
        <EpisodeList />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import DanmuList from '../components/PlayPage/DanmuList'
import EpisodeList from '../components/PlayPage/EpisodeList'
import CommentList from '../components/PlayPage/CommentList'

import axios from 'axios'

export default {
  data() {
    return {
      mode: 0, // 0: 默认, 1: 宽屏, 2: 网页全屏, 3: 全屏
      lastMode: 0,
      containerHeight: 0,
      danmuList: []
    }
  },
  methods: {
    modeChange(type) {
      if (this.mode !== type) {
        // 全屏不记录 lastMode
        if (!(this.mode === 2 && type === 3)) {
          this.lastMode = this.mode
        }
        this.mode = type
      } else {
        this.mode = type === 1 ? 0 : this.lastMode
      }
    },
    /* 获取播放器高度 */
    watchContainer() {
      if (this.mode === 1 || this.mode === 0) {
        const container = this.$refs.container.getBoundingClientRect()
        this.containerHeight = container.height
      }
    }
  },
  watch: {
    // 监听 mode 变化，网页全屏（mode = 2）需要隐藏滚动条
    mode() {
      const doc = document.documentElement || document.body
      if (this.mode === 2) {
        doc.style.overflow = 'hidden'
      } else {
        doc.style.overflow = 'auto'
      }

      setTimeout(() => {
        this.watchContainer()
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.watchContainer()
    })
    window.addEventListener('resize', this.watchContainer)
    axios.get(`http://localhost:3000/api/danmaku?vId=${23}&ep=${1}`).then((res) => {
      if (res.data) {
        this.danmuList = res.data.data
      }
      // console.log(res)
    })

    // console.log(this.$route)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.watchContainer)
  },
  components: {
    VideoPlayer,
    CommentList,
    DanmuList,
    EpisodeList
  }
}
</script>

<style lang="less">
.play-wrapper {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 80%;
  min-width: 1098px;
  max-width: 1512px;
  margin: 10px auto;

  .play-wrapper-left {
    flex: 1;
    // float: left;
    // width: calc(100% - 350px);
  }
  .play-wrapper-right {
    flex: 0 0 320px;
    padding-left: 30px;
    // float: right;
    // width: 320px;
  }

  .player-box {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }

  .player-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    &.wide-size {
      width: calc(100% + 350px);
    }
  }

  .margin {
    margin: 5px 0;
  }
}

.video-info {
  width: 100%;
  height: 200px;
}
</style>
