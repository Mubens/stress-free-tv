<template>
  <div
    class="video-player-wrapper"
    @mousemove="showTitleAndControl"
    @mouseleave="showTitleAndControl(true)"
    @keydown.prevent="onKeyDown"
    onselectstart="return false"
    ontouchstart="return false;"
    tabindex="1"
  >
    <!-- 视频 -->
    <video id="video" ref="video" @timeupdate="timeupdate" @mousedown="onKeyDown({keyCode:32})">
      <source :src="videoSrc" type="video/mp4" />
    </video>
    <!-- 标题 -->
    <div class="video-title" @mouseenter="isShow = true" @mouseleave="isShow = false" ref="title">
      <span>第04话 入学篇Ⅳ</span>
    </div>
    <!-- 下方控件 -->
    <div
      class="video-bottom-conrtrol"
      @mouseenter="isShow = true"
      @mouseleave="isShow = false"
      ref="control"
    >
      <!-- 上组件 -->
      <top-control :percent="percent" :videoBuffer="videoBuffer" @updateProgress="updateProgress" />
      <div class="bottom-control">
        <!-- 左组件 -->
        <left-control
          class="left-control"
          :playFlag="playFlag"
          @playAndPause="playAndPause"
          @updateProgress="updateProgress"
          :duration="duration"
          :currentTime="currentTime"
        />
        <!-- 右组件 -->
        <right-control
          class="right-control"
          :size="size"
          @volumeChange="volumeChange"
          :wideScreen="wideScreen"
          :fullScreen="fullScreen"
          :pageFullScreen="pageFullScreen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TopControl from "./TopControl";
import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
export default {
  props: ["videoSrc", "size", "wideScreen", "pageFullScreen", "fullScreen"],
  data () {
    return {
      isShow: false,
      timer: null,
      playFlag: false,
      currentTime: 0,
      duration: 0,
      percent: 0,
      videoBuffer: 0
    };
  },
  methods: {
    // 暂停与播放
    playAndPause: function () {
      if (this.$refs.video.paused || this.$refs.video.ended) {
        this.$refs.video.play();
        this.playFlag = true;
      } else {
        this.$refs.video.pause();
        this.playFlag = false;
      }
    },
    // 进度条跟随
    timeupdate: function () {
      this.currentTime = this.$refs.video.currentTime;
      this.percent = (100 * this.currentTime) / this.duration;
      if (this.$refs.video.ended) {
        this.playFlag = false;
      }
    },
    // 更新进度条
    updateProgress: function (type, val) {
      this.$refs.video.play();
      this.playFlag = true;
      if (type === "drag") {
        this.$refs.video.currentTime = this.duration * val;
        this.timeupdate();
      } else if (type === "set") {
        this.$refs.video.currentTime = val;
      } else if (type === "forward") {
        this.$refs.video.currentTime += val;
      } else if (type === "back") {
        this.$refs.video.currentTime -= val;
      }
    },
    // 音量调节
    volumeChange: function (val) {
      if (val === 0) {
        this.$refs.video.muted = true;
      } else {
        this.$refs.video.muted = false;
        this.$refs.video.volume = val / 100;
      }
      // console.log(val);
    },
    // 标题与控制器显示
    showTitleAndControl: function (display) {
      display && display === true ? (this.isShow = false) : "";

      this.$refs.title.classList.add("show");
      this.$refs.control.classList.add("show");

      if (this.currentTime !== 0) {
        clearTimeout(this.timer);
        if (!this.isShow) {
          this.timer = setTimeout(() => {
            this.$refs.title.classList.remove("show");
            this.$refs.control.classList.remove("show");
          }, 500);
        }
      }
    },
    // 视频缓存
    getBuffered () {
      const myAudio = this.$refs.video;
      let buffered = myAudio.buffered
      if (buffered.length) {
        // 渲染缓冲条的样式

        for (var i = 0; i < buffered.length; i++) {
          // 寻找当前时间之后最近的点
          if (buffered.start(buffered.length - 1 - i) < video.currentTime) {
            let bufferedLength = (buffered.end(buffered.length - 1 - i) / myAudio.duration) * 100;
            console.log(bufferedLength)
            this.videoBuffer = bufferedLength;
            break;
          }
        }
      }

      setTimeout(this.getBuffered, 100);
    },
    // 播放器键盘事件
    onKeyDown (e) {
      // console.log(e);
      switch (e.keyCode) {
        case 32: // space
          this.playAndPause();
          break;
        case 37: // <-
          this.updateProgress("back", 5);
          break;
        case 39: // ->
          this.updateProgress("forward", 5);
          break;
        default:
          break;
      }
    }
  },
  computed: {},
  filters: {
    // 格式化时间
    timeFormat: function (seconds) {
      var minite = Math.floor(seconds / 60);
      if (minite < 10) {
        minite = "0" + minite;
      }
      var second = Math.floor(seconds % 60);
      if (second < 10) {
        second = "0" + second;
      }
      return minite + ":" + second;
    }
  },
  mounted () {
    this.$refs.title.classList.add("show");
    this.$refs.control.classList.add("show");
    this.volumeChange(100);
    this.$refs.video.addEventListener("canplaythrough", () => {
      this.duration = this.$refs.video.duration;
      this.$refs.video.addEventListener("timeupdate", () => {
        this.timeupdate();
      });
    });
    this.getBuffered();
  },
  components: {
    TopControl,
    LeftControl,
    RightControl
  }
};
</script>

<style scoped>
[tabindex] {
  outline: none;
}
.video-player-wrapper {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  overflow: hidden;
}
video {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  cursor: pointer;
}
.video-title {
  position: absolute;
  /* top: -40px; */
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  color: #fff;
  background: linear-gradient(
    rgba(0, 0, 0, 0.667),
    hsla(0, 0%, 0%, 0.267),
    hsla(0, 0%, 0%, 0)
  );
  opacity: 0;
  transition: all ease 0.5s;
}
.video-title span {
  padding-left: 20px;
  line-height: 40px;
}

.video-bottom-conrtrol {
  position: absolute;
  left: 0;
  /* bottom: -44px; */
  bottom: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0)
  );
  opacity: 0;
  transition: all ease 0.5s;
}
.bottom-control {
  width: 100%;
  height: calc(100% - 10px);
}
.left-control {
  float: left;
  height: 100%;
}
.right-control {
  float: right;
  height: 100%;
}
.video-title.show {
  /* top: 0; */
  opacity: 1;
}
.video-bottom-conrtrol.show {
  /* bottom: 0; */
  opacity: 1;
}
</style>