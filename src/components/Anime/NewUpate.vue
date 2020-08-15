<template>
  <div class="update-box" :class="showAll ? 'toggle-show' : ''">
    <!-- <div class="left-part"> -->
    <slot></slot>
    <ul>
      <li v-for="(item, i) in dataList" :key="i">
        <div class="left-pic">
          <a :href="item.url" target="_blank">
            <img :src="item.img" />
          </a>
        </div>
        <div class="right-info">
          <p class="title" :title="item.title">
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </p>
          <p class="update-ep">
            更新至
            <a :href="item.url" target="_blank">{{ item.current }}话</a>
          </p>
        </div>
      </li>
    </ul>
    <!-- 收放按钮 -->
    <div class="toggle-block">
      <div class="toggle-btn" @click="showOrHide">
        <span>{{ showAll ? '收起' : '全部' }}</span>
        <i class="icon" :class="showAll ? 'icon-up' : 'icon-down'"></i>
      </div>
    </div>
    <!-- </div> -->
    <!-- <div class="right-part">123456</div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      showAll: false,
      dataList: [
        { title: '新樱花大战新樱花大战新樱花花大战新樱花大战新樱花大战新', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战新樱花大战新樱花花大战新樱花大战新樱花大战新', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 10, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' },
        { title: '新樱花大战', current: 1000, img: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), url: '#' }
      ]
    }
  },
  methods: {
    showOrHide () {
      if (this.showAll) {
        window.scrollTo(0, 320)
      }
      this.showAll = !this.showAll
    }
  }
}
</script>

<style lang="less" >
.update-box {
  position: relative;
  width: 100%;
  height: 390px;
  margin-top: 30px;
  margin-bottom: 80px;

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    li {
      box-sizing: border-box;
      display: flex;
      width: 20%;
      margin: 15px 0;
    }
  }
  .left-pic {
    flex: 0 0 40%;
  }
  img {
    width: 100%;
    border-radius: 3px;
  }
  .right-info {
    position: relative;
    box-sizing: border-box;
    padding: 0 5px;
    margin-right: 10px;
    flex: 1;
    .title {
      height: 76px;
      overflow: hidden;
      a {
        display: block;
        height: 100%;
        transition: color 0.1s linear;
      }
      a:hover {
        color: #ff6b6b;
      }
    }
    .update-ep {
      position: absolute;
      left: 5px;
      a {
        padding: 2px 4px;
        margin-left: 4px;
        border-radius: 10px;
        font-size: 12px;
        color: #ffffff;
        background-color: #ff6b6b;
      }
    }
  }
  .toggle-block {
    background: url("../../assets/imgs/toggle-base.png") center -480px no-repeat;
    position: relative;
    height: 40px;
    width: 100%;
  }
  .toggle-btn {
    display: flex;
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    background: url("../../assets/imgs/toggle-base.png") -653px -79px no-repeat;
    width: 94px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #6d757a;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: #ff6b6b;
    }

    span {
      flex: 1;
      margin: 0 5px 0 10px;
      text-align: right;
    }
    .icon {
      top: 9px;
      flex: 1;
      text-align: left;
      transform: scale(0.8) translate(0, 9px);
    }
  }
  &.toggle-show {
    height: auto;
  }
}

@media screen and(max-width: 1756px) {
  .update-box {
    height: 410px;
    ul li {
      width: 25%;
    }
  }
}
@media screen and(max-width: 1650px) {
  .update-box {
    height: 400px;
    ul li {
      width: 33.33%;
    }
  }
}
</style>