<template>
  <div class="slider-box">
    <div class="slider-left">
      <CarouselBox :datalist="dataList.carousel" />
    </div>
    <div class="slider-right" ref="recommend">
      <div class="item" v-for="item in dataList.recommend" :key="item.id">
        <!-- <div style="width: 100%;height: 100%;"> -->
        <a style :href="item.url">
          <img :src="item.img" />
          <div class="info">
            <p class="title">{{ item.title }}</p>
            <p class="up">
              <i class="icon">
                <svg
                  t="1597306990498"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2258"
                  width="100%"
                  height="100%"
                >
                  <path
                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                    p-id="2259"
                  />
                  <path
                    d="M419.2 544c0 51.2-3.2 108.8-83.2 108.8S252.8 595.2 252.8 544v-217.6H192v243.2c0 96 51.2 140.8 140.8 140.8 89.6 0 147.2-48 147.2-144v-240h-60.8V544zM710.4 326.4h-156.8V704h60.8v-147.2h96c102.4 0 121.6-67.2 121.6-115.2 0-44.8-19.2-115.2-121.6-115.2z m-3.2 179.2h-92.8V384h92.8c32 0 60.8 12.8 60.8 60.8 0 44.8-32 60.8-60.8 60.8z"
                    p-id="2260"
                  />
                </svg>
              </i>
              {{ item.up }}
            </p>
            <p class="play">{{ item.play }}</p>
          </div>
        </a>
        <!-- </div> -->
      </div>
      <span class="btn left" @click="pClick">
        <svg
          t="1597319994097"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2091"
          width="100%"
          height="100%"
        >
          <path
            d="M734.40567908 1020.17407454c-13.74131198 0-27.48262396-5.34384356-37.9158423-15.7770619L245.31676009 553.22393594c-20.99367108-20.99367108-20.99367108-54.96524792 0-75.83168463l457.02585771-457.28032646c20.99367108-20.99367108 54.96524792-20.99367108 75.83168465 0 20.99367108 20.99367108 20.99367108 54.96524792 0 75.83168463L358.93705266 515.30809361l413.38446874 413.38446876c20.99367108 20.99367108 20.99367108 54.96524792 0 75.83168464-10.43321836 10.30598399-24.17453035 15.64982755-37.91584232 15.64982753z m0 0"
            p-id="2092"
          />
        </svg>
      </span>
      <span class="btn right" @click="pClick">
        <svg
          t="1597320013511"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2830"
          width="100%"
          height="100%"
        >
          <path
            d="M777.7792 548.736L329.4592 1007.104a53.8496 53.8496 0 0 1-39.04 16.896 56.1664 56.1664 0 0 1-39.5904-95.36l409.2928-418.432L246.3744 95.616a56.64 56.64 0 0 1-0.5632-79.104 55.04 55.04 0 0 1 78.08-0.512l450.4192 451.456a37.12 37.12 0 0 1 2.9184 2.304 56.4864 56.4864 0 0 1 0.5504 78.976z"
            p-id="2831"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import CarouselBox from './Carousel'

export default {
  data () {
    return {
      page: 0,
      dataList: {
        carousel: [
          {
            title: '官宣：我和租借女友结婚了！',
            url: '#1',
            img: 'https://imgs.aixifan.com/KeECzcB99K-ia6fq2-bYnEn2-uUF3u2-qUFZF3.png?imageView2/1/w/482/h/247'
          },
          {
            title: 'SNH48 X AcFun 总决选',
            url: '#2',
            img: 'https://imgs.aixifan.com/7SqvxNJjWs-EjaIBz-BbIzaa-ryyae2-NVfENr.JPG?imageView2/1/w/482/h/247'
          },
          {
            title: '当你唤起我的名字｜陆婷答应你们的一日VLOG',
            url: '#3',
            img: 'https://imgs.aixifan.com/nnlpgT0kTP-UVJjma-YjmQri-A7ZfUz-3EVFbu.jpg?imageView2/1/w/482/h/247'
          },
          {
            title: '夏日蕉蕉同好会：召唤圈层硬核UP主！',
            url: '#4',
            img: 'https://imgs.aixifan.com/7KROtJnUJD-nQriEb-FZvA7b-zIvmQz-IJNVZb.jpg?imageView2/1/w/482/h/247'
          },
          {
            title: 'AcFun虚拟直播工具自有形象上线！点击获取你的虚拟魔法钥匙~',
            url: '#5',
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
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 2,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 3,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 4,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 5,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 6,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 7,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 8,
            title: '【10月】战术人形的虚度日常OP 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 9,
            title: ' 少女前线描改',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 10,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 11,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 12,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 13,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 14,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 15,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
          },
          {
            id: 16,
            title: '【10月】战术人形的虚度日常OP ',
            up: '白兔子菌',
            play: 41000,
            url: '#',
            img:
              'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ'
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
      overflow: hidden;
    }
    &:hover {
      .info {
        background-color: #0e0d0d3f;
        transform: translateY(0);
        .title {
          overflow: auto;
          // word-break: break-all;
          // word-wrap: normal;
          white-space: normal;
          // text-overflow: ellipsis;
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
