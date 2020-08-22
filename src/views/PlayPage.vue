<template>
  <div id="play-page" class="video-wrap">
    <div class="left-wrap">
      <div class="view-box">
        <div class="if"></div>
      </div>
      <div class="player-wrap" :class="this.mode === 1 ? 'wide-size' : ''">
        <VideoPlayer :mode="mode" :modeChange="modeChange" />
      </div>
      <div class="view-box">
        <div class="if"></div>
      </div>
    </div>
    <div class="right-wrap">1</div>
  </div>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'

export default {
  data () {
    return {
      mode: 0,  // 0: 默认, 1: 宽屏, 2: 网页全屏, 3: 全屏
      lastMode: 0
    }
  },
  methods: {
    modeChange (type) {
      if (this.mode !== type) {
        // 全屏不记录 lastMode
        if (type !== 3) {
          this.lastMode = this.mode
        }
        this.mode = type
      } else {
        this.mode = type === 1 ? 0 : this.lastMode
      }
    }
  },
  watch: {
    // 监听 mode 变化，网页全屏（mode = 2）需要隐藏滚动条
    mode () {
      const doc = document.documentElement || document.body
      if (this.mode === 2) {
        doc.style.overflow = 'hidden'
      } else {
        doc.style.overflow = ''
      }
    }
  },
  components: { VideoPlayer }
}
</script>

<style lang="less">
.video-wrap {
  position: relative;
  top: 0;
  left: 0;
  width: 80%;
  min-width: 1098px;
  max-width: 1512px;
  margin: 0 auto;

  .left-wrap {
    box-sizing: border-box;
    width: 100%;

    & > div {
      box-sizing: border-box;
      padding-right: 350px;
    }
  }

  .right-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
  }

  .player-wrap {
    width: 100%;
  }

  .if {
    width: 100%;
    height: 56px;
    background-color: pink;
  }
}

#play-page {
  .wide-size {
    padding-right: 0;
  }
}
</style>