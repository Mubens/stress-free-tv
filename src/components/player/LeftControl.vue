<template>
  <div class="left-control">
    <div class="btn" v-show="!playFlag" @click="playOrPause">
      <svg
        t="1588391432218"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2527"
        width="100%"
        height="100%"
      >
        <path
          d="M859.432421 445.386105C692.682105 330.186105 390.332632 157.722947 218.192842 50.903579 147.617684 5.685895 88.252632 23.848421 82.566737 103.666526c-4.122947 213.827368 0 626.391579 0 843.910737 3.584 81.030737 73.943579 91.728842 135.006316 59.176421l640.323368-393.943579c-1.131789-0.700632 131.233684-74.617263 1.536-167.424z"
          p-id="2528"
          fill="#ffffff"
        />
      </svg>
    </div>
    <div class="btn" v-show="playFlag" @click="playOrPause">
      <svg
        t="1588391817102"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4703"
        width="100%"
        height="100%"
      >
        <path
          d="M735.9 64.9c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V160.7c0-51.1-44.8-95.8-96-95.8z m-447.8 0c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V160.7c-0.1-51.1-44.9-95.8-96-95.8z"
          p-id="4704"
          fill="#ffffff"
        />
      </svg>
    </div>
    <div class="btn">
      <svg
        t="1588392000312"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5084"
        width="90%"
        height="100%"
      >
        <path
          d="M234.496 889.856c134.144-77.824 377.856-219.136 525.824-305.152l-0.512 300.032c0 34.304 27.648 61.952 61.952 62.464 34.304 0 61.952-27.648 62.464-61.952l0.512-372.224c0.512-0.512 1.024-0.512 1.024-0.512s-0.512 0-1.024-0.512l0.512-372.224c0-34.304-27.648-61.952-61.952-62.464-34.304 0-61.952 27.648-62.464 61.952l-0.512 299.52c-133.632-78.336-344.064-201.728-482.304-282.624-53.76-32.768-137.728-71.68-138.24 65.536-0.512 176.64-1.024 468.992-1.024 622.08 1.536 78.848 58.88 64 95.744 46.08z"
          p-id="5085"
          fill="#ffffff"
        />
      </svg>
    </div>
    <!-- 控制时间 -->
    <div class="show-video-time">
      <input
        class="set-v-time"
        type="text"
        v-show="setFlag"
        @keydown.enter="$event.target.blur"
        @blur="setVideoTime"
        ref="setInput"
      />
      <div class="show-v-time" v-show="!setFlag" @click="setVideoTime">
        <span id="currentTime">{{ currentTime | timeFormat }}</span>
        <span>/</span>
        <span id="duration">{{ duration | timeFormat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playFlag", "duration", "currentTime"],
  data() {
    return {
      setFlag: false,
      setTime: 0,
      n: 1
    };
  },
  methods: {
    playOrPause() {
      this.$emit("playAndPause");
    },
    setVideoTime() {
      if (!this.setFlag) {
        this.$refs.setInput.value = this.$options.filters["timeFormat"](
          this.currentTime
        );
        this.setTime = this.currentTime;
        setTimeout(() => {
          this.$refs.setInput.select();
        });
        this.setFlag = true;
      } else {
        let time = this.$refs.setInput.value.split(":");
        if (!time[1]) {
          time = time[0];
        } else {
          time = Math.round(time[0]) * 60 + Math.round(time[1]);
        }
        // console.log(time);
        if (
          Math.ceil(this.setTime) < Math.round(time) ||
          Math.floor(this.setTime) > Math.round(time)
        ) {
          this.$emit("updateProgress", "set", time);
          // console.log(123456);
        }
        this.setFlag = false;
      }
    },
    timeFormatFn(seconds) {
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
  filters: {
    timeFormat(seconds) {
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
  }
};
</script>

<style scoped>
.left-control {
  display: flex;
  padding-left: 5px;
}
.btn {
  width: 20px;
  height: calc(100% - 10px);
  margin: 5px;
  padding: 0 2px;
  line-height: 50px;
  cursor: pointer;

  /* background-color: red; */
}

.show-video-time {
  text-align: center;
  margin-top: 3px;
  color: #ffffff;
  /* background-color: tomato; */
}
.show-v-time {
  position: relative;
  top: 50%;
  height: 22px;
  min-width: 100px;
  transform: translateY(-50%);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
}
.show-v-time span {
  margin: 0 2px;
}
.set-v-time {
  /* position: relative;
  top: 45%;
  transform: translateY(-50%); */
  transform: translateY(25%);
  width: 100px;
  height: 22px;
  text-align: center;
  border: 0;
  outline: none;
  background-color: #343434;
  font-size: 14px;
  color: #edd;
}
</style>