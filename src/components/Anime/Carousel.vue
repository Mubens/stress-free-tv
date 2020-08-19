<template>
  <div class="anime-carousel" ref="carousel" @mouseover="stopCricle" @mouseout="startCricle">
    <!-- 核心滚动区 -->
    <ul ref="ul">
      <li v-for="(item, i) in carousel" :key="i">
        <a :href="`/anime/${item.id}`" target="_blank">
          <img :src="item.img" />
        </a>
      </li>
    </ul>
    <!-- 循环按钮 -->
    <ol>
      <template v-for="(item, i) in carousel">
        <li v-if="i < carousel.length - 1" @click="indexClick(i)" :key="i">
          <img :src="item.simg" :class="current % 5 === i ? 'current' : ''" />
        </li>
      </template>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    // carousel: Array
  },
  data () {
    return {
      current: 0, // 当前图片索引
      timer: null, // 定时器
      durtion: 4000, // 每一张图片的停滞时间
      animeTime: 400, // 动画的持续时间，与 css 保持一致
      carousel: [
        {
          title: '少女的福音',
          id: '1',
          img: require('../../images/98272592ecc6189caf306e9e863a825257df83c3.jpg@2320w_664h.jpg'),
          simg: require('../../images/7780b1d45215358294e6824632699b50c79ad1f6.jpg@100w_76h.jpg')
        },
        {
          title: '少女的福音',
          id: '2',
          img: require('../../images/98272592ecc6189caf306e9e863a825257df83c3.jpg@2320w_664h.jpg'),
          simg: require('../../images/7780b1d45215358294e6824632699b50c79ad1f6.jpg@100w_76h.jpg')
        },
        {
          title: '少女的福音',
          id: '3',
          img: require('../../images/98272592ecc6189caf306e9e863a825257df83c3.jpg@2320w_664h.jpg'),
          simg: require('../../images/7780b1d45215358294e6824632699b50c79ad1f6.jpg@100w_76h.jpg')
        },
        {
          title: '少女的福音',
          id: '4',
          img: require('../../images/98272592ecc6189caf306e9e863a825257df83c3.jpg@2320w_664h.jpg'),
          simg: require('../../images/7780b1d45215358294e6824632699b50c79ad1f6.jpg@100w_76h.jpg')
        }
      ]
    }
  },
  methods: {
    // 自动循环轮播
    startCricle () {
      this.timer = setInterval(() => {
        // cur 下一张图片的索引
        let cur = this.current + 1
        // 如果 下一张是最后一张（后来手动添加的那一张），那么直接播放最后一张，并立刻回到第一张图片
        if (cur === this.carousel.length - 1) {
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
      console.log(index)
    },
    // translate 动画效果
    translate (calback) {
      const ul = this.$refs.ul
      ul.classList.add('animation')
      ul.style.transform = `translateX(${-this.current * (100 / this.carousel.length)}%)`

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
.anime-carousel {
  position: relative;
  width: 100%;
  // height: 320px;
  margin: 10px 0;
  border-radius: 4px;
  overflow: hidden;

  @duration: 0.4s;
  .animation {
    transition: transform @duration linear;
  }
  ul {
    // position: absolute;
    display: flex;
    width: 100% * 4;
    height: 100%;
    li {
      float: left;
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
      img.current {
        border-color: #ff6b6b;
      }
    }
  }
}
</style>
