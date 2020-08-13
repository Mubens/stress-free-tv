<template>
  <div class="slider-box">
    <div class="slider-left">
      <CarouselBox :datalist="dataList.carousel" />
    </div>
    <div class="slider-right">
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
      <!-- <span class="btn">&gt;</span>
      <span class="btn">&lt;</span>-->
    </div>
  </div>
</template>

<script>
import CarouselBox from './Slider/CarouselBox'

export default {
  data () {
    return {
      dataList: {
        carousel: [
          { title: '官宣：我和租借女友结婚了！', url: '#1', img: 'https://imgs.aixifan.com/KeECzcB99K-ia6fq2-bYnEn2-uUF3u2-qUFZF3.png?imageView2/1/w/482/h/247' },
          { title: 'SNH48 X AcFun 总决选', url: '#2', img: 'https://imgs.aixifan.com/7SqvxNJjWs-EjaIBz-BbIzaa-ryyae2-NVfENr.JPG?imageView2/1/w/482/h/247' },
          { title: '当你唤起我的名字｜陆婷答应你们的一日VLOG', url: '#3', img: 'https://imgs.aixifan.com/nnlpgT0kTP-UVJjma-YjmQri-A7ZfUz-3EVFbu.jpg?imageView2/1/w/482/h/247' },
          { title: '夏日蕉蕉同好会：召唤圈层硬核UP主！', url: '#4', img: 'https://imgs.aixifan.com/7KROtJnUJD-nQriEb-FZvA7b-zIvmQz-IJNVZb.jpg?imageView2/1/w/482/h/247' },
          { title: 'AcFun虚拟直播工具自有形象上线！点击获取你的虚拟魔法钥匙~', url: '#5', img: 'https://imgs.aixifan.com/zoLVRdJ73U-IB77v2-NFn6Jf-ZNJBfu-qayQJf.png?imageView2/1/w/482/h/247' }
        ],
        recommend: [
          { id: 1, title: '战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 2, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 3, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 4, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 5, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 6, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 7, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
          { id: 8, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', play: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        ]
      }
    }
  },
  components: {
    CarouselBox
  },
  mounted () {
    this.dataList.carousel.push(this.dataList.carousel[0])
    // const url = ''
    // axios.get(url).then(res => {
    //   this.dataList = res.data
    // })
  }
}
</script>

<style lang="less" >
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
  // flex: 0 0 (100% - 952px);
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

  .btn {
    position: absolute;
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