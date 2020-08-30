<template>
  <div class="episode-list-wrapper">
    <div class="episode-list-title">
      <span class="title">选集</span>
      <i class="icon" :class="isGridLayout ? 'icon-grid' : 'icon-item'" @click="switchLayout"></i>
    </div>
    <div class="episode-list-content">
      <div class="grid-layout" v-if="isGridLayout">
        <a
          v-for="item in epData"
          :class="current === item.ep ? 'current' : ''"
          :href="item.url"
          :key="item.ep"
        >
          <span>{{ item.ep }}</span>
        </a>
      </div>
      <div class="list-layout" v-else>
        <a
          v-for="item in epData"
          :class="current === item.ep ? 'current' : ''"
          :href="item.url"
          :key="item.ep"
        >
          <span>第 {{ item.ep }} 话&nbsp;</span>
          <span>{{ item.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { setLocal, getLocal } from '../../assets/js/storage'

export default {
  props: {
    epData: {
      type: Array, default: () => [
        { ep: 1, title: '来访者1', url: 'http://localhost:8080/play/123456' },
        { ep: 2, title: '来访者2', url: 'http://localhost:8080/play/123456' },
        { ep: 3, title: '来访者3', url: 'http://localhost:8080/play/123456' },
        { ep: 4, title: '来访者4', url: 'http://localhost:8080/play/123456' },
        { ep: 5, title: '来访者5', url: 'http://localhost:8080/play/123456' },
        { ep: 6, title: '来访者6', url: 'http://localhost:8080/play/123456' },
        { ep: 7, title: '来访者7', url: 'http://localhost:8080/play/123456' },
        { ep: 8, title: '来访者8', url: 'http://localhost:8080/play/123456' },
        { ep: 9, title: '来访者9', url: 'http://localhost:8080/play/123456' },
        { ep: 10, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 25, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 36, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 37, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 38, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 39, title: '来访者10', url: 'http://localhost:8080/play/123456' }
      ]
    }
  },
  data () {
    return {
      current: 36,
      isGridLayout: true
    }
  },
  methods: {
    switchLayout () {
      this.isGridLayout = !this.isGridLayout
      setLocal('sftv-eptype', this.isGridLayout)
    }
  },
  mounted () {
    const isGridLayout = getLocal('sftv-eptype')
    this.isGridLayout = isGridLayout != null ? isGridLayout : true
  }
}
</script>

<style lang="less">
/*选集*/
.episode-list-wrapper {
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #f4f4f4;
  color: #000000d9;

  .episode-list-title {
    box-sizing: border-box;
    display: flex;
    width: 320px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;

    .icon {
      font-size: 20px;
      color: #757575;
      transform: translate(4px, 2px);
      &:hover {
        color: #ff6b6b;
      }
    }
  }

  .episode-list-content {
    padding-left: 15px;
    padding-bottom: 10px;
    height: 375px;
    overflow-x: hidden;
    overflow-y: auto;

    .grid-layout {
      display: flex;
      flex-wrap: wrap;
      margin-left: -5px;

      a {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 36px;
        margin: 5px;
        border: 1px solid #e5e9ef;
        border-radius: 2px;
        background-color: #fff;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          color: #ff6b6b;
          border-color: #ff6b6b;
        }
      }
      .current {
        color: #ffffff !important;
        border-color: #ff6b6b;
        background-color: #ff6b6b;
      }
    }

    .list-layout {
      display: flex;
      flex-direction: column;

      a {
        font-size: 14px;
        width: 280px;
        margin: 3px -3px;
        padding: 5px 0 5px 5px;
        border-radius: 4px;
        cursor: pointer;
      }

      a:hover {
        background-color: #ffffff;
      }

      .current {
        color: #ff6b6b;
        background-color: #ffffff;
      }
    }
  }
}
</style>
