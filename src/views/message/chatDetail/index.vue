<script setup lang="ts" name="Chat">
import { ref, reactive, onMounted, compile, computed } from "vue";
import { queryChatDetail } from "@/api/chat";
import type { ChatMsg } from "@/api/chat";
import { useRoute } from "vue-router";
import { useUserInfoStore } from "@/store/modules/userInfo";

const route = useRoute();
const chatList = ref<ChatMsg[]>([]);
const userInfo = computed(() => useUserInfoStore().userInfo);

const quertChatRecord = async () => {
  try {
    const res = await queryChatDetail({ roomId: route.query.roomId as string });
    chatList.value = res.comments;
    console.log(">>>>>", chatList.value);
  } catch (error) {
    console.log("error", error);
  }
};
onMounted(() => {
  quertChatRecord();
  // console.log(route.query.roomId);
});
</script>
<template>
  <div class="message">
    <div class="messgae-header"></div>
    <div class="message-list">
      <div
        v-for="(item, index) in chatList"
        :key="index"
        class="chatItem"
        :data-type="userInfo.id === item.senderId ? 'me' : 'other'"
      >
        <div class="chatItem-content">
          <img :src="userInfo.coverImg" />
          <span class="text">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.message {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .message-header {
    width: 100%;
    height: 30px;
    background: #fff;
  }
  .message-list {
    width: 100%;
    flex: 1;
    overflow: auto;
    background: #f4f4f7;
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    box-sizing: border-box;
  }
  .chatItem {
    margin-block: 8px;
    img {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      margin-inline: 8px;
    }
    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .text {
      height: 42px;
      font-size: 16px;
      padding: 8px 12px;
      border-radius: 10px;
    }
  }
  .chatItem[data-type="me"] {
    align-self: end;
    .text {
      background: #12b7f5;
      color: #fff;
    }
    .chatItem-content {
      flex-direction: row-reverse;
    }
  }
  .chatItem[data-type="other"] {
    align-self: flex-start;
    .text {
      background: #fff;
      color: #000;
    }
  }
}
</style>
