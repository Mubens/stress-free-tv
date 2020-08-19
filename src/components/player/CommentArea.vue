<template>
  <div class="comment-wrapper">
    <div class="comment-header">
      <div></div>
      <!-- 上分页 -->
      <PagingSmall :page="comments.page" :pages="comments.pages" :commentsHeight="commentsHeight" />
    </div>
    <!-- 上发表评论 -->
    <coment-input />
    <!-- 评论内容 -->
    <div class="comment-content" ref="comments">
      <ul>
        <!-- 外层评论 -->
        <li class="uter" v-for="(item, i) in comments.contents" :key="i">
          <!-- 头像 -->
          <div class="user-face">
            <a href="#">
              <img :src="item.user_face" alt />
            </a>
          </div>
          <div class="con">
            <!-- 用户名 -->
            <div class="user">
              <a href="#">{{ item.user }}</a>
            </div>
            <!-- 评论内容 -->
            <p class="text">{{ item.content }}</p>
            <!-- 时间等 -->
            <div class="info">
              <span class="time">2020-01-01 10:20</span>
              <span class="zan">
                <i class="iconfont icon-zan"></i>
                <span>100</span>
              </span>
              <span class="cai">
                <i class="iconfont icon-cai"></i>
              </span>
              <span class="reply btn-hover btn-highlight">回复</span>
              <div class="operation" style="display: none;">
                <div class="spot"></div>
                <div class="opera-list">
                  <ul>
                    <li class="blacklist">加入黑名单</li>
                    <li class="report">举报</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 内层评论 -->
            <ul class="reply-box">
              <li v-for="(initem, i) in item.comments.contents" :key="i">
                <div class="user-face sm">
                  <a href="#"></a>
                </div>
                {{ initem.content }}
              </li>
              <!-- 分页 -->
              <PagingSmall
                :page="item.comments.page"
                :pages="item.comments.pages"
                :commentsHeight="commentsHeight"
              />
            </ul>
            <coment-input />
          </div>
        </li>
      </ul>
    </div>
    <!-- 下分页 -->
    <PagingBig :page="comments.page" :pages="comments.pages" :commentsHeight="commentsHeight" />
    <!-- 下发表评论 -->
    <coment-input v-if="showBottom" />
  </div>
</template>

<script>
import ComentInput from './ComentInput'
import PagingSmall from './paging/PagingSmall'
import PagingBig from './paging/PagingBig'

export default {
  data () {
    return {
      currentPage: 1,
      showBottom: false,
      comments: {
        page: 2,
        pages: 20,
        contents: [
          {
            user: 'Muben',
            user_face: '',
            content: '没玩过这个系列但是想入坑的话是先玩2代还是先玩1带重制版？',
            comments: {
              page: 1,
              pages: 4,
              contents: [
                {
                  user: 'Lisa',
                  user_face: '',
                  content:
                    '没玩过这个系列但是想入坑的话是先玩2代还是先玩1带重制版？'
                },
                {
                  user: 'Lisa',
                  user_face: '',
                  content:
                    '没玩过这个系列但是想入坑的话是先玩2代还是先玩1带重制版？'
                },
                {
                  user: 'Lisa',
                  user_face: '',
                  content:
                    '没玩过这个系列但是想入坑的话是先玩2代还是先玩1带重制版？'
                },
                {
                  user: 'Lisa',
                  user_face: '',
                  content:
                    '没玩过这个系列但是想入坑的话是先玩2代还是先玩1带重制版？'
                }
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    commentsHeight () {
      let height = this.$refs.comments.offsetHeight
      let maxHeight = document.documentElement.clientHeight
      if (height > maxHeight) {
        this.showBottom = true
      } else {
        this.showBottom = false
      }
    }
  },
  components: {
    ComentInput,
    PagingSmall,
    PagingBig
  },
  mounted () {
    this.commentsHeight()
  }
}
</script>
<style scoped>
.comment-wrapper {
  width: 100%;
}
.comment-header {
  display: flex;
  height: 38px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e9ef;
}

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

/* 评论区主体 */
.comment-content .uter {
  display: flex;
  font-size: 14px;
  box-sizing: border-box;
  min-height: 110px;
  padding: 22px 0 14px 0;
  border-bottom: 1px solid #e5e9ef;
}
.con .user a {
  color: #6d757a;
}
.comment-content .uter .con {
  flex: auto;
  margin-left: 10px;
}
li .con .info {
  font-size: 12px;
  color: #99a2aa;
}
</style>

<style lang="less">
.comment-content {
  .user {
    margin-bottom: 10px;
  }
  p {
    line-height: 24px;
  }
  .info {
    margin-top: 8px;
    .zan,
    .cai {
      cursor: pointer;
      i {
        font-size: 18px;
        margin-left: 10px;
        vertical-align: -2px;
      }
      &:hover .iconfont {
        color: #00a1d6;
      }
    }
    .reply {
      padding: 5px;
      border-radius: 2px;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        background-color: #e5e9ef;
      }
    }
  }
}
</style>
