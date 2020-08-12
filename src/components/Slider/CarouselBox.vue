<template>
  <div class="carousel" @mouseover="stopCricle" @mouseout="startCricle">
    <ul :style="`transform: translateX(${translate()}px);`" class="animation" ref="ul">
      <li v-for="(item, index) in list" :key="index">
        <a :href="item.url" target="_blank">
          <img class="slider-img" :src="item.img" />
          <span class="slider-title">{{ item.title }}</span>
        </a>
      </li>
    </ul>
    <ol>
      <li
        :class="current === i ? 'current' : ''"
        v-for="i in list.length"
        :key="i"
        @click="indexClick(i)"
      ></li>
    </ol>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 1,
      timer: null,
      list: [
        { title: '官宣：我和租借女友结婚了！', url: '#1', img: 'https://imgs.aixifan.com/KeECzcB99K-ia6fq2-bYnEn2-uUF3u2-qUFZF3.png?imageView2/1/w/482/h/247' },
        { title: 'SNH48 X AcFun 总决选', url: '#2', img: 'https://imgs.aixifan.com/7SqvxNJjWs-EjaIBz-BbIzaa-ryyae2-NVfENr.JPG?imageView2/1/w/482/h/247' },
        { title: '当你唤起我的名字｜陆婷答应你们的一日VLOG', url: '#3', img: 'https://imgs.aixifan.com/nnlpgT0kTP-UVJjma-YjmQri-A7ZfUz-3EVFbu.jpg?imageView2/1/w/482/h/247' },
        { title: '夏日蕉蕉同好会：召唤圈层硬核UP主！', url: '#4', img: 'https://imgs.aixifan.com/7KROtJnUJD-nQriEb-FZvA7b-zIvmQz-IJNVZb.jpg?imageView2/1/w/482/h/247' },
        { title: 'AcFun虚拟直播工具自有形象上线！点击获取你的虚拟魔法钥匙~', url: '#5', img: 'https://imgs.aixifan.com/zoLVRdJ73U-IB77v2-NFn6Jf-ZNJBfu-qayQJf.png?imageView2/1/w/482/h/247' }
      ]
    }
  },
  methods: {
    startCricle () {
      this.timer = setInterval(() => {
        this.current = this.current >= 5 ? 1 : this.current + 1
      }, 3000)
    },
    stopCricle () {
      clearInterval(this.timer)
    },
    indexClick (index) {
      this.stopCricle()
      this.current = index
    },
    translate () {
      let distace = -(this.current - 1) * 560
      return distace
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

<style lang="less" scoped>
@imgWidth: 560px;
@imgCount: 5;

.animation {
  transition: transform 0.4s linear;
}
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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