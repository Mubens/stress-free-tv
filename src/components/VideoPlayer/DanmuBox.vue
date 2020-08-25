<template>
  <div class="danmu-send" :class="css">
    <input
      type="text"
      class="danmu-input"
      v-if="isLogin"
      :value="danmu"
      @input="$emit('input-danmu', $event.target.value)"
      placeholder="发送弹幕"
    />
    <span class="danmu-input" v-else>
      请先
      <a href="#">登录</a>
    </span>
    <input type="button" class="danmu-submit" value="发送" @click="danmuSubmit" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'danmu',
    event: 'input-danmu'
  },
  props: {
    css: { type: String, default: '' },
    danmu: { type: String, default: '' },
    danmuSubmit: { type: Function, default: () => { } }
  },
  data () {
    return {
      isLogin: true
    }
  }
}
</script>

<style lang="less">
.danmu-send {
  display: flex;
  width: 100%;
  height: 30px;

  &.transparent {
    height: 33px;
    .danmu-input {
      border: none;
      background-color: rgba(255, 255, 255, 0.4);
      color: #ffffff;

      &::-webkit-input-placeholder {
        color: #ffffff;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #ffffff;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #ffffff;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #ffffff;
      }
    }
  }

  .danmu-input {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-left: 30px;
    padding-top: 2px;
    line-height: 30px;
    border: 1px solid #e7e7e7;
    border-radius: 2px 0 0 2px;
    background-color: #f4f4f4;
    // font-size: 14px;
    a {
      color: #ff6b6b;
    }
  }

  .danmu-submit {
    width: 80px;
    height: 100%;
    border-radius: 0 2px 2px 0;
    color: white;
    background-color: #ff6b6b;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #ff8080;
    }
  }
}
</style>