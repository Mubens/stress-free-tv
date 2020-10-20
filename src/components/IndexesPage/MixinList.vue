<template>
  <div class="mixin-list">
    <ul class="list-order" v-if="list">
      <li class="order" @click="sortChange(item.value)" v-for="(item, i) in list.options" :key="i">
        <span :class="{ on: order == item.value }">{{ item.title }}</span>
        <i class="up" :class="{ active: order == item.value && curSort == sort.up }"></i>
        <i class="down" :class="{ active: order == item.value && curSort == sort.down }"></i>
      </li>
    </ul>
    <div class="item-box">
      <div class="item" v-for="(item, i) in data.list" :key="i">
        <a :href="'/play/' + item.id">
          <img :src="item.img" />
          <span>{{ item.sub_count | subCountFormat }}</span>
        </a>
        <a :href="'/play/' + item.id">{{ item.title }}</a>
        <p>{{ [item.new_ep, item.all_eps, item.status] | finishState }}</p>
      </div>
      <div class="no-such-item" v-show="!data.total">没有这样的番剧哦～</div>
    </div>
    <div class="paging-wrapper" v-if="data.total > data.limit">
      <paging-com
        :currentPage="data.page"
        :totalPage="Math.floor(data.total / data.limit + 1)"
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
    sort: Object,
    setKeyValue: Function,
    data: Object,
    query: Object
  },
  computed: {
    order() {
      return this.query.order
    },
    curSort() {
      return  this.query.sort
    }
  },
  methods: {
    pageChange(page) {
      this.data.page = page
      this.$emit('setKeyValue', { page })
    },
    sortChange(val) {
      let sort, order
      if (this.order === val) {
        order = this.order
        sort = +!Boolean(this.curSort)
      } else {
        order = val
        sort = 0
      }
      

      this.$emit('setKeyValue', { sort, order, page: 1 })
    }
  },
  filters: {
    /* 状态过滤 */
    finishState([new_ep, all_eps, status]) {
      if (status === 0) {
        return `更新至第${new_ep}话`
      } else if (status === 1) {
        return `共${all_eps}话`
      } else {
        return '即将开播'
      }
    },
    subCountFormat(num) {
      let str = ''
      if (num < 10000) {
        str += num
      } else if (num < 100000000) {
        str += (num / 10000).toFixed(1) + '万'
      } else {
        str += (num / 100000000).toFixed(1) + '亿'
      }

      return str + '追番'
    }
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
    min-height: 620px;

    .item {
      width: 160px;
      height: 300px;
      padding-right: 20px;

      a:nth-child(1) {
        position: relative;
        display: block;
        width: 160px;
        height: 214px;
        border-radius: 4px;
        background: url('../../assets/imgs/img_loading.png') no-repeat center;
        background-size: 50px;
        overflow: hidden;

        span {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          padding: 0 8px;
          font-size: 12px;
          line-height: 70px;
          z-index: 1;
          color: #ffffff;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0, rgba(0, 0, 0, 0));
        }
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

    .no-such-item {
      margin: 0 auto;
      align-self: center;
      color: #99a2aa;
    }
  }
}

.paging-wrapper {
  margin-right: 15px;
}
</style>
