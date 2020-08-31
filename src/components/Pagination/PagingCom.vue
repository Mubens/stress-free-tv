<template>
  <ul :class="{ 'mini-paging': type === 'mini', 'btn-paging': type === 'btn' || type === ''  }">
    <li v-if="type === 'mini'">共{{ totalPages }}页</li>
    <li v-show="currentPage !== 1" @click="changePage(currentPage - 1)">
      <a href="javascript:;">上一页</a>
    </li>
    <!-- 页数少于 10 -->
    <template v-if="totalPages < 10">
      <li v-for="page in totalPages" @click="changePage(page)" :key="page">
        <a href="javascript:;" :class="{ 'current': currentPage === page }">{{ page }}</a>
      </li>
    </template>
    <!-- 页数多于 10 -->
    <template v-else>
      <template v-for="page in totalPages">
        <li
          v-if="showOrHide(page)"
          :class="{ 'after': page === 1 && currentPage >= 5, 'before' : page === totalPages && currentPage <= totalPages - 3 }"
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
    <li v-show="currentPage !== totalPages" @click="changePage(currentPage + 1)">
      <a href="javascript:;">下一页</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
    getMainComment: { type: Function },
    type: { type: String, default: '' }
  },
  methods: {
    changePage (page) {
      if (page !== this.currentPage) {
        if (page < 1) page = 1
        if (page > this.totalPages) page = this.totalPages
        this.$emit('getMainComment', page)
      }
    },
    showOrHide (page) {
      return page === 1 || page === this.totalPages || (page < this.currentPage + 3 && page > this.currentPage - 3)
    }
  }
}
</script>

<style lang="less" scoped>
.magin-tb() {
  margin: 10px 0;
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
</style>