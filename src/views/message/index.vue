<script setup lang="ts" name="Message">
import TalkListBlock from "./components/TalkListBlock.vue";
</script>

<template>
  <div class="message">
    <div class="message-header">
      <van-badge :content="undefined">
        <div class="message-header-item" data-name="like">
          <div class="svgContainer">
            <svg-icon name="like" class="icon" />
          </div>
          <div class="label">喜欢</div>
        </div>
      </van-badge>
      <van-badge :content="undefined">
        <div class="message-header-item" data-name="other">
          <div class="svgContainer">
            <svg-icon name="notify" class="icon" />
          </div>
          <div class="label">系统</div>
        </div>
      </van-badge>
      <van-badge :content="undefined">
        <div class="message-header-item" data-name="talk">
          <div class="svgContainer">
            <svg-icon name="talk" class="icon" />
          </div>
          <div class="label">评论</div>
        </div>
      </van-badge>
    </div>
    <TalkListBlock></TalkListBlock>
  </div>
</template>
<style scoped lang="less">
.message {
  padding: 20px 28px;
  box-sizing: border-box;
}
.message-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center;
  &-item {
    width: 45px;
    margin-top: 20px;
    .svgContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 100%;
      margin-bottom: 8px;
      background: #999;
      .icon {
        width: 36px;
        height: 36px;
      }
    }
    .label {
      width: 100%;
      text-align: center;
    }
  }
  .message-header-item[data-name="like"] {
    .svgContainer {
      background: #ffeded;
    }
    .icon {
      color: #ff8988;
    }
    color: #ff8988;
  }
  .message-header-item[data-name="other"] {
    .svgContainer {
      background: #e0efff;
    }
    .icon {
      color: #a8d1ff;
    }
    color: #a8d1ff;
  }
  .message-header-item[data-name="talk"] {
    .svgContainer {
      background: #e5f8ef;
    }
    .icon {
      color: #37df8b;
    }
    color: #37df8b;
  }
}
</style>
