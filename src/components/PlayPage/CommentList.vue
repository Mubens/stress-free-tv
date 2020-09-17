<template>
  <div class="comment-wrapper margin" ref="comment-wrapper">
    <h3 class="title">{{ allTotal }} 评论</h3>
    <!-- 上分页 -->
    <PagingCom
      v-if="mainTotal > limit"
      type="mini"
      :currentPage="currentPage"
      :totalPage="Math.floor(mainTotal / limit + 1)"
      @pageChange="getMainComment"
    />
    <!-- 上 input -->
    <CommentInput v-model="commentText" :submitComment="makeMainComment" :borderb="true" />
    <!-- 评论 -->
    <MainComment
      v-if="mainTotal > 0"
      :commentData="commentData"
      :getSubComment="getSubComment"
      @submitComment="submitComment"
      @watchCommentHeight="watchCommentHeight"
      ref="comment"
    />
    <div class="no-reply" v-else>还没有评论，快来抢占沙发吧！</div>
    <!-- 下 input  -->
    <CommentInput
      v-if="showDownInput && allTotal"
      v-model="commentText"
      :submitComment="makeMainComment"
    />
    <!-- 下分页 -->
    <PagingCom
      v-if="mainTotal > limit"
      :currentPage="currentPage"
      :totalPage="Math.floor(mainTotal / limit + 1)"
      @pageChange="getMainComment"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      // 当前页
      currentPage: 1,
      // 一级评论条数
      mainTotal: 0,
      // 总评论数
      allTotal: 0,
      // 每页条数
      limit: 1,
      // 数据
      commentData: null,
      // 输入评论
      commentText: '',
      // 显示下方输入框
      showDownInput: false
    }
  },
  watch: {
    $route () {
      this.currentPage = 1
      this.mainTotal = 0
      this.allTotal = 0
      this.limit = 0
      this.commentData = null
      this.commentText = ''
      this.getMainComment(1)
    },
    currentPage () {
      this.scrollToTop()
    }
  },
  methods: {
    /* 获取一级评论 */
    getMainComment (page) {
      this.currentPage = page
      // console.log(this.$route.params.id)
      axios.get(`http://localhost:3000/api/comment/main?pId=${this.$route.params.id}&ep=${this.$route.query.ep}&page=${page}`).then(({ status, data }) => {
        // 清除二级评论中的输入框
        this.$refs.comment && this.$refs.comment.clearInputId()
        if (!data.errno) {
          // console.log(data)
          this.commentData = data.data.comments
          this.allTotal = data.data.all_total
          this.mainTotal = data.data.total
          this.limit = data.data.limit
          // this.watchCommentHeight()
        }
      })
    },
    /* 获取二级评论 */
    getSubComment (cId, page) {
      // console.log(cId, page)
      axios.get(`http://localhost:3000/api/comment/sub?cId=${cId}&page=${page}`).then((res) => {
        if (res.status === 200 && !res.data.errno) {
          this.commentData.find((item) => item.id === cId).children = res.data.data
        }
      })
    },
    /* 发表一级评论 */
    makeMainComment () {
      if (this.commentText.trim()) {
        this.submitComment(this.commentText, null)
        this.commentText = ''
      }
    },
    /* 提交评论 */
    submitComment (content, beUserId = undefined, mainId = undefined) {
      // 剧id, 集, 评论内容, 评论/回复人id, 被回复人id, 一级评论id
      const playId = this.$route.params.id
      const ep = this.$route.query.ep
      const userId = 1 // session

      axios.post('http://localhost:3000/api/comment/new', { playId, ep, content, userId, beUserId, mainId }).then(res => {
        if (!res.data.errno) {
          if (beUserId || mainId) {
            const index = this.getMainIndex(mainId)
            this.commentData[index].children.comments.push(...res.data.data)
          } else {
            const data = res.data.data[0]
            data.children = { page: 1, limit: 3, total: 0, comments: [] }
            this.commentData.unshift(data)
            this.scrollToTop()
          }
          this.allTotal++
        }
      })
    },
    /* 获取当前的索引 */
    getMainIndex (mCId) {
      let index = this.commentData.length
      if (index) {
        while (index--) {
          if (this.commentData[index].id === mCId) return index
        }
      }
      return -1
    },
    scrollToTop () {
      window.scrollTo(0, this.$refs['comment-wrapper'].offsetTop)
    },
    watchCommentHeight (flag) {
      this.showDownInput = flag
    }
  },
  mounted () {
    this.getMainComment(1)
  },
  components: {
    PagingCom: () => import('../Pagination/PagingCom'),
    MainComment: () => import('./MainComment'),
    CommentInput: () => import('./CommentInput')
  }
}
</script>

<style lang="less" scoped>
// 评论
.comment-wrapper {
  .title {
    font-weight: 400;
    font-size: 20px;
  }

  .no-reply {
    padding: 30px 0;
    text-align: center;
    font-size: 13px;
    color: #99a2aa;
  }
}
</style>
