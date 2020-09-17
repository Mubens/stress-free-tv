<template>
  <div class="paging-wrapper">
    <ul :class="{ 'mini-paging': type === 'mini', 'btn-paging': type === 'btn' || type === ''  }">
      <li v-if="type === 'mini'">共{{ totalPage }}页</li>
      <li v-show="currentPage !== 1" @click="changePage(currentPage - 1)">
        <a href="javascript:;">上一页</a>
      </li>
      <!-- 页数少于 10 -->
      <template v-if="totalPage < 10">
        <li v-for="page in totalPage" @click="changePage(page)" :key="page">
          <a href="javascript:;" :class="{ 'current': currentPage === page }">{{ page }}</a>
        </li>
      </template>
      <!-- 页数多于 10 -->
      <template v-else>
        <template v-for="page in totalPage">
          <li
            v-if="showThis(page)"
            :class="{ 'after': page === 1 && currentPage >= 5, 'before' : page === totalPage && currentPage <= totalPage - 3 }"
            :key="page"
          >
            <a
              href="javascript:;"
              :class="{ 'current': currentPage === page }"
              @click="changePage(page)"
            >{{ page }}</a>
          </li>
        </template>
      </template>
      <li v-show="currentPage !== totalPage" @click="changePage(currentPage + 1)">
        <a href="javascript:;">下一页</a>
      </li>
    </ul>
    <div class="page-input" v-if="type !== 'mini'">
      <span>共{{ totalPage }}页，跳至</span>
      <input type="text" v-model="inputPage" @keydown.enter="toInputPage" />
      <span>页</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, default: 1 },
    totalPage: { type: Number, default: 1 },
    pageChange: { type: Function },
    type: { type: String, default: '' }
  },
  data () {
    return {
      inputPage: ''
    }
  },
  methods: {
    /* 换页 */
    changePage (page) {
      if (isNaN(page) || page === this.currentPage) return
      if (page < 1) page = 1
      if (page > this.totalPage) page = this.totalPage
      this.$emit('pageChange', page)
    },
    /* 显示这页的按钮 */
    showThis (page) {
      // 第一页 | 最后一页 | 当前页的前两页到后两页
      return page === 1 || page === this.totalPage || (page < this.currentPage + 3 && page > this.currentPage - 3)
    },
    /* input 输入 */
    toInputPage () {
      let page = Number(this.inputPage)
      // console.log(page)
      this.inputPage = ''
      this.changePage(page)
    }
  }
}
</script>

<style lang="less" scoped>
.magin-tb() {
  margin: 10px 0;
}

.paging-wrapper {
  display: flex;
  justify-content: space-between;
}

.mini-paging {
  display: flex;
  font-size: 13px;
  line-height: 13px;
  .magin-tb();

  li {
    margin: 0 4px;

    a.current {
      color: #ff6b6b;
    }

    &.after::after {
      content: "...";
      margin-left: 6px;
      font-size: 14px;
    }

    &.before::before {
      content: "...";
      margin-right: 6px;
      font-size: 14px;
    }
  }
}

.btn-paging {
  display: flex;
  .magin-tb();

  li {
    display: flex;
    margin-right: 4px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 28px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      cursor: pointer;

      &.current,
      &:hover {
        border: 1px solid #ff6b6b;
        background-color: #ff6b6b;
        color: #ffffff;
      }
    }

    .ellipsis() {
      content: "...";
      font-size: 16px;
      font-weight: 700;
      line-height: 32px;
    }

    &.after::after {
      .ellipsis();
      margin-left: 10px;
      margin-right: 4px;
    }

    &.before::before {
      .ellipsis();
      margin-left: 4px;
      margin-right: 10px;
    }
  }
}

.page-input {
  .magin-tb();

  input {
    width: 46px;
    height: 26px;
    margin: 0 4px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    text-align: center;

    &:focus {
      border-color: #ff6b6b;
    }
  }
}
</style>