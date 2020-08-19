<template>
  <div class="carousel" @mouseover="stopCricle" @mouseout="startCricle">
    <ul ref="ul">
      <!-- :style="`transform: translateX(${translate()}px);`" class="animation" -->
      <li v-for="(item, index) in datalist" :key="index">
        <a :href="item.url" target="_blank">
          <img class="slider-img" :src="item.img" />
          <span class="slider-title">{{ item.title }}</span>
        </a>
      </li>
    </ul>
    <ol>
      <li
        :class="current % 5 === i - 1 ? 'current' : ''"
        v-for="i in datalist.length - 1"
        :key="i"
        @click="indexClick(i - 1)"
      ></li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    datalist: Array
  },
  data () {
    return {
      current: 0, // 当前图片索引
      timer: null, // 定时器
      width: 560, // 轮播图的宽度
      durtion: 3000, // 每一张图片的停滞时间
      animeTime: 400 // 动画的持续时间，与 css 保持一致
    }
  },
  methods: {
    // 自动循环轮播
    startCricle () {
      this.timer = setInterval(() => {
        // cur 下一张图片的索引
        let cur = this.current + 1
        // 如果 下一张是最后一张（后来手动添加的那一张），那么直接播放最后一张，并立刻回到第一张图片
        if (cur === this.datalist.length - 1) {
          this.translate(() => {
            this.current = 0
            this.$refs.ul.style.transform = `translateX(-0)`
          })
        }
        // 播放下一张图片
        this.current = cur
        this.translate()
      }, this.durtion)
    },
    // 停止自动播放
    stopCricle () {
      clearInterval(this.timer)
    },
    // 圆点点击事件
    indexClick (index) {
      this.stopCricle()
      this.current = index
      this.translate()
    },
    // translate 动画效果
    translate (calback) {
      const ul = this.$refs.ul
      ul.classList.add('animation')
      ul.style.transform = `translateX(${-this.current * this.width}px)`

      // 滑动动画完成后要做的事情
      let timer = setTimeout(() => {
        ul.classList.remove('animation')
        calback && calback()
        clearTimeout(timer)
      }, this.animeTime)
    }
  },
  mounted () {
    this.startCricle()
  },
  beforeDestroy () {
    this.stopCricle()
  }
}
</script>

<style lang="less">
.carousel {
  @imgWidth: 560px;
  @imgCount: 5;
  @duration: 0.4s;

  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;

  .animation {
    transition: transform @duration linear;
  }
  ul {
    display: flex;
    width: @imgWidth * (@imgCount + 1);
    height: 100%;

    li {
      position: relative;
      width: @imgWidth;
      height: 100%;
    }
  }
  ol {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    bottom: 0;
    width: 100px;
    height: 28px;
    li {
      width: 8px;
      height: 8px;
      border-radius: 8px;
      margin: 0 3px;
      background-color: #ffffff;
      cursor: pointer;
    }
    .current {
      width: 15px;
      background-color: #ff6b6b;
    }
  }
  .slider-img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slider-title {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    padding: 22px 100px 5px 10px;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.555));
    color: #ffffff;
    font-weight: 700;
    overflow: hidden;
    word-break: break-all;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
