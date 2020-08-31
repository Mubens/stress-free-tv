<template>
  <div class="comment-items" ref="comment">
    <div class="comment-item" v-for="item in commentData.data.comments" :key="item.comment.id">
      <div>
        <a href="#" class="user-head">
          <img :src="item.user.face" />
        </a>
      </div>
      <div class="user-comment">
        <span class="user-name">
          <a href="#">{{ item.user.name }}</a>
        </span>
        <div class="comment" v-html="textToHtml(item.comment.content)"></div>
        <div class="info">
          <span class="time">{{ item.comment.time | timeFormat }}</span>
          <span class="like">
            <svg
              t="1598795452303"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1724"
              width="32"
              height="32"
            >
              <path
                d="M860.8 300.8h-297.6l6.4-67.2 9.6-118.4c3.2-16-6.4-32-22.4-35.2-9.6-3.2-22.4 0-28.8 9.6l-147.2 188.8-19.2 25.6h-192c-6.4 0-12.8 3.2-19.2 6.4-19.2 9.6-28.8 28.8-28.8 48v342.4c0 9.6 3.2 22.4 9.6 28.8 9.6 19.2 28.8 28.8 48 25.6h537.6c12.8 0 22.4-3.2 32-9.6 25.6-12.8 44.8-35.2 48-64l102.4-336 57.6 12.8-57.6-12.8c3.2-9.6 0-22.4-3.2-32-9.6-6.4-22.4-12.8-35.2-12.8l6.4-57.6-6.4 57.6z m-233.6-57.6h240c28.8 0 57.6 12.8 76.8 38.4 16 22.4 19.2 54.4 12.8 80l-102.4 339.2c-16 64-70.4 108.8-137.6 112H179.2c-41.6 3.2-80-19.2-99.2-54.4-9.6-19.2-16-38.4-16-57.6V358.4c0-41.6 22.4-80 57.6-99.2 19.2-9.6 38.4-12.8 57.6-16h144L480 48c32-35.2 89.6-38.4 124.8-6.4 19.2 19.2 32 44.8 28.8 73.6l-6.4 128z m-323.2 512h57.6V304H304v451.2z"
                fill
                p-id="1725"
              />
            </svg>
            {{ item.comment.like }}
          </span>
          <span class="hate">
            <svg
              t="1598795465550"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1875"
              width="32"
              height="32"
            >
              <path
                d="M860.8 723.2l6.4 57.6-6.4-57.6c12.8 0 25.6-3.2 35.2-12.8 6.4-9.6 6.4-22.4 3.2-32l57.6-12.8-57.6 12.8L800 342.4c-6.4-28.8-25.6-51.2-48-64-9.6-6.4-22.4-9.6-32-9.6H182.4c-22.4-3.2-41.6 6.4-51.2 25.6-6.4 9.6-6.4 19.2-9.6 28.8v342.4c0 19.2 9.6 38.4 28.8 48 6.4 3.2 12.8 6.4 19.2 6.4h192l19.2 25.6 147.2 188.8c6.4 9.6 19.2 12.8 28.8 9.6 16-3.2 25.6-19.2 22.4-35.2l-9.6-118.4-6.4-67.2h297.6z m-233.6 57.6l9.6 128c3.2 28.8-9.6 54.4-28.8 73.6-35.2 32-92.8 28.8-124.8-6.4l-156.8-195.2H179.2c-19.2 0-38.4-6.4-57.6-16-35.2-19.2-57.6-57.6-57.6-99.2V323.2c0-19.2 6.4-38.4 16-57.6 19.2-38.4 57.6-60.8 99.2-54.4h537.6c67.2 3.2 121.6 48 137.6 112l102.4 339.2c6.4 28.8 3.2 57.6-12.8 80-19.2 22.4-48 38.4-76.8 38.4h-240zM304 268.8v451.2h57.6V268.8H304z"
                fill
                p-id="1876"
              />
            </svg>
          </span>
          <span
            class="reply"
            @click="reply(item.comment.id, [ item.comment.id, item.user.id, item.user.name ])"
          >回复</span>
        </div>
        <SubComment
          :subCommentData="item.children"
          :textToHtml="textToHtml"
          :mainCId="item.comment.id"
          :getSubComment="getSubComment"
          :reply="reply"
        />
        <CommentInput v-if="inputId === item.comment.id" v-model="subCommentText" ref="input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentData: { type: Object, default: () => { } },
    watchCommentHeight: { type: Function },
    getSubComment: { type: Function }
  },
  data () {
    return {
      inputId: 0,
      subCommentText: '',
    }
  },
  methods: {
    textToHtml (text) {
      return text.replace(/ /g, '&#160;').replace(/\n/g, '<br />')
    },
    reply (mainCId, [cId, uId, uNm]) {
      this.inputId = mainCId
      this.subCommentText = ''

      setTimeout(() => {
        this.$refs.input[0].inputFoucs(uNm)
      })
    },
    watchComment () {
      const docHeight = (document.documentElement || document.body).clientHeight
      const flag = this.$refs.comment.clientHeight > docHeight ? true : false
      this.$emit('watchCommentHeight', flag)
    }
  },
  filters: {
    timeFormat (time) {
      const date = new Date(time)
      const Y = date.getFullYear()
      const M = add0(date.getMonth() + 1)
      const D = add0(date.getDate())
      const h = add0(date.getHours())
      const m = add0(date.getMinutes())

      return `${Y}-${M}-${D} ${h}:${m}`

      function add0 (val) {
        return val < 10 ? '0' + val : val
      }
    }
  },
  mounted () {
    // this.watchComment()
    window.addEventListener('resize', this.watchComment)
  },
  updated () {
    this.watchComment()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.watchComment)
  },
  components: {
    SubComment: () => import('./SubComment'),
    CommentInput: () => import('./CommentInput')
  }
}
</script>

<style lang="less" scoped>
.comment-items {
  .comment-item {
    display: flex;
    padding-top: 15px;

    .user-head {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .user-comment {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 25px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e9ef;
    }

    .user-name {
      padding: 4px 0;
      a {
        color: #6d758f;
      }
      .vip {
        color: #ff6b6b;
      }
    }

    .comment {
      line-height: 18px;
      padding-right: 15px;
    }
  }
}
</style>

<style lang="less">
.comment-item .info {
  line-height: 30px;
  font-size: 12px;

  .time {
    margin-right: 5px;
  }

  .like,
  .hate,
  .reply {
    font-size: 13px;
    margin: 0 6px;
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }

    &:hover svg {
      fill: #ff6b6b;
    }
  }

  .reply {
    padding: 4px;
    border-radius: 2px;

    &:hover {
      color: #ff6b6b;
      background-color: #d6dbe2;
    }
  }
}
</style>