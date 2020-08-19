<template>
  <div class="comment-send">
    <div class="user-face">
      <img src alt />
    </div>
    <textarea placeholder="请输入你要发表的评论" v-model="comment"></textarea>
    <button>发表评论</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comment: ''
    }
  }
}
</script>

<style>
/* 发表评论组件 */
.comment-send {
  display: flex;
  width: 100%;
  height: 94px;
  align-items: center;
}
.user-face {
  width: 48px;
  min-width: 48px;
  height: 48px;
  margin-left: 5px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
}
.user-face img {
  width: 100%;
  height: 100%;
}
.comment-send textarea {
  box-sizing: border-box;
  flex: auto;
  height: 64px;
  margin: 0 10px;
  padding: 8px 0 0 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #f4f5f7;
  font-size: 12px;
  color: #555555;
  resize: none;
}
.comment-send textarea:hover,
.comment-send textarea:focus {
  border-color: #00a1d6;
  background-color: #ffffff;
}
.comment-send button {
  width: 70px;
  height: 64px;
  padding: 0 20px;
  border-radius: 4px;
  background-color: #00a1d6;
  color: #ffffff;
}
.comment-send button:hover {
  background-color: #00b5e5;
}
</style>
