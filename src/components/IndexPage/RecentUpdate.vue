<template>
  <CommenItem class="update-box" title="最近更新">
    <ul :class="showAll ? 'auto-height' : ''">
      <li v-for="item in list" :key="item.id">
        <div class="left-pic">
          <a :href="`/play/${item.id}?ep=${item.new_ep}`">
            <img v-lazy="item.small_img" />
          </a>
        </div>
        <div class="right-info">
          <p class="title" :title="item.title">
            <a :href="`/play/${item.id}?ep=${item.new_ep}`">{{ item.title }}</a>
          </p>
          <p class="update-ep">
            更新至
            <a :href="`/play/${item.id}?ep=${item.new_ep}`"
              >{{ item.new_ep }}话</a
            >
          </p>
        </div>
      </li>
    </ul>
    <!-- 收放按钮 -->
    <div class="toggle-block">
      <div class="toggle-btn" @click="showOrHide">
        <span>{{ showAll ? "收起" : "全部" }}</span>
        <i
          class="icon"
          :class="showAll ? 'icon-arrow-up' : 'icon-arrow-down'"
        ></i>
      </div>
    </div>
  </CommenItem>
</template>

<script>
import CommenItem from './commen-item'

export default {
  props: {
    list: { type: Array, default: () => [] }
  },
  data () {
    return {
      showAll: false
    }
  },
  methods: {
    showOrHide () {
      if (this.showAll) {
        window.scrollTo(0, 320)
      }
      this.showAll = !this.showAll
    }
  },
  components: { CommenItem }
}
</script>

<style lang="less">
.update-box {
  position: relative;
  display: flex;
  // width: 100%;
  margin-top: 30px;

  ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 210px);
    grid-template-rows: repeat(auto-fill, 110px);
    justify-content: space-between;
    min-height: 330px;
    height: 330px;
    overflow: hidden;

    li {
      box-sizing: border-box;
      display: flex;
      margin: 15px 0;
    }

    .left-pic {
      flex: 0 0 76px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
    }
  }

  .right-info {
    position: relative;
    box-sizing: border-box;
    padding: 0 5px;
    margin-right: 10px;
    flex: 1;

    .title {
      height: 60px;
      overflow: hidden;
      cursor: pointer;

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
      bottom: 0;
      height: 20px;
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
    height: 15px;
    width: 100%;
  }
  .toggle-btn {
    display: flex;
    position: relative;
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
  .auto-height {
    height: auto;
  }
}
.left-part {
  flex: 1;
}

.right-part {
  width: 260px;
  background-color: skyblue;
}

// @media screen and(max-width: 1400px) {
//   .update-box ul {
//     height: 380px;
//   }
// }
// @media screen and(max-width: 1400px) {
//   .update-box ul {
//     // height: 325px;
//     // li {
//     //   width: 33.33%;
//     // }
//   }
// }
</style>