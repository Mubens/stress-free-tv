<template>
  <div class="episode-list-wrapper" v-if="episodeList.length > 1">
    <div class="episode-list-title">
      <span class="title">选集</span>
      <i class="icon" :class="isGridLayout ? 'icon-grid' : 'icon-item'" @click="switchLayout"></i>
    </div>
    <div class="episode-list-content" ref="scroll">
      <div :class=" isGridLayout ? 'grid-layout' : 'list-layout' ">
        <a
          v-for="(item, index) in episodeList"
          :class="currentEp === item.ep ? 'current' : ''"
          :href="`${$route.path}?ep=${item.ep}`"
          @click.prevent="episodeClick(item.ep, index)"
          :key="item.ep"
        >
          <span v-if="isGridLayout">{{ item.ep }}</span>
          <span v-else>第 {{ item.ep }} 话 {{ item.title }}</span>
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
    episodeList: { type: Array },
    setEpisode: { type: Function }
  },
  data () {
    return {
      isGridLayout: true,
      index: 0
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
      this.scrollToY(this.index)
    },
    /* 保存布局 */
    setLayout () {
      setLocal('sftv-eptype', this.isGridLayout)
    },
    /* 路由传参 */
    episodeClick (ep, index) {
      if (ep === this.currentEp) return
      this.$emit('setEpisode', ep)
    },
    scrollToY (index) {
      this.index = index
      this.$nextTick(() => {
        const scrollY = this.isGridLayout ? (parseInt(index / 4) - 4) * 38 : (index - 4) * 26
        this.$refs.scroll.scrollTo(0, scrollY)
      })
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
    height: 386px;
    overflow-x: hidden;
    overflow-y: auto;

    a:visited {
      color: #757575;
    }

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
        font-size: 12px;
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
        width: 280px;
        margin: 3px -3px;
        padding: 5px 0 5px 5px;
        border-radius: 4px;
        font-size: 13px;
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
