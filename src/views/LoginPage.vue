<template>
  <div class="login-wrapper">
    <div class="top-line">
      <span>登录</span>
    </div>
    <div class="login-box">
      <div class="item username">
        <input
          type="text"
          :class="{ error: userErr }"
          v-model="username"
          @input="userBlur"
          placeholder="你的手机号/邮箱"
          autocomplete="off"
        />
        <p class="tips">
          {{ userErr ? "请输入注册时用的邮箱或者手机号呀" : "" }}
        </p>
      </div>
      <div class="item password">
        <input
          type="password"
          :class="{ error: pwdErr }"
          v-model="password"
          @input="pwdBlur"
          placeholder="密码"
          autocomplete="off"
        />
        <p class="tips">{{ pwdErr ? "喵，你没输入密码么？" : "" }}</p>
      </div>
      <div class="btn-box">
        <a class="btn btn-log" @click="login">登录</a>
        <a href="/register" class="btn btn-reg">注册</a>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      username: '',
      password: '',
      userErr: false,
      pwdErr: false
    }
  },
  methods: {
    userBlur () {
      if (!this.username) {
        this.userErr = true
      } else {
        this.userErr = this.pwdErr = false
      }
    },
    pwdBlur () {
      if (!this.password) {
        this.pwdErr = true
      } else {
        this.pwdErr = false
      }
    },
    login () {
      this.$http.post('http://localhost:3000/api/user/login', {
        phone: this.username,
        password: this.password
      }).then(res => {
        console.log(res)
        if (!res.data.errno) {
          this.$store.commit('setToken', res.data.data)
          this.$router.back(-1)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 980px;
  height: 100%;
  margin: 0 auto;
  margin-top: 40px;
}

.top-line {
  width: 980px;
  height: 28px;
  // margin: 0 auto;
  margin-bottom: 28px;
  border-bottom: 1px solid #ddd;
  text-align: center;

  span {
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    font-size: 38px;
    background: #ffffff;
  }
}

.login-box {
  width: 420px;
  margin: 0 auto;
  margin-top: 28px;
  // margin-top: 50px;
  padding-top: 40px;

  .item {
    position: relative;

    input {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      padding: 0 15px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      color: #888;

      &.error {
        border-color: #ff6b6b;
      }
    }

    span {
      position: absolute;
      top: 50%;
      right: -20px;
      transform: translate(0, -50%);
    }

    .tips {
      height: 20px;
      margin: 6px 0;
      font-size: 12px;
      line-height: 20px;
      color: #ff6b6b;
    }
  }
}

.btn-box {
  display: flex;
  justify-content: space-between;

  .btn {
    width: 40%;
    height: 38px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    line-height: 38px;
    text-align: center;
  }

  .btn-log {
    color: #ffffff;
    background-color: #ff6b6b;
    cursor: pointer;
  }

  .btn-reg {
    color: #555;
  }
}
</style>
