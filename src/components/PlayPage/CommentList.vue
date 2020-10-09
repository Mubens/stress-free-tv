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
      :deleteComment="deleteComment"
      @submitComment="submitComment"
      @watchCommentHeight="watchCommentHeight"
      :user_id="user_id"
      ref="comment"
    />
    <div class="no-reply" v-else>还没有评论，快来抢占沙发吧！</div>
    <!-- 下 input  -->
    <CommentInput v-if="showDownInput && allTotal" v-model="commentText" :submitComment="makeMainComment" />
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
export default {
  data() {
    return {
      user_id: undefined,
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
    $route() {
      this.currentPage = 1
      this.mainTotal = 0
      this.allTotal = 0
      this.limit = 0
      this.commentData = null
      this.commentText = ''
      this.getMainComment(1)
    },
    currentPage() {
      this.scrollToTop()
    }
  },
  methods: {
    /* 获取一级评论 */
    getMainComment(page) {
      this.currentPage = page
      // console.log(this.$route.params.id)
      this.$http
        .get(
          `http://localhost:3000/api/comment/main?pId=${this.$route.params.id}&ep=${this.$route.query.ep}&page=${page}`
        )
        .then(({ status, data }) => {
          // 清除二级评论中的输入框
          this.$refs.comment && this.$refs.comment.clearInputId()
          if (!data.errno) {
            // console.log(data)
            this.commentData = data.data.comments
            this.user_id = data.data.user_id
            this.allTotal = data.data.all_total
            this.mainTotal = data.data.total
            this.limit = data.data.limit
            // this.watchCommentHeight()
          }
        })
    },
    /* 获取二级评论 */
    getSubComment(cId, page) {
      // console.log(cId, page)
      this.$http.get(`http://localhost:3000/api/comment/sub?cId=${cId}&page=${page}`).then((res) => {
        if (res.status === 200 && !res.data.errno) {
          this.commentData.find((item) => item.id === cId).children = res.data.data
        }
      })
    },
    /* 发表一级评论 */
    makeMainComment() {
      if (this.commentText.trim()) {
        this.submitComment(this.commentText, null)
        this.commentText = ''
      }
    },
    /* 提交评论 */
    submitComment(content, beUserId = undefined, mainId = undefined) {
      // 剧id, 集, 评论内容, 评论/回复人id, 被回复人id, 一级评论id
      const playId = this.$route.params.id
      const ep = this.$route.query.ep
      const userId = this.$store.state.user_id // session

      this.$http
        .post('http://localhost:3000/api/comment/new', {
          playId,
          ep,
          content,
          userId,
          beUserId,
          mainId,
          token: this.$store.state.token
        })
        .then((res) => {
          // console.log(res)
          if (!res.data.errno) {
            this.allTotal++
            if (beUserId || mainId) {
              const index = this.getMainIndex(mainId)
              this.commentData[index].children.comments.push(...res.data.data)
            } else {
              const data = res.data.data[0]
              data.children = { page: 1, limit: 3, total: 0, comments: [] }
              this.commentData.unshift(data)
              this.scrollToTop()
            }
          }
        })
    },
    deleteComment(main_id, sub_id) {
      this.$http
        .post('http://localhost:3000/api/comment/del', {
          comment_id: sub_id || main_id,
          token: this.$store.state.token
        })
        .then((res) => {
          // console.log(res)
          if (!res.data.errno) {
            const main_index = this.getMainIndex(main_id)

            if (sub_id) {
              // 删除二级评论
              this.allTotal--
              const sub_index = this.getSubIndex(sub_id, main_index)
              this.commentData[main_index].children.comments.splice(sub_index, 1)
            } else {
              // 删除一级评论
              this.allTotal -= this.commentData[main_index].children.comments.length + 1
              this.commentData.splice(main_index, 1)
            }
          }
        })
    },
    /* 获取当前的索引 */
    getMainIndex(mCId) {
      let index = this.commentData.length
      if (index) {
        while (index--) {
          if (this.commentData[index].id === mCId) return index
        }
      }
      return -1
    },
    getSubIndex(sub_comment_id, main_comment_index) {
      let index = this.commentData[main_comment_index].children.comments.length
      if (index) {
        while (index--) {
          if (this.commentData[main_comment_index].children.comments[index].id === sub_comment_id) return index
        }
      }
      return -1
    },
    scrollToTop() {
      window.scrollTo(0, this.$refs['comment-wrapper'].offsetTop)
    },
    watchCommentHeight(flag) {
      this.showDownInput = flag
    }
  },
  mounted() {
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
