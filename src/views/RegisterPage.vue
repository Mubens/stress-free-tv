<template>
  <div class="register-wrapper">
    <div class="top-line">
      <span>注册</span>
    </div>
    <!-- 昵称 -->
    <FormBox class="register-box" :model="form" :rules="rules">
      <div class="toggle-box">
        <button :class="{ active: usePhone }" @click="toggle(1)">
          手机注册
        </button>
        <button :class="{ active: !usePhone }" @click="toggle(0)">
          邮箱注册
        </button>
      </div>
      <FormItem class="item" prop="name">
        <FormInput placeholder="昵称" v-model.trim="form.name" />
      </FormItem>
      <!-- 密码 -->
      <FormItem class="item" prop="password">
        <FormInput
          type="password"
          placeholder="密码（6-16个字符组成，区分大小写）"
          v-model.trim="form.password"
      /></FormItem>
      <!-- 手机号 -->
      <FormItem
        class="item"
        v-if="usePhone"
        :errMsg="phoneExitErr"
        prop="phone"
        key="phone"
      >
        <FormInput
          placeholder="常用的手机号"
          v-model.trim="form.phone"
          @success="findUserByPhone"
          @input="clearErrMsg"
        />
      </FormItem>
      <!-- 邮箱 -->
      <FormItem
        class="item"
        v-else
        :errMsg="emailExitErr"
        prop="email"
        key="email"
      >
        <FormInput
          placeholder="常用的邮箱"
          v-model.trim="form.email"
          @success="findUserByEmail"
          @input="clearErrMsg"
        />
      </FormItem>
      <!-- 按钮 -->
      <div class="item">
        <label
          class="icon icon-checked"
          :class="{ active: isRemember }"
          @mouseup="isRemember = !isRemember"
        >
          <input type="checkbox" :checked="isRemember" />
          <span @click.stop>仅供学习，不传播，不盈利</span>
        </label>
        <button
          class="register-btn"
          :class="{ active: isRemember }"
          @click="submit"
        >
          注册
        </button>
        <div class="to-login">
          <a href="/login">已有账号，直接登录></a>
        </div>
      </div>
    </FormBox>
  </div>
</template>

<script>
import FormBox from '../components/Form/form-box'
import FormItem from '../components/Form/form-item'
import FormInput from '../components/Form/form-input'

export default {
  data () {
    return {
      usePhone: true,
      isRemember: false,
      form: {
        name: '',
        password: '',
        phone: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请告诉我你的昵称吧', trigger: "change" },
          { min: 2, message: '昵称过短' },
          { max: 16, message: '昵称过长' },
          { pattern: new RegExp(/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/), message: '昵称不可包含除-和_以外的特殊字符' }
        ],
        password: [
          { required: true, message: '请告诉我你的密码呀', trigger: "change" },
          { min: 6, message: '密码不能小于6个字符' },
          { max: 16, message: '密码不能大于16个字符' }
        ],
        phone: [
          { required: true, message: '请告诉我你的手机号哈', trigger: "change" },
          { pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/, message: '手机号格式不对哦' }
        ],
        email: [
          { required: true, message: '请告诉我你的邮箱哈', trigger: "change" },
          { pattern: /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/, message: '邮箱格式不对哦', trigger: "change" }
        ]
      },
      phoneExitErr: '',
      emailExitErr: ''
    }
  },
  methods: {
    toggle (type) {
      this.usePhone = Boolean(type)
    },
    clearErrMsg () {
      this.phoneExitErr = ''
      this.emailExitErr = ''
    },
    async submit () {
      if (!this.isRemember) {
        return
      }
      const { name, password, phone, email } = this.form
      if (name && password && (this.usePhone && phone || !this.usePhone && email)) {
        const key = this.usePhone ? 'phone' : 'email'
        const val = this.usePhone ? phone : email
        try {
          const res = (await this.$http.post('http://localhost:3000/api/user/register', {
            name, password, [key]: val
          })).data

          if (res.errno) {
            console.log(res.message)
          } else {
            this.$router.push({ path: '/login' })
          }
        } catch (error) {

        }
      }
    },
    async findUserByPhone () {
      try {
        const res = (await this.$http.post('http://localhost:3000/api/user/find_phone', { phone: this.form.phone })).data
        // console.log('res', res)
        if (res.errno) {
          this.phoneExitErr = res.message
        } else {
          this.phoneExitErr = ''
        }
      } catch (error) {

      }
    },
    async findUserByEmail () {
      try {
        const res = (await this.$http.post('http://localhost:3000/api/user/find_email', { email: this.form.email })).data
        console.log(res)
        if (res.errno) {
          this.emailExitErr = res.message
        } else {
          this.emailExitErr = ''
        }
      } catch (error) {

      }
    },
  },
  components: {
    FormBox,
    FormItem,
    FormInput
  }
}
</script>

<style lang="less">
.register-wrapper {
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

.register-box {
  width: 420px;
  margin: 0 auto;
  margin-top: 28px;
  // margin-top: 50px;
  padding-top: 40px;

  .toggle-box {
    text-align: center;

    button {
      margin: 0 10px;
      background-color: transparent;
      color: #555555;
    }

    button.active {
      color: #ff6b6b;
    }
  }

  .item {
    position: relative;
    margin: 36px 0;

    .tips {
      color: #ff6b6b;
      position: absolute;
      right: -20px;
      top: 12px;
      transform: translate(100%, 0);
      font-size: 12px;
    }
  }

  .register-btn {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    background-color: #f5f5f5;
    color: #757575;
    cursor: not-allowed;

    &.active:hover {
      background-color: #ff8080;
    }

    &.active {
      background-color: #ff8080;
      color: #ffffff;
      cursor: pointer;
    }
  }

  .icon-checked {
    display: inline-block;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 12px;

    input {
      display: none;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      padding-left: 5px;
      color: #444444;
      vertical-align: middle;
    }
  }

  .icon-checked::before {
    box-sizing: border-box;
    display: inline-block;
    content: "";
    margin-top: 2px;
    width: 12px;
    height: 12px;
    border: 1px solid #cccccc;
    border-radius: 2px;
    vertical-align: middle;
  }

  .icon-checked.active::before {
    content: "\e91c";
    font-size: 12px;
    border: 0;
    color: #ff6b6b;
  }

  .to-login {
    margin-top: 5px;
    text-align: right;
    font-size: 12px;
    a {
      color: #ff6b6b;
    }
  }
}
</style>