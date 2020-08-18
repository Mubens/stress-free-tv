<template>
  <div class="slider-box">
    <div class="slider-left">
      <CarouselBox :datalist="dataList.carousel" />
    </div>
    <div class="slider-right" ref="recommend">
      <div class="item" v-for="item in dataList.recommend" :key="item.id">
        <a style :href="item.url">
          <img :src="item.img" />
          <div class="info">
            <p class="title">{{ item.title }}</p>
            <p class="up">
              <i class="icon icon-up-zhu"></i>
              {{ item.up }}
            </p>
            <p class="play">{{ item.play | playFormat }}</p>
          </div>
        </a>
      </div>
      <span class="btn left" @click="pClick">
        <i class="icon icon-left"></i>
      </span>
      <span class="btn right" @click="pClick">
        <i class="icon icon-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
import CarouselBox from './Carousel'

import { playFormat } from '../../assets/js/format'

export default {
  data () {
    return {
      page: 0,
      dataList: {
        carousel: [
          {
            title: '官宣：我和租借女友结婚了！',
            url: 'http://localhost:8080/play/123456',
            img: 'https://imgs.aixifan.com/KeECzcB99K-ia6fq2-bYnEn2-uUF3u2-qUFZF3.png?imageView2/1/w/482/h/247'
          },
          {
            title: 'SNH48 X AcFun 总决选',
            url: 'http://localhost:8080/play/123456',
            img: 'https://imgs.aixifan.com/7SqvxNJjWs-EjaIBz-BbIzaa-ryyae2-NVfENr.JPG?imageView2/1/w/482/h/247'
          },
          {
            title: '当你唤起我的名字｜陆婷答应你们的一日VLOG',
            url: 'http://localhost:8080/play/123456',
            img: 'https://imgs.aixifan.com/nnlpgT0kTP-UVJjma-YjmQri-A7ZfUz-3EVFbu.jpg?imageView2/1/w/482/h/247'
          },
          {
            title: '夏日蕉蕉同好会：召唤圈层硬核UP主！',
            url: 'http://localhost:8080/play/123456',
            img: 'https://imgs.aixifan.com/7KROtJnUJD-nQriEb-FZvA7b-zIvmQz-IJNVZb.jpg?imageView2/1/w/482/h/247'
          },
          {
            title: 'AcFun虚拟直播工具自有形象上线！点击获取你的虚拟魔法钥匙~',
            url: 'http://localhost:8080/play/123456',
            img: 'https://imgs.aixifan.com/zoLVRdJ73U-IB77v2-NFn6Jf-ZNJBfu-qayQJf.png?imageView2/1/w/482/h/247'
          }
        ],
        recommend: [
          {
            id: 1,
            title: '战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 2,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 3,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 4,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 5,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 6,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 7,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 8,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 9,
            title: ' 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 10,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 11,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 12,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 13,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 14,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 15,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          },
          {
            id: 16,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img: require('../../images/hq720.webp')
          }
        ]
      }
    }
  },
  methods: {
    pClick () {
      const width = this.$refs.recommend.offsetWidth
      let arr = this.dataList.recommend
      if (width > 900) {
        this.dataList.recommend = arr.slice(8).concat(arr.slice(0, 8))
        return
      }
      if (width > 700) {
        this.dataList.recommend = arr.slice(6).concat(arr.slice(0, 6))
        return
      }
      this.dataList.recommend = arr.slice(4).concat(arr.slice(0, 4))
    }
  },
  filters: {
    playFormat
  },
  components: {
    CarouselBox
  },
  mounted () {
    this.dataList.carousel.push(this.dataList.carousel[0])
    // const url = ''
    // axios.get(url).then(res => {
    //   res.data.carousel.push(res.data.carousel[0])
    //   this.dataList = res.data
    // })
  }
}
</script>

<style lang="less">
.slider-box {
  display: flex;
  height: 312px;
}
.slider-left {
  box-sizing: border-box;
  width: 560px;
  flex: 0 0 560px;
  height: 100%;
  padding: 4px 0;
}

.slider-right {
  position: relative;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  margin-left: 4px;
  overflow: hidden;
  .item {
    position: relative;
    box-sizing: border-box;
    width: 100% / 4;
    height: 50%;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
    }
    &:hover {
      .info {
        background-color: #0f0e0e57;
        transform: translateY(0);
        .title {
          overflow: auto;
          white-space: normal;
        }
      }
    }
  }
  .info {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    padding: 36px 8px;
    background-color: transparent;
    transform: translateY(58%);
    transition: all 0.3s;

    .title {
      overflow: hidden;
      word-break: break-all;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .up {
      display: flex;
      align-items: center;
      margin: 5px 0 5px -1px;
      .icon {
        width: 20px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }

  &:hover .btn {
    opacity: 1;
  }

  .btn {
    position: absolute;
    top: 50%;
    width: 25px;
    padding: 15px 2px;
    background-color: #0009;
    transform: translateY(-50%);
    cursor: pointer;
    fill: #ffffff;
    z-index: 99;
    opacity: 0;
    transition: all 0.3s;
  }
  .left {
    left: 4px;
    border-radius: 0 4px 4px 0;
  }
  .right {
    right: 4px;
    border-radius: 4px 0 0 4px;
  }
  .icon {
    color: #ffffff;
    font-size: 20px;
  }
}
@media screen and(max-width: 1756px) {
  .slider-right .item {
    width: 100% / 3;
  }
}
@media screen and(max-width: 1650px) {
  .slider-right .item {
    width: 100% / 2;
  }
}
</style>
