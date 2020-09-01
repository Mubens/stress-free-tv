<template>
  <div class="comment-wrapper margin">
    <h3 class="title">{{ commentData && commentData.data.all_total ? commentData.data.all_total : 0 }} 评论</h3>
    <!-- 上分页 -->
    <PagingCom
      v-if="commentData && commentData.data.total > commentData.data.limit"
      type="mini"
      :currentPage="currentPage"
      :totalPages="Math.floor(commentData.data.total / commentData.data.limit + 1)"
      @getMainComment="getMainComment"
    />
    <!-- 上 input -->
    <CommentInput v-model="commentText" :borderb="true" />
    <!-- 评论 -->
    <MainComment
      v-if="commentData && commentData.data.total > 0"
      :commentData="commentData"
      :getSubComment="getSubComment"
      @watchCommentHeight="watchCommentHeight"
      ref="comment"
    />
    <div class="no-reply" v-else>还没有评论，快来抢占沙发吧！</div>
    <!-- 下 input  -->
    <CommentInput v-if="showDownInput" v-model="commentText" />
    <!-- 下分页 -->
    <PagingCom
      v-if="commentData && commentData.data.total > commentData.data.limit"
      :currentPage="currentPage"
      :totalPages="Math.floor(commentData.data.total / commentData.data.limit + 1)"
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
  methods: {
    /* 获取一级评论 */
    getMainComment(page) {
      this.currentPage = page
      axios.get(`http://localhost:3000/api/comment/main?vId=${23}&page=${page}`).then((res) => {
        this.$refs.comment.clearInputId()
        this.commentData = res.data
      })
    },
    /* 获取二级评论 */
    getSubComment(cId, page) {
      // console.log(cId, page)
      axios.get(`http://localhost:3000/api/comment/sub?cId=${23}&page=${page}`).then((res) => {
        this.commentData.data.comments.find((item) => item.comment.id === cId).children = res.data
      })
    },
    watchCommentHeight(flag) {
      this.showDownInput = flag
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/comment/main?vId=${23}&page=${this.currentPage}`).then((res) => {
      // console.log(res.data)
      this.commentData = res.data
    })
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
