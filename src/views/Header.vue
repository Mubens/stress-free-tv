<template>
  <div class="header">
    <ul class="nav-link">
      <li>
        <a href="/"><i class="icon icon-home"></i>主页</a>
      </li>
    </ul>
    <SearchInput
      v-if="$route.name !== 'Search'"
      role="index"
      @search="toSearch"
    />
    <UserCenter />
  </div>
</template>

<script>
import UserCenter from '../components/UserCenter/user-center'
import SearchInput from '../components/Search/search-input'

import { getLocal, setLocal } from '../assets/js/storage'

export default {
  methods: {
    toSearch (keyword) {
      // console.log(123)
      this.$router.push({ path: '/search', query: { keyword } })
    }
  },
  components: {
    UserCenter,
    SearchInput
  }
}
</script>

<style lang="less">
.header {
  box-sizing: border-box;
  // padding: 10px 12px;
  padding: 0 20px;
  line-height: 30px;
  position: relative;
  // margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 100%;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0 -2px 16px 0px rgba(0, 0, 0, 0.08);

  .nav-link {
    display: flex;
    align-items: center;
    height: 100%;
    li {
      margin: 0 5px;
    }
    a {
      display: flex;
      align-items: center;
      padding: 2px 0;
      font-size: 16px;
    }

    .icon {
      padding-right: 4px;
      font-size: 20px;
      color: #ff6b6b;
    }
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
</style>
