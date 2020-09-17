<template>
  <div class="mixin-list">
    <ul class="list-order">
      <li class="order" @click="sortChange(item.value)" v-for="(item, i) in list.options" :key="i">
        <span :class="{ 'on': order === item.value  }">{{ item.title }}</span>
        <i class="up" :class="{ 'active': order === item.value && sort === 1 }"></i>
        <i class="down" :class="{ 'active': order === item.value && sort === 0 }"></i>
      </li>
    </ul>
    <div class="item-box">
      <div class="item" v-for="(item, i) in dataList" :key="i">
        <a :href="item.url">
          <img :src="item.img" />
        </a>
        <a :href="item.url">{{ item.title }}</a>
        <p>{{ [item.newEp, item.eps] | finishState }}</p>
      </div>
    </div>
    <div class="paging-wrapper" v-if="total > limit">
      <paging-com
        :currentPage="page"
        :totalPage="Math.floor(total / limit + 1)"
        @pageChange="pageChange"
      />
    </div>
  </div>
</template>

<script>
import PagingCom from '../Pagination/PagingCom'

export default {
  props: {
    list: { type: Object },
    setQuery: Function,
    dataList: {
      type: Array,
      default: () => [
        {
          url: '#',
          img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
          title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
          newEp: 10,
          eps: 10
        },
        {
          url: '#',
          img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
          title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
          newEp: 1,
          eps: 10
        },
        {
          url: '#',
          img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
          title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
          newEp: 1,
          eps: 10
        },
        {
          url: '#',
          img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
          title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
          newEp: 1,
          eps: 10
        },
        {
          url: '#',
          img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
          title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
          newEp: 1,
          eps: 10
        },
        {
          url: '#',
          img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
          title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
          newEp: 0,
          eps: 10
        }
      ]
    }
  },
  data () {
    return {
      page: 1,
      total: 50,
      limit: 20,
      sortType: 0,
      order: 0,
      sort: 0
    }
  },
  methods: {
    pageChange (page) {
      this.page = page
      this.$emit('setQuery', 'page', page)
    },
    sortChange (val) {
      if (this.order === val) {
        this.sort = +!Boolean(this.sort)
      } else {
        this.order = val
        this.sort = 0
      }
    },
    getKeyValue (key, hash, def = undefined) {
      const reg = new RegExp(`[\\?&#]${key}=([^&#]+)`, 'gi')
      const matches = hash.match(reg)

      if (matches.length > 0) {
        const strArr = matches[matches.length - 1].split('=')
        return strArr.length > 1 ? strArr[1] : def
      }
      return def
    }
  },
  filters: {
    /* 状态过滤 */
    finishState ([newEp, eps]) {
      if (newEp < eps && newEp > 0) {
        return `更新至第${newEp}话`
      } else if (newEp === eps) {
        return `共${eps}话`
      } else {
        return '即将开播'
      }
    }
  },
  created () {
    /* 获取page */
    this.page = parseInt(this.getKeyValue('page', window.location.hash))
  },
  components: {
    'paging-com': PagingCom
  }
}
</script>

<style lang="less" scoped>
.mixin-list {
  flex: 1;

  .list-order {
    display: flex;
    height: 44px;

    .order {
      position: relative;
      width: 80px;
      height: 20px;
      margin-right: 10px;
      cursor: pointer;

      span {
        color: #222222;
      }

      span.on {
        color: #ff6b6b;
      }

      .up {
        position: absolute;
        top: 3px;
        right: 8px;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #dddddd;
        border-left: 5px solid transparent;
      }
      .up.active {
        border-bottom-color: #ff6b6b;
      }

      .down {
        position: absolute;
        top: 11px;
        right: 8px;
        border-top: 5px solid #dddddd;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
      }
      .down.active {
        border-top-color: #ff6b6b;
      }
    }
  }

  .item-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 20px;

    .item {
      width: 160px;
      height: 300px;

      a:nth-child(1) {
        display: block;
        width: 160px;
        height: 214px;
        border-radius: 4px;
        background: url("../../assets/imgs/img_loading.png") no-repeat center;
        background-size: 50px;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      a:nth-child(2) {
        display: block;
        // margin-top: 5px;
        // margin: 5px 0 2px 0;
        padding: 5px 0 2px 0;
        line-height: 22px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;

        &:hover {
          color: #ff6b6b;
        }
      }

      p {
        font-size: 12px;
        color: #a6abc8;
        cursor: pointer;
      }
    }
  }
}

.paging-wrapper {
  margin-right: 15px;
}
</style>
