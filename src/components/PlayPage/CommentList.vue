<template>
  <div class="comment-wrapper margin">
    <h3 class="title">{{ commentData && commentData.data.all_total ? commentData.data.all_total : 0 }} 评论</h3>
    <!-- 上分页 -->
    <PagingCom
      v-if="commentData && commentData.data.total > commentData.data.limit"
      type="mini"
      :currentPage="currentPage"
      :totalPage="Math.floor(commentData.data.total / commentData.data.limit + 1)"
      @getMainComment="getMainComment"
    />
    <!-- 上 input -->
    <CommentInput v-model="commentText" :submitComment="makeMainComment" :borderb="true" />
    <!-- 评论 -->
    <MainComment
      v-if="commentData && commentData.data.total > 0"
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
      v-if="commentData && commentData.data.total > commentData.data.limit"
      :currentPage="currentPage"
      :totalPage="Math.floor(commentData.data.total / commentData.data.limit + 1)"
      @getMainComment="getMainComment"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      currentPage: 1,
      commentData: null,
      commentText: '',
      showDownInput: false
    }
  },
  watch: {
    $route() {
      this.getMainComment(1)
    }
  },
  methods: {
    /* 获取一级评论 */
    getMainComment(page) {
      this.currentPage = page
      // console.log(this.$route.params.id)
      axios.get(`http://localhost:3000/api/comment/main?vId=${this.$route.params.id}&page=${page}`).then((res) => {
        // 清除二级评论中的输入框
        this.$refs.comment && this.$refs.comment.clearInputId()
        this.commentData = res.data
      })
    },
    /* 获取二级评论 */
    getSubComment(cId, page) {
      // console.log(cId, page)
      axios.get(`http://localhost:3000/api/comment/sub?cId=${this.$route.params.id}&page=${page}`).then((res) => {
        this.commentData.data.comments.find((item) => item.comment.id === cId).children = res.data
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
    submitComment(text, reply) {
      console.log(text, reply, Date.now())
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
