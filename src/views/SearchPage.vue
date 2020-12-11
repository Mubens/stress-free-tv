<template>
  <div class="search-wrap">
    <SearchInput @search="search" />
    <SearchList :total="total" :list="dataList" />
    <PagingCom
      v-if="totalPage > 1"
      class="pagination"
      :currentPage="page"
      :totalPage="totalPage"
      @pageChange="changePage"
    />
  </div>
</template>

<script>
import SearchInput from '../components/Search/search-input'
import SearchList from '../components/Search/search-list'
import PagingCom from '../components/Pagination/PagingCom'

export default {
  data () {
    return {
      total: 0,
      page: +this.$route.query.page || 1,
      totalPage: 1,
      dataList: [],
      keyword: this.$route.query.keyword || ''
    }
  },
  watch: {
    keyword (keyword) {
      if (this.$route.query.keyword !== keyword) {
        this.$router.push({ query: { keyword, page: this.page } })
      }
    },
    page (page) {
      if (+this.$route.query.page !== page) {
        this.$router.push({ query: { keyword: this.keyword, page } })
      }
    }
  },
  methods: {
    async search (keyword) {
      this.keyword = keyword
      if (this.keyword) {
        // console.log(`http://localhost:3000/api/play/search?keyword=${keyword}&page=${this.page}`)
        try {
          const res = (await this.$http.get(`http://localhost:3000/api/play/search?keyword=${keyword}&page=${this.page}`)).data
          if (res.data.list) {
            this.total = res.data.total
            this.totalPage = res.data.total / res.data.limit
            this.dataList = res.data.list
            // console.log(res)
          }
        } catch (err) {

        }
      }

    },
    changePage (page) {
      this.page = page
      this.search(this.keyword)
    }
  },
  created () {
    this.search(this.keyword)
  },
  components: { SearchInput, SearchList, PagingCom }
}
</script>

<style lang="less" scoped>
.search-wrap {
  width: 1080px;
  height: 1000px;
  margin: 20px auto 0;

  .pagination {
    width: 80%;
    margin: 0 auto;
  }
}
</style>