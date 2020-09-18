<template>
  <div class="user-center">
    <div class="search-icon"></div>
    <div class="user-signin" v-if="isLogin">
      <div class="signin-face">
        <a href="#">
          <img src="http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp" />
        </a>
      </div>
      <div class="item">
        <a href="#">消息</a>
      </div>
      <div class="item">
        <a href="#">历史</a>
      </div>
    </div>
    <div class="user-logout" v-else>
      <div class="logout-face">
        <a href="#">
          <img src="../../assets/imgs/akari.jpg" />
        </a>
      </div>
      <div class="item">
        <a href="/login">登录</a>
      </div>
      <div class="item">
        <a href="#">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style lang="less" scoped>
.user-center {
  box-sizing: border-box;
}

.user-signin,
.user-logout {
  display: flex;
}

.face() {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.signin-face {
  .face();
}

.logout-face {
  .face();
  width: 28px;
  height: 28px;
  border: 1px solid #cccccc;
}

.item {
  display: flex;
  margin: 0 10px;
  align-items: center;
}
</style>
