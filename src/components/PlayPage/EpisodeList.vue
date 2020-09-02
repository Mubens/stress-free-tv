<template>
  <div class="episode-list-wrapper" v-if="episodeData.length > 1">
    <div class="episode-list-title">
      <span class="title">选集</span>
      <i class="icon" :class="isGridLayout ? 'icon-grid' : 'icon-item'" @click="switchLayout"></i>
    </div>
    <div class="episode-list-content">
      <div class="grid-layout" v-if="isGridLayout">
        <a
          v-for="(item, index) in episodeData"
          :class="currentEp === item.ep ? 'current' : ''"
          :href="`${$route.path}?ep=${item.ep}`"
          @click.prevent="routerPush(item.ep, index)"
          :key="item.ep"
        >
          <span>{{ item.ep }}</span>
        </a>
      </div>
      <div class="list-layout" v-else>
        <a
          v-for="(item, index) in episodeData"
          :class="currentEp === item.ep ? 'current' : ''"
          :href="`${$route.path}?ep=${item.ep}`"
          @click.prevent="routerPush(item.ep, index)"
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
    currentEp: { type: Number },
    episodeData: { type: Array },
    setEpisode: { type: Function }
  },
  data () {
    return {
      isGridLayout: true
    }
  },
  watch: {
  },
  methods: {
    /* localStorage 获取布局类型 */
    getLayout () {
      const isGridLayout = getLocal('sftv-eptype')
      this.isGridLayout = isGridLayout != null ? isGridLayout : true
    },
    /* 切换布局 */
    switchLayout () {
      this.isGridLayout = !this.isGridLayout
    },
    /* 保存布局 */
    setLayout () {
      setLocal('sftv-eptype', this.isGridLayout)
    },
    /* 路由传参 */
    routerPush (ep) {
      if (ep === this.currentEp) return
      this.$emit('setEpisode', { path: this.$route.params.id, query: { ep } })
    }
  },
  mounted () {
    this.getLayout()
  },
  beforeDestroy () {
    this.setLayout()
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
      white-space: nowrap;
      text-overflow: ellipsis;

      a {
        font-size: 13px;
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
