<template>
  <div class="comment-input">
    <div class="user-face">
      <img :src="face" />
    </div>
    <div class="textarea-input" :class="{ 'border-bottom': borderb }">
      <textarea
        class="textarea real"
        v-if="isLogin"
        :placeholder="placeholder"
        :value="commentText"
        @input="$emit('text-input', $event.target.value)"
        ref="input"
      ></textarea>
      <div class="textarea to-login" v-else>
        请先
        <a href="/login" style="color: #FF6B6B">登录</a>
      </div>
      <button @click="submitComment">发表评论</button>
    </div>
  </div>
</template>

<script>


export default {
  model: {
    prop: 'commentText',
    event: 'text-input'
  },
  props: {
    borderb: { type: Boolean, default: false },
    commentText: { type: String, default: '' },
    submitComment: { type: Function, default: () => { } }
  },
  data () {
    return {
      face: require('../../images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'),
      placeholder: '请输入你要发表的评论'
    }
  },
  methods: {
    inputFoucs (placeholder) {
      this.placeholder = `回复@${placeholder}:`
      this.$refs.input.focus()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  }
}
</script>

<style lang="less" scoped>
.comment-input {
  display: flex;
  width: 100%;
  height: 94px;
  align-items: center;

  .user-face {
    width: 48px;
    min-width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .textarea-input {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    margin-left: 25px;
    padding: 15px 0;

    &.border-bottom {
      border-bottom: 1px solid #e5e9ef;
    }
  }

  .textarea {
    box-sizing: border-box;
    flex: auto;
    height: 64px;
    margin-right: 10px;
    padding: 8px 0 0 10px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    background-color: #f4f5f7;
    font-size: 13px;
    color: #555555;
    resize: none;

    &.real:hover,
    &.real:focus {
      border-color: #ff6b6b;
      background-color: #ffffff;
    }
  }

  .to-login {
    padding: 0;
    text-align: center;
    line-height: 64px;
  }

  button {
    width: 70px;
    height: 64px;
    padding: 0 20px;
    border-radius: 4px;
    background-color: #ff6b6b;
    color: #ffffff;
    transition: all 0.2s;

    &:hover {
      background-color: #ff8080;
    }
  }
}
</style>
