<template>
  <div class="anime-carousel" @mouseover="stopCricle" @mouseout="startCricle">
    <!-- 核心滚动区 -->
    <ul
      :class="{ animation: animating }"
      :style="{ transform: `translateX(${translateX})` }"
    >
      <li v-for="(item, i) in dataList" :key="i">
        <a :href="item.url">
          <img v-lazy="item.img" />
        </a>
      </li>
    </ul>
    <div class="title">
      <a :class="{ 'fade-in': fadeIn }" :href="url">{{ title }}</a>
    </div>
    <!-- 循环按钮 -->
    <ol>
      <template v-for="(item, i) in dataList">
        <li v-if="i < dataList.length - 1" @click="indexClick(i)" :key="i">
          <img
            v-lazy="item.small_img"
            :class="index % 5 === i ? 'active' : ''"
          />
        </li>
      </template>
    </ol>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前图片索引
      index: 0,
      // 定时器
      timer: null,
      // 每一张图片的停滞时间
      duration: 4000,
      // 动画的持续时间，与 css 保持一致
      animeTime: 300,
      animating: false,
      translateX: 0,
      // 数据
      dataList: [],
      fadeIn: true,
      title: '',
      url: ''
    }
  },
  methods: {
    // 自动循环轮播
    startCricle () {
      this.timer = setInterval(() => {
        // cur 下一张图片的索引
        const cur = this.index + 1
        // 如果 下一张是最后一张（后来手动添加的那一张），那么直接播放最后一张，并立刻回到第一张图片
        if (cur === this.dataList.length - 1) {
          this.translate(() => {
            this.index = 0
            this.translateX = 0
          })
        }

        // 播放下一张图片
        this.index = cur
        this.translate()
      }, this.duration)
    },
    // 停止自动播放
    stopCricle () {
      clearInterval(this.timer)
    },
    // 圆点点击事件
    indexClick (index) {
      this.stopCricle()
      this.index = index
      this.translate()
    },
    // translate 动画效果
    translate (calback) {
      // 改变下方 title 和 url
      this.title = this.dataList[this.index].title
      this.url = this.dataList[this.index].url

      this.fadeIn = false
      this.animating = true
      this.translateX = `${-this.index * (100 / this.dataList.length)}%`

      // 滑动动画完成后要做的事情
      setTimeout(() => {
        this.fadeIn = true
        this.animating = false
        calback && calback()
      }, this.animeTime)
    },
    async getDataList () {
      const res = (await this.$http.get('http://localhost:3000/api/index/hot_carousel')).data
      if (!res.errno) {
        // 复制第一份到最后
        res.data.push(res.data[0])
        this.dataList = res.data

        this.title = this.dataList[0].title
        this.startCricle()
      }
    }
  },
  mounted () {
    this.getDataList()
  },
  beforeDestroy () {
    this.stopCricle()
  }
}
</script>

<style lang="less">
.anime-carousel {
  position: relative;
  width: 100%;
  height: 300px;
  margin: 10px 0;
  border-radius: 4px;
  overflow: hidden;

  @duration: 0.3s;
  .animation {
    transition: transform @duration linear;
  }

  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    );

    a {
      display: inline-block;
      margin-top: 30px;
      margin-left: 10px;
      color: #ffffff;
      opacity: 0;
      transition: all 0.1s;
    }

    a.fade-in {
      opacity: 1;
    }
  }

  ul {
    // position: absolute;
    display: flex;
    width: 100% * 4;
    height: 100%;

    li {
      position: relative;
      // float: left;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  ol {
    position: absolute;
    right: 2%;
    bottom: 2%;
    li {
      float: left;
      width: 60px;
      height: 40px;
      margin: 8px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border: 2px solid #ffeeff;
        border-radius: 2px;
      }
      img.active {
        border-color: #ff6b6b;
      }
    }
  }
}
</style>
