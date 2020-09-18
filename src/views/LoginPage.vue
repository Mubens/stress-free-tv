<template>
  <div class="login-wrapper">
    <div class="top-line">
      <span>登录</span>
    </div>
    <div class="login-box">
      <div class="item username">
        <input type="text" placeholder="你的手机号/邮箱" autocomplete="off" />
      </div>
      <div class="item password">
        <input type="password" placeholder="密码" autocomplete="off" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 980px;
  height: 100%;
  margin: 40px auto 0;
}

.top-line {
  width: 980px;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 28px;
  text-align: center;

  span {
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    font-size: 38px;
    background: #f9f9f9;
  }
}

.login-box {
  width: 420px;
  margin: 70px auto 0;

  .item input {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    margin: 20px 0;
    padding: 0 15px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    color: #888;

    &:focus {
      border-color: #ff6b6b;
    }
  }
}
</style>
