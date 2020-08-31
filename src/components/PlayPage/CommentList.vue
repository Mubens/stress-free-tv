<template>
  <div class="comment-wrapper margin">
    <h3 class="title">{{ commentData.data.all_total ? commentData.data.all_total : 0 }} 评论</h3>
    <!-- 上分页 -->
    <PagingCom
      v-if="commentData.data.total > commentData.data.limit"
      type="mini"
      :currentPage="currentPage"
      :totalPages="Math.floor(commentData.data.total / commentData.data.limit + 1)"
      @getMainComment="getMainComment"
    />
    <!-- 上 input -->
    <CommentInput v-model="commentText" :borderb="true" />
    <!-- 评论 -->
    <MainComment
      v-if="commentData.data.total > 0"
      :commentData="commentData"
      :getSubComment="getSubComment"
      @watchCommentHeight="watchCommentHeight"
    />
    <div class="no-reply" v-else>还没有评论，快来抢占沙发吧！</div>
    <!-- 下 input  -->
    <CommentInput v-if="showDownInput" v-model="commentText" />
    <!-- 下分页 -->
    <PagingCom
      v-if="commentData.data.total > commentData.data.limit"
      :currentPage="currentPage"
      :totalPages="Math.floor(commentData.data.total / commentData.data.limit + 1)"
      @getMainComment="getMainComment"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      commentData: {
        errno: 0,
        msg: 'main comment',
        data: {
          page: 1,
          limit: 20,
          total: 7,
          all_total: 9,
          comments: [
            {
              user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 1, content: '奥利给!', like: 66, time: 1598847947510 },
              children: {
                errno: 0,
                msg: 'hot sub comment',
                data: {
                  page: 1,
                  limit: 3,
                  total: 4,
                  comments: [
                    {
                      user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
                      reply_user: { id: 2, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
                      comment: { id: 4, content: '奥利给!', like: 9, time: 1598895699542 }
                    },
                    {
                      user: { id: 2, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
                      reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
                      comment: { id: 2, content: '奥利给!', like: 6, time: 1598847999542 }
                    },
                    {
                      user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
                      reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
                      comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
                    }
                  ]
                }
              }
            },
            {
              user: { id: 4, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 3, content: '奥利给!', time: 1598849947510 },
              children: {
                data: {
                  page: 1,
                  limit: 3,
                  total: 0,
                  comments: []
                }
              }
            },
            {
              user: { id: 4, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 5, content: '奥利给!', time: 1598849947510 },
              children: {
                data: {
                  page: 1,
                  limit: 3,
                  total: 0,
                  comments: []
                }
              }
            },
            {
              user: { id: 4, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 6, content: '奥利给!', time: 1598849947510 },
              children: {
                data: {
                  page: 1,
                  limit: 3,
                  total: 0,
                  comments: []
                }
              }
            },
            {
              user: { id: 4, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 7, content: '奥利给!', time: 1598849947510 },
              children: {
                data: {
                  page: 1,
                  limit: 3,
                  total: 0,
                  comments: []
                }
              }
            },
            {
              user: { id: 4, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 8, content: '奥利给!', time: 1598849947510 },
              children: {
                data: {
                  page: 1,
                  limit: 3,
                  total: 0,
                  comments: []
                }
              }
            },
            {
              user: { id: 4, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: null,
              comment: { id: 9, content: '奥利给!', time: 1598849947510 },
              children: {
                data: {
                  page: 1,
                  limit: 3,
                  total: 0,
                  comments: []
                }
              }
            }
          ]
        }
      },
      commentText: '',
      showDownInput: false
    }
  },
  methods: {
    getMainComment (page) {
      this.currentPage = page
      // axios()
      // this.commentData = 
    },
    watchCommentHeight (flag) {
      this.showDownInput = flag
    },
    getSubComment (cId, page) {
      // console.log(cId, page)
      this.commentData.data.comments.find(item => item.comment.id === cId).children = {
        errno: 0,
        msg: 'sub comment',
        data: {
          page: 1,
          limit: 10,
          total: 11,
          comments: [
            {
              user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: { id: 2, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 4, content: '奥利给!', like: 9, time: 1598895699542 }
            },
            {
              user: { id: 2, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '奥利给!', like: 6, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            },
            {
              user: { id: 5, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'Niu' },
              reply_user: { id: 1, face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'), name: 'XXX' },
              comment: { id: 2, content: '66666', like: 5, time: 1598847999542 }
            }
          ]
        }
      }
    }
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