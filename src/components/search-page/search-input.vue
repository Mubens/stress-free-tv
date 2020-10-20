<template>
  <div class="search-input-box" :class="{ 'index-page': role === 'index' }">
    <div class="search-wrap">
      <input
        type="text"
        v-model.trim="keyword"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @compositionstart="chineseEnd = false"
        @compositionend="chineseEnd = true"
        @input="handleInput"
        @keydown.enter="clickSearchBtn(keyword)"
      />
      <div
        class="suggest-box"
        v-show="active"
        tabindex="1"
        @mousedown="isShow = true"
        @blur="isShow = false"
      >
        <!-- 后端数据 -->
        <ul v-show="keyword" key="data">
          <li
            v-for="item in searchList"
            @click="clickSearchBtn(item.title)"
            :key="item.id"
          >
            <div class="title" v-html="highlight(item.title)"></div>
          </li>
        </ul>
        <!-- localStorage -->
        <ul v-show="!keyword" key="local">
          <li
            v-for="(item, i) in historyList"
            @click.self="clickSearchBtn(item.keyword)"
            :key="i"
          >
            <span>{{ item.keyword }}</span>
            <i
              class="icon icon-delete"
              @click="deleteHistorySearchByIndex(i)"
            ></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-btn" @click="clickSearchBtn(keyword)">
      <i class="icon icon-search"></i>
      <span v-if="role !== 'index'">搜索</span>
    </div>
  </div>
</template>

<script>
import { getLocal, setLocal, delLocal } from '@/assets/js/storage'

export default {
  props: {
    role: { type: String, default: '' }
  },
  data () {
    return {
      keyword: this.$route.query.keyword || '',
      historyList: this.getHistorySearch(),
      searchList: [],
      isFocus: false,
      isShow: false,
      chineseEnd: true,
      timeout: null
    }
  },
  computed: {
    active () {
      return (this.isFocus || this.isShow) && (this.keyword
        ? this.searchList.length > 0
        : this.historyList.length > 0)
    }
  },
  methods: {
    /* 点击搜索按钮 */
    clickSearchBtn (keyword) {
      keyword = keyword.trim()
      if (keyword) {
        this.$emit('search', keyword)
        this.isFocus = this.isShow = false
        this.setHistorySearch(keyword)
        this.historyList = this.getHistorySearch()
      }
    },
    /* 输入框 input 事件 */
    handleInput () {
      this.searchList = []
      if (this.chineseEnd) {
        this.timeout && clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.isFocus = true
          // console.log(this.keyword)
          this.getSuggest(this.keyword)
        }, 200)
      }
    },
    /* 模糊查询 */
    async getSuggest (keyword) {
      if (keyword) {
        try {
          const res = (await this.$http.get(`http://localhost:3000/api/play/input_suggest?keyword=${keyword}`)).data

          if (!res.errno) {
            this.searchList = res.data
          }
        } catch (err) {

        }
      }
    },
    /* 匹配项 highlight */
    highlight (title = '') {
      return title.replace(new RegExp(this.keyword, 'g'), `<em style="font-style: normal;color: #ff6b6b;">${this.keyword}</em>`)
    },
    /* 获取历史记录 */
    getHistorySearch () {
      return getLocal('sftv-search') || []
    },
    /* 添加搜索记录 */
    setHistorySearch (keyword) {
      const index = this.historyList.findIndex(item => item.keyword === keyword)

      if (index > -1) {
        this.historyList.splice(index, 1)
      }

      this.historyList.unshift({ keyword, href: `http://localhost:8080/search?keyword=${keyword}` })

      if (this.historyList.length > 10) {
        this.historyList.pop()
      }
      this.saveHistorySearch()
    },
    /* 保存搜索记录 */
    saveHistorySearch () {
      setLocal('sftv-search', this.historyList)
    },
    /* 删除某条记录 */
    deleteHistorySearchByIndex (index) {
      this.historyList.splice(index, 1)
      this.saveHistorySearch()
    }
  }
}
</script>

<style lang="less" scoped>
.search-input-box {
  display: flex;
  justify-content: center;

  .search-wrap {
    position: relative;
  }

  input {
    width: 300px;
    height: 40px;
    font-size: 16px;
    padding: 0 20px;
    border: 2px solid #ccd0d7;
    border-radius: 4px;
  }

  .search-btn {
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding: 0 20px;
    border-radius: 4px;
    background-color: #ff6b6b;
    font-size: 16px;
    color: #ffffff;
    transition: all 0.1s;
    cursor: pointer;

    &:hover {
      background-color: #ff8080;
    }

    i {
      font-size: 18px;
      transform: translate(-7px, 1px);
    }
  }

  .suggest-box {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    // height: 300px;
    margin-top: 5px;
    padding: 5px 0;
    border-radius: 4px;
    border: 1px solid #e5e9ef;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    z-index: 99;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 0 10px;
      cursor: pointer;
    }

    li:hover {
      background-color: #f4f4f4;
    }

    span {
      display: inline-block;
      flex: 1;
    }

    .icon {
      font-size: 12px;
    }
  }
}

.search-input-box.index-page {
  input {
    height: 32px;
    border-width: 1px;
    border-radius: 4px 0 0 4px;
    font-size: 14px;
  }

  .search-btn {
    margin-left: 0;
    padding: 0 10px 0 20px;
    border-radius: 0 4px 4px 0;
    background-color: #ccd0d7;

    i {
      font-size: 14px;
      color: #535353;
    }
  }
}
</style>