<template>
  <div class="slider-box">
    <div class="slider-left">
      <CarouselBox />
    </div>
    <div class="slider-right">
      <div class="item" v-for="item in list" :key="item.id">
        <a :href="item.url">
          <img :src="item.img" />
          <div class="info">
            <p class="up">
              <i></i>
              {{ item.up }}
            </p>
            <p class="play">{{ item.play }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselBox from './Slider/CarouselBox'

export default {
  data () {
    return {
      list: [
        { id: 1, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 2, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 3, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 4, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 5, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 6, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 7, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
        { id: 8, title: '【10月】战术人形的虚度日常OP 少女前线描改', up: '白兔子菌', paly: 41000, url: '#', img: 'https://i.ytimg.com/vi/05iDR3i5vYQ/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4MlI0Z9roNEljroF4cvU5LqPpqQ' },
      ]
    }
  },
  components: {
    CarouselBox
  }
}
</script>

<style lang="less" scoped>
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
  flex: 0 0 (100% - 952px);
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
  }
  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
}
@media screen and(max-width: 1756px) {
  .slider-right {
    .item {
      width: 100% / 3;
    }
  }
}
@media screen and(max-width: 1650px) {
  .slider-right {
    .item {
      width: 100% / 2;
    }
  }
}
</style>