<template>
  <div v-if="pages > 1" class="bottom-pages">
    <ul>
      <li>
        <a href="javascript:;" v-if="this.currentPage !== 1" @click="prev"
          >上一页</a
        >
      </li>
      <template v-for="n in pages">
        <template v-if="pages > 10">
          <li
            :class="
              n === 1 && currentPage >= 5
                ? 'after'
                : n === pages && currentPage <= pages - 3
                ? 'before'
                : ''
            "
            v-if="
              pages > 10 &&
                ((n <= currentPage + 2 && n >= currentPage - 2) ||
                  n === 1 ||
                  n === pages)
            "
            :key="n"
          >
            <a
              href="javascript:;"
              @click="pageChange($event)"
              :class="n === currentPage ? 'current' : ''"
              >{{ n }}</a
            >
          </li>
        </template>
        <li :key="n" v-else>
          <a
            href="javascript:;"
            @click="pageChange($event)"
            :style="n === currentPage ? 'color: #00a1d6;' : ''"
            >{{ n }}</a
          >
        </li>
      </template>
      <li>
        <a href="javascript:;" v-if="this.currentPage !== pages" @click="next"
          >下一页</a
        >
      </li>
      <li class="set-page">
        共{{ pages }}页，跳至
        <input type="text" value ref="setPage" @keydown.enter="setPage" />页
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['page', 'pages', 'commentsHeight'],
  data() {
    return {
      currentPage: this.page || 1
    }
  },
  methods: {
    pageChange(e) {
      this.currentPage = e.target.innerText * 1
      this.$emit('commentsHeight')
    },
    prev() {
      this.currentPage--
      this.$emit('commentsHeight')
    },
    next() {
      this.currentPage++
      this.$emit('commentsHeight')
    },
    setPage(e) {
      let val = parseInt(e.target.value)
      if (!isNaN(val)) {
        if (val < 1) {
          val = 1
        }
        if (val > this.pages) {
          val = this.pages
        }
        this.currentPage = val
        this.$emit('commentsHeight')
      }
      e.target.value = ''
    }
  },
  mounted() {}
}
</script>

<style lang="less">
.bottom-pages {
  margin: 20px 0 5px 0;
}
.bottom-pages ul {
  display: flex;
  text-align: center;
  align-items: center;
}
.bottom-pages ul li a {
  display: inline-block;
  min-width: 20px;
  margin: 0 2px;
  padding: 8px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #fff;
}
.bottom-pages ul li a:hover {
  color: #fff;
  background-color: #00a1d6;
  border-color: #00a1d6;
}
.bottom-pages .current {
  color: #fff;
  background-color: #00a1d6;
  border-color: #00a1d6;
}
.bottom-pages .before::before,
.bottom-pages .after::after {
  margin: 0 5px;
}
.set-page {
  flex: auto;
  margin-right: 5px;
  text-align: right;
  font-size: 12px;
  color: #b2aac7;
}
.set-page input {
  width: 46px;
  height: 24px;
  margin: 0 5px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  font-size: 12px;
}
</style>
