<template>
  <div class="header">
    <div class="nav-link"></div>
    <div class="search-box" @mousedown.stop="toShow" tabindex="1">
      <form>
        <input type="text" class="search" autocomplete="off" v-model="keyword" @blur="toHide" />
        <button class="search-btn" @click.prevent="goToSearch">
          <svg viewBox="0 0 1075 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
            <path
              d="M715.509344 578.848102m-54.305801 54.305801l0 0q-54.305801 54.305801 0 108.611601l253.42707 253.427071q54.305801 54.305801 108.611602 0l0 0q54.305801-54.305801 0-108.611602l-253.427071-253.42707q-54.305801-54.305801-108.611601 0Z"
            />
            <path
              d="M661.203543 633.153903a281.6 281.6 0 1 1-398.242539-398.24254 281.6 281.6 0 0 1 398.242539 398.24254z m108.611601 108.611601a435.2 435.2 0 1 0-615.465742-615.465742 435.2 435.2 0 0 0 615.465742 615.465742z"
            />
          </svg>
        </button>
      </form>
      <ul :class="{ active: isShow }">
        <li v-for="(item, i) in searchList" :key="i">
          <a :href="item.href" target="_blank">{{ item.keyword }}</a>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            @click="delThisItem(i)"
          >
            <path
              d="M81.3056 203.3664l762.5728 762.5728c22.7328 22.7328 63.2832 18.944 90.5216-8.192 27.2384-27.3408 30.9248-67.8912 8.192-90.5216L180.224 104.6528C157.3888 81.92 116.736 85.6064 89.6 112.8448c-27.2384 27.3408-30.9248 67.7888-8.192 90.5216z"
            />
            <path
              d="M844.8 103.7312L80.4864 868.0448c-22.2208 22.2208-18.1248 62.3616 9.216 89.6 27.136 27.2384 67.2768 31.3344 89.4976 9.216l764.3136-764.416c22.2208-22.2208 18.1248-62.2592-9.216-89.6-27.136-27.2384-67.2768-31.3344-89.4976-9.1136z"
            />
          </svg>
        </li>
      </ul>
    </div>
    <user-center />
  </div>
</template>

<script>
import UserCenter from './UserCenter/UserCenter'

import { getLocal, setLocal } from '../assets/js/storage'

export default {
  data() {
    return {
      keyword: '',
      searchList: [],
      isShow: false,
      timer: null
    }
  },
  methods: {
    toShow() {
      setTimeout(() => {
        this.isShow = true
      })
    },
    toHide(e) {
      this.isShow = false
    },
    /* 点击搜索 */
    goToSearch() {
      const keyword = this.keyword
      const href = `http://localhost:8080/search?keyword=${keyword}`

      window.open(href, '_blank')
      this.searchList.unshift({ keyword, href })

      if (this.searchList.length > 10) {
        this.searchList.pop()
      }
      this.saveSearchList()
    },
    /* 获取搜索记录 */
    getSearchList() {
      const history = getLocal('sftv-search')
      this.searchList = history ? history : []
    },
    /* 保存搜索记录 */
    saveSearchList() {
      setLocal('sftv-search', this.searchList)
    },
    /* 删除某条记录 */
    delThisItem(index) {
      this.searchList.splice(index, 1)
      this.saveSearchList()
    }
  },
  mounted() {
    this.getSearchList()
  },
  components: {
    'user-center': UserCenter
  }
}
</script>

<style lang="less">
.header {
  box-sizing: border-box;
  padding: 10px 12px;
  line-height: 30px;
  position: relative;
  // margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // width: 100%;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0 -2px 16px 0px rgba(0, 0, 0, 0.08);
  z-index: 9999;

  .nav-link {
    height: 100%;
    background-color: tomato;
  }

  .search-box {
    position: relative;
    margin: 0 30px;
    flex: 0 1 500px;
    transition: 0.3s width;
    height: 34px;
    border: 1px solid #e7e7e7;
    border-radius: 2px;
    background-color: #ffffff;

    form {
      display: flex;
      height: 100%;

      .search {
        padding: 0 15px;
        flex: 1;
      }

      .search-btn {
        width: 48px;
      }

      svg {
        fill: #565656;
      }
      svg:hover {
        fill: #ff6b6b;
      }
    }

    ul {
      display: none;
      position: absolute;
      top: 110%;
      width: 100%;
      padding: 5px 0;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px;
      z-index: 999;
      border-radius: 2px;

      li {
        box-sizing: border-box;
        position: relative;
        height: 32px;

        padding: 0 40px 0 15px;
        cursor: pointer;
        background-color: #ffffff;
      }
      li:hover {
        background-color: #f4f4f4;
      }

      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        overflow: hidden;
      }

      .icon {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-15px, -50%);
        fill: #999999;
      }
      .icon:hover {
        fill: #f8a7a7;
      }
    }

    ul.active {
      display: block;
    }
  }
}

@media screen and (max-width: 1190px) {
  .header .search-box {
    // display: none;
  }
}
</style>
