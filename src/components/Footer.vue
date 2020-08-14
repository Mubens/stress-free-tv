<template>
  <div class="footer">
    <div class="link-box wrapper">
      <dl>
        <dt>合作</dt>
        <dd>
          <a href="#">关于我们</a>
        </dd>
        <dd>
          <a href="#">联系我们</a>
        </dd>
      </dl>
      <dl>
        <dt>反馈</dt>
        <dd>
          <a href="#">用户反馈</a>
        </dd>
      </dl>
    </div>
    <div class="copyright">
      <p>个人使用，请勿随意传播网站信息，感谢配合！</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.footer {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  line-height: 2em;
  background-color: #e5e5e5;
  .link-box {
    display: flex;
    justify-content: center;
    text-align: left;
    dl {
      margin: 0 20px;
    }
  }
}
</style>
