<script setup lang="ts" name="Message">
import TalkListBlock from "./components/TalkListBlock.vue";
import MessageModal from "./components/MessageModal.vue";
import { useMessageInfoStore } from "@/store/modules/message";
import { computed,ref } from "vue";

const messageStore = useMessageInfoStore();

const modalRef = ref();
const likeCount = computed(() => messageStore.likeMessageCount);
const commnetCount = computed(() => messageStore.commentMessageCount);

const handleOpenModal = (val: "like" | "comment") => {
  modalRef.value.initModal(val);
};
</script>

<template>
  <div class="message">
    <div class="message-header">
      <div class="message-header-item" data-name="like">
        <van-badge :content="likeCount || undefined">
          <div class="svgContainer" @click="handleOpenModal('like')">
            <svg-icon name="like" class="icon" />
          </div>
        </van-badge>
        <div class="label">喜欢</div>
      </div>
      <div class="message-header-item" data-name="other">
        <van-badge :content="undefined">
          <div class="svgContainer">
            <svg-icon name="notify" class="icon" />
          </div>
        </van-badge>
        <div class="label">系统</div>
      </div>
      <div class="message-header-item" data-name="talk">
        <van-badge :content="commnetCount || undefined">
          <div class="svgContainer" @click="handleOpenModal('comment')">
            <svg-icon name="talk" class="icon" />
          </div>
        </van-badge>
        <div class="label">评论</div>
      </div>
    </div>
    <TalkListBlock></TalkListBlock>
    <MessageModal ref="modalRef" />
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
