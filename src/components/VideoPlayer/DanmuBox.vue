<template>
  <div class="danmu-send" :class="css">
    <div class="danmu-input-wrapper" v-if="isLogin">
      <input
        type="text"
        class="danmu-input"
        :value="danmu"
        @input="$emit('input-danmu', $event.target.value)"
        @keydown.enter="danmuSubmit"
        placeholder="发送弹幕"
      />
      <div class="icon icon-settimg danmu-type">
        <div class="danmu-type-box">
          <div class="selection-box">
            <span>模式</span>
            <div class="danmu-mode">
              <div
                class="danmu-mode-type"
                :class="danmuType === 0 ? 'selected' : ''"
                @click="changeDanmuType(0)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path
                    d="M23 3H5a4 4 0 00-4 4v14a4 4 0 004 4h18a4 4 0 004-4V7a4 4 0 00-4-4zM11 9h6a1 1 0 010 2h-6a1 1 0 010-2zm-3 2H6V9h2v2zm4 4h-2v-2h2v2zm9 0h-6a1 1 0 010-2h6a1 1 0 010 2z"
                  />
                </svg>
                <span>滚动</span>
              </div>
              <div
                class="danmu-mode-type"
                :class="danmuType === 1 ? 'selected' : ''"
                @click="changeDanmuType(1)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path
                    d="M23 3H5a4 4 0 00-4 4v14a4 4 0 004 4h18a4 4 0 004-4V7a4 4 0 00-4-4zM9 9H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"
                  />
                </svg>
                <span>顶部</span>
              </div>
              <div
                class="danmu-mode-type"
                :class="danmuType === 2 ? 'selected' : ''"
                @click="changeDanmuType(2)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path
                    d="M23 3H5a4 4 0 00-4 4v14a4 4 0 004 4h18a4 4 0 004-4V7a4 4 0 00-4-4zM9 21H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"
                  />
                </svg>
                <span>底部</span>
              </div>
            </div>
          </div>
          <div class="selection-box">
            <span>颜色</span>
            <div class="color-items">
              <span
                v-for="color in colorList"
                :style="{ 'background-color': color }"
                :class="danmuColor === color ? 'selected' : ''"
                @click="changeDanmuColor(color)"
                :key="color"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      isLogin: true,
      danmuType: 0,
      danmuColor: '#FFFFFF',
      colorList: ['#FE0302', '#FF7204', '#FFAA02', '#FFD302', '#FFFF00', '#A0EE00', '#00CD00', '#019899', '#4266BE', '#89D5FF', '#CC0273', '#222222', '#9B9B9B', '#FFFFFF']
    }
  },
  methods: {
    changeDanmuType (type) {
      this.danmuType = type
    },
    changeDanmuColor (color) {
      this.danmuColor = color
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

  .danmu-input-wrapper {
    position: relative;
    width: 100%;
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

  .danmu-type {
    position: absolute;
    top: 50%;
    left: 5px;
    z-index: 99;
    transform: translateY(-50%);
    transition: color 0.2s;
    cursor: pointer;
  }

  .danmu-type:hover {
    color: #ff6b6b;
    .danmu-type-box {
      visibility: visible;
    }
  }

  .danmu-type-box {
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 200px;
    // height: 200px;
    padding: 15px;
    border-radius: 2px;
    color: #ffffff;
    font-size: 14px;
    background-color: rgba(27, 27, 27, 0.863);
    transform: translate(-50%, -32px);
    z-index: 99;
    cursor: default;
    visibility: hidden;
    transition: visibility 0.3s;

    .danmu-mode {
      display: flex;
      padding: 8px 0;
    }

    .danmu-mode-type {
      display: flex;
      flex-direction: column;
      margin-right: 15px;
      font-size: 12px;
      cursor: pointer;

      svg {
        width: 24px;
        fill: #ffffff;
      }
      &.selected {
        color: #ff6b6b;
        svg {
          fill: #ff6b6b;
        }
      }
    }

    .color-items {
      display: flex;
      flex-wrap: wrap;
      padding: 4px 0;
      span {
        position: relative;
        box-sizing: border-box;
        width: 17px;
        height: 17px;
        margin: 6px 6px 0 0;
        border-radius: 2px;
        cursor: pointer;
      }

      span.selected {
        box-shadow: 0.5px 0.5px 0px 1.5px #ffffff;
        &::before {
          position: absolute;
          content: "";
          width: calc(100% - 1px);
          height: calc(100% - 1px);
          border: 1px solid #000000;
          border-radius: 3px;
        }
      }
    }
  }

  .icon {
    font-size: 20px;
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