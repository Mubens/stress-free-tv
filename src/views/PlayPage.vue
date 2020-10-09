<template>
  <div
    class="play-wrapper"
    :style="{ width: width + 'px' }"
    v-if="playData && width"
  >
    <div class="play-wrapper-left">
      <div
        class="player-container"
        :style="{ height: playerHeight + 'px' }"
        :class="{ 'wide-size': mode === 1 }"
        ref="container"
      >
        <!-- 视频播放器组件 -->
        <video-player
          :mode="mode"
          :setScreenMode="setScreenMode"
          :videoSource="videoSource"
          :current="getEpIndex"
          :total="episodeList.length - 1"
          @setEpisode="setEpisode"
          @sendDanmuku="sendDanmuku"
          :danmuList="danmuList"
        />
      </div>
      <!-- 视频简介组件 -->
      <video-info :playData="playData" />
      <!-- 评论列表组件 -->
      <comment-list />
    </div>
    <div class="play-wrapper-right">
      <div
        class="left-box"
        :style="{ 'margin-top': `${mode === 1 ? playerHeight + 15 : 5}px` }"
      >
        <!-- 弹幕列表组件 -->
        <danmu-list :danmuList="danmuList" />
        <!-- 选集列表组件 -->
        <episode-list
          :currentEp="videoSource.ep"
          :episodeList="episodeList"
          @setEpisode="setEpisode"
          ref="eplist"
        />
      </div>
    </div>
  </div>
  <!-- 404 -->
  <not-found v-else-if="!playData && width" />
</template>

<script>
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import CommentList from '../components/PlayPage/CommentList'
import VideoInfo from '../components/PlayPage/VideoInfo'
import DanmuList from '../components/PlayPage/DanmuList'
import EpisodeList from '../components/PlayPage/EpisodeList'



export default {
  data () {
    return {
      // 播放器尺寸模式 0: 默认, 1: 宽屏, 2: 网页全屏, 3: 全屏
      mode: 0,
      // play-wrapper 宽度
      minWidth: 980,
      maxWidth: 1488,
      width: 0,
      // 上一次的模式
      lastMode: 0,
      // 播放器的高度
      playerHeight: 0,
      // 弹幕列表
      danmuList: [],
      // 当前视频资源
      videoSource: {},
      // 选集列表
      episodeList: [],
      // 番剧信息
      playData: null,
      // resize 防抖
      timer: null
    }
  },
  methods: {
    /* 播放器尺寸模式切换 */
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
    /* 获取播放器的尺寸 */
    getSize () {
      let width = document.body.clientWidth * 0.8
      if (width < this.minWidth) {
        width = this.minWidth
      } else if (width > this.maxWidth) {
        width = this.maxWidth
      }
      // console.log(123)
      this.width = width
      this.playerHeight = this.mode === 1 ? width * 0.59 : (width - 320) * 0.59
    },
    /* window resize */
    resize () {
      if (this.mode === 1 || this.mode === 0) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getSize()
        }, 200);
      }
    },
    /* 获取视频集数 */
    getEpisodeData () {
      this.$http.get(`http://localhost:3000/api/play/list?pId=${this.$route.params.id}`).then((res) => {
        if (!res.data.errno) {
          this.playData = res.data.data.play
          this.episodeList = res.data.data.eps
          this.success = true
          this.redirect()
        } else {
          this.success = false
        }
      })
    },
    /* 选集重定向 */
    redirect () {
      if (this.episodeList.length) {
        // 查找有没有那一集
        const exit = this.episodeList.find((item) => item.ep === +this.$route.query.ep)
        // console.log(exit)
        // 如果没有重定向到第一集
        if (exit == null) {
          this.$router.push({ query: { ep: this.episodeList[0].ep } })
          this.videoSource = this.episodeList[0]
        } else {
          this.videoSource = exit
        }

        document.title = `正在播放：${this.playData.title} 第${this.videoSource.ep}话`
        this.getDanmaku(this.videoSource.id)
        this.$refs.eplist?.scrollToY(this.getEpIndex)
      }
    },
    /* 选集 */
    setEpisode (ep, isNext) {
      if (!isNext) {
        this.videoSource = this.episodeList.find((item) => item.ep === ep)
      } else {
        const episode = this.episodeList[this.getEpIndex + 1]
        this.videoSource = episode
        ep = episode.ep
      }
      this.$router.push({ query: { ep } })
      document.title = `正在播放：${this.playData.title} 第${this.videoSource.ep}话`
      this.getDanmaku(this.videoSource.id)
      this.$refs.eplist.scrollToY(this.getEpIndex)
    },
    /* 获取弹幕 */
    getDanmaku (vId) {
      const route = this.$route
      // console.log(route.params.id, route.query.ep)
      this.$http.get(`http://localhost:3000/api/danmaku/list?vId=${vId}`).then((res) => {
        if (res.data) {
          this.danmuList = res.data.data
        }
      })
    },
    /* 发送弹幕 */
    sendDanmuku (type, style, content, vtime) {
      axios
        .post('http://localhost:3000/api/danmaku/new', {
          type,
          style,
          content,
          vtime,
          uId: this.$store.user_id, // session
          vId: this.videoSource.id,
          token: this.$store.state.token
        })
        .then((res) => {
          if (res.status === 200 && !res.data.errno) {
            const data = res.data.data[0]
            data.isCurr = true
            this.danmuList.push(data)
          }
        })
    }
  },
  computed: {
    /* 获取当前集的索引 */
    getEpIndex () {
      let index = this.episodeList.length
      if (index) {
        while (index--) {
          if (this.episodeList[index].ep === this.videoSource.ep) return index
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
      if (this.mode === 1 || this.mode === 0) {
        this.getSize()
      }
    }
  },
  mounted () {
    // 获取视频集数
    this.getEpisodeData()

    // 获取播放器高度
    this.getSize()

    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  components: {
    'video-player': VideoPlayer,
    'comment-list': CommentList,
    'video-info': VideoInfo,
    'danmu-list': DanmuList,
    'episode-list': EpisodeList,
    'not-found': () => import('../components/NotFound')
  }
}
</script>

<style lang="less">
.play-wrapper {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  margin: 10px auto;

  .play-wrapper-left {
    flex: 1;
  }
  .play-wrapper-right {
    flex: 0 0 320px;
    padding-left: 30px;
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
    margin: 5px 0;

    &.wide-size {
      width: calc(100% + 350px);
    }
  }
}
</style>
