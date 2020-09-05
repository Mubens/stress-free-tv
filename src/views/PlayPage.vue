<template>
  <div class="play-wrapper">
    <div class="play-wrapper-left">
      <div class="player-container margin5" :class="{ 'wide-size': mode === 1 }" ref="container">
        <!-- 播放器组件 -->
        <VideoPlayer
          :mode="mode"
          :setScreenMode="setScreenMode"
          :videoSource="videoSource"
          :current="getEpIndex"
          :total="episodeData.length - 1"
          @setEpisode="setEpisode"
          :danmuData="danmuData"
        />
      </div>
      <!-- 视频简介组件 -->
      <div class="video-info"></div>
      <!-- 评论组件 -->
      <CommentList />
    </div>
    <div class="play-wrapper-right">
      <div class="left-box" :style="{ 'margin-top': `${mode === 1 ? containerHeight + 15 : 5}px` }">
        <!-- 弹幕组件 -->
        <DanmuList :danmuData="danmuData" />
        <!-- 选集组件 -->
        <EpisodeList
          :currentEp="videoSource.ep"
          :episodeData="episodeData"
          @setEpisode="setEpisode"
          ref="epComp"
        />
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
  data () {
    return {
      mode: 0, // 0: 默认, 1: 宽屏, 2: 网页全屏, 3: 全屏
      lastMode: 0,
      containerHeight: 0,
      danmuData: [],
      videoSource: {},
      episodeData: []
    }
  },
  methods: {
    /* 屏幕大小模式切换 */
    setScreenMode (type) {
      if (this.mode !== type) {
        // 网页全屏 -> 全屏 不记录 lastMode
        if (!(this.mode === 2 && type === 3)) {
          this.lastMode = this.mode
        }
        // console.log(type)
        this.mode = type
      } else {
        // 如果是 宽屏 -> 宽屏 => 默认
        this.mode = type === 1 ? 0 : this.lastMode
      }
    },
    /* 监听播放器高度 */
    getContainerHeight () {
      // 默认和宽屏才记录
      if (this.mode === 1 || this.mode === 0) {
        const container = this.$refs.container.getBoundingClientRect()
        this.containerHeight = container.height
      }
    },
    /* 获取视频集数 */
    getEpisodeData () {
      axios.get(`http://localhost:3000/api/play?vId=${this.$route.params.id}`).then(res => {
        if (!res.data.errno) {
          this.episodeData = res.data.data
          this.redirect()
          this.getDanmaku()
        } else {
          // 没有该视频资源返回 404 页面 
          this.$router.push({ name: '404' })
        }
      })
    },
    /* 选集重定向 */
    redirect () {
      if (this.episodeData.length) {
        // 有没有 query 中打那一集
        const exit = this.episodeData.find(item => item.ep === +this.$route.query.ep)
        // console.log(exit)
        /* 如果没有重定向到第一集 */
        if (exit == null) {
          const params = { query: { ep: this.episodeData[0].ep } }
          this.$router.push(params)
        } else {
          this.videoSource = exit
        }
        this.$refs.epComp.scrollToY(this.getEpIndex)
      }
    },
    /* 选集 */
    setEpisode (ep, isNext) {
      if (!isNext) {
        this.videoSource = this.episodeData.find(item => item.ep === ep)
      } else {
        const episode = this.episodeData[this.getEpIndex + 1]
        this.videoSource = episode
        ep = episode.ep
      }
      this.$router.push({ query: { ep } })
    },
    /* 获取弹幕 */
    getDanmaku () {
      const route = this.$route
      // console.log(route.params.id, route.query.ep)
      axios.get(`http://localhost:3000/api/danmaku?vId=${route.params.id}&ep=${route.query.ep}`).then((res) => {
        if (res.data) {
          this.danmuData = res.data.data
        }
      })
    }
  },
  computed: {
    /* 获取当前集的索引 */
    getEpIndex () {
      let index = this.episodeData.length
      if (index) {
        while (index--) {
          if (this.episodeData[index].ep === this.videoSource.ep) return index
        }
      }
      return -1
    }
  },
  watch: {
    // 监听 mode 变化，网页全屏（mode = 2）需要隐藏滚动条
    mode () {
      const doc = document.documentElement || document.body
      if (this.mode === 2) {
        doc.style.overflow = 'hidden'
      } else {
        doc.style.overflow = 'auto'
      }

      // 获取播放器高度
      setTimeout(() => {
        this.getContainerHeight()
      })
    }
  },
  mounted () {
    // 获取视频集数
    this.getEpisodeData()

    // 获取播放器高度
    setTimeout(() => {
      this.getContainerHeight()
    })
    window.addEventListener('resize', this.getContainerHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getContainerHeight)
  },
  components: {
    VideoPlayer: () => import('../components/VideoPlayer/VideoPlayer'),
    CommentList: () => import('../components/PlayPage/CommentList'),
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

  .margin5 {
    margin: 5px 0;
  }
}

.video-info {
  width: 100%;
  height: 200px;
}
</style>
