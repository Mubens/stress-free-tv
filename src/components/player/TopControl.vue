<template>
  <div class="top-control" @mousedown="enableProgressDrag">
    <div class="video-progress" ref="max">
      <span class="buffer-bar" :style="{ width: videoBuffer + '%' }"></span>
      <span class="time-bar" :style="{ width: percent + '%' }"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["percent", "videoBuffer"],
  data () {
    return {
      progressDrag: false //拖拽状态标志
    };
  },
  methods: {
    enableProgressDrag: function (e) {
      this.progressDrag = true;
      let maxX = this.$refs.max.offsetWidth;
      let movX = e.offsetX;
      if (movX < 0) {
        movX = 0;
      }
      if (movX > maxX) {
        movX = maxX;
      }
      this.$emit("updateProgress", "drag", movX / maxX);
    }
  },
  mounted () {
    document.addEventListener("mousemove", e => {
      if (this.progressDrag) {
        this.enableProgressDrag(e);
        // console.log("移动");
      }
    });
    document.addEventListener("mouseup", () => {
      if (this.progressDrag) {
        this.progressDrag = false;
        // console.log("离开");
      }
    });
  }
};
</script>

<style scoped>
.top-control {
  position: relative;
  top: 0;
  left: 50%;
  width: 98.4%;
  height: 10px;
  transform: translateX(-50%);
  cursor: pointer;
}
.top-control:hover .video-progress {
  height: 4px;
}
.video-progress {
  position: relative;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  transform: translateY(-50%);
  background-color: #7c7d824d;
}
.buffer-bar {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 5px;
  z-index: 3;
  background-color: #7c7c7c;
}
.time-bar {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 5px;
  z-index: 3;
  background-color: #23ade5;
}
.top-control .time-bar::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  /* background: url(../../assets/bilibili.png) no-repeat; */
  background-size: cover;
  transition: all ease 0.5s;
}
.top-control:hover .time-bar::after {
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  /* background-color: tomato; */
}
</style>