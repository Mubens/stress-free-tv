<template>
  <div class="comment-wrapper margin">
    <h3 class="title">{{ allTotal }} 评论</h3>
    <!-- 上分页 -->
    <PagingCom
      v-if="mainTotal > limit"
      type="mini"
      :currentPage="currentPage"
      :totalPage="Math.floor(mainTotal / limit + 1)"
      @getMainComment="getMainComment"
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
    <CommentInput v-if="showDownInput" v-model="commentText" :submitComment="makeMainComment" />
    <!-- 下分页 -->
    <PagingCom
      v-if="mainTotal > limit"
      :currentPage="currentPage"
      :totalPage="Math.floor(mainTotal / limit + 1)"
      @getMainComment="getMainComment"
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
      this.getMainComment(1)
    }
  },
  methods: {
    /* 获取一级评论 */
    getMainComment (page) {
      this.currentPage = page
      // console.log(this.$route.params.id)
      axios.get(`http://localhost:3000/api/comment/main?vId=${this.$route.params.id}&page=${page}`).then(({ status, data }) => {
        // 清除二级评论中的输入框
        this.$refs.comment && this.$refs.comment.clearInputId()
        if (!data.errno) {
          console.log(data)
          this.commentData = data.data.comments
          this.allTotal = data.data.all_total
          this.mainTotal = data.data.total
          this.limit = data.data.limit
        }
      })
    },
    /* 获取二级评论 */
    getSubComment (cId, page) {
      // console.log(cId, page)
      axios.get(`http://localhost:3000/api/comment/sub?cId=${this.$route.params.id}&page=${page}`).then((res) => {
        if (res.status === 200 && !res.data.errno) {
          this.commentData.find((item) => item.comment.id === cId).children = res.data.data
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
    submitComment (text, reply) {
      if (reply == null) {
        // 提交一级评论   评论, 用户id, 时间
        this.commentData.unshift({
          user: {
            id: 1,
            face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
            name: '任评测'
          },
          comment: { id: 199, content: text, like: 0, time: Date.now() },
          children: {}
        })
        this.allTotal++
        console.log(text, 1, Date.now())
      } else {
        // 提交二级评论   评论, 用户id, 一级评论的id, 时间
        // console.log(text, 1, reply.rCId, Date.now())
        // this.getMainIndex(reply.rCId)
        const index = this.getMainIndex(reply.rCId)
        // console.log(this.commentData[index].children)
        this.commentData[index].children.comments.unshift({
          user: {
            id: 1,
            face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
            name: '任评测'
          },
          comment: { id: 199, content: text, like: 0, time: Date.now() },
          reply_user: {
            id: 2,
            face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
            name: '蟑螂恶霸丸子龙'
          }
        })
      }
    },
    /* 获取当前的索引 */
    getMainIndex (mCId) {
      let index = this.commentData.length
      if (index) {
        while (index--) {
          if (this.commentData[index].comment.id === mCId) return index
        }
      }
      return -1
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
