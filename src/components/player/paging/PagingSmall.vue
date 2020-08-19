<template>
  <div v-if="pages > 1" class="top-pages">
    <ul>
      <li>共{{ pages }}页</li>
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
              :style="n === currentPage ? 'color: #00a1d6;' : ''"
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
        if (val > this.comments.pages) {
          val = this.comments.pages
        }
        this.currentPage = val
        this.$emit('commentsHeight')
      }
      e.target.value = ''
    }
  },
  mounted() {
    console.log(this.page)
    this.currentPage = this.page ? this.page : this.currentPage
  }
}
</script>

<style lang="less">
.top-pages {
  font-size: 12px;
}
.top-pages ul {
  display: flex;
}
.top-pages ul li {
  margin: 0 4px;
}
.after::after {
  margin-left: 5px;
  content: '...';
}
.before::before {
  margin-right: 5px;
  content: '...';
}
</style>
