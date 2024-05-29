<script setup lang="ts" name="Chat">
import { ref, watch, onMounted, computed } from "vue";
import { queryUserMsg } from "@/api/userMsg";
import type { ChatMsg } from "@/api/chat";
import { useRoute } from "vue-router";
import { sendChatMsgApi, queryChatDetail } from "@/api/chat";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { useMessageInfoStore } from "@/store/modules/message";

const route = useRoute();
const chatList = ref<ChatMsg[]>([]);
const chatVal = ref("");
const chatObjMsg = ref({
  id: "",
  coverImg: "",
  username: ""
});

const userInfo = computed(() => useUserInfoStore().userInfo);
const roomId = computed(() => route.query.roomId);
const newMessage = computed(() => useMessageInfoStore().chatMessage);

watch(
  () => newMessage.value,
  () => {
    if (!newMessage.value || newMessage.value.senderId !== route.query.userId)
      return;
    chatList.value.push(newMessage.value);
    useMessageInfoStore().checkChatMessage(route.query.userId as string);
  }
);

const initChatObjMsg = async () => {
  chatObjMsg.value.id = route.query.userId as string;
  try {
    const res = await queryUserMsg({ userId: route.query.userId });
    const { username, coverImg } = res;
    chatObjMsg.value = { ...chatObjMsg.value, username, coverImg };
  } catch (error) {
    console.log("error", error);
  }
};
const quertChatRecord = async () => {
  try {
    const res = await queryChatDetail({ roomId: roomId.value });
    chatList.value = res.comments;
  } catch (error) {
    console.log("error", error);
  }
};
const handleSendMsg = async () => {
  try {
    const senderId = userInfo.value.id;
    const receiverId = chatObjMsg.value.id;
    const id = await sendChatMsgApi({
      receiverId,
      senderId,
      content: chatVal.value
    });
    chatList.value.push({
      id: id as string,
      receiverId: receiverId as string,
      content: chatVal.value,
      senderId: senderId as string,
      createdAt: new Date(),
      roomId: roomId.value as string
    });
    chatVal.value = "";
  } catch (error) {
    console.log("error", error);
  }
};

onMounted(async () => {
  await quertChatRecord();
  await initChatObjMsg();
  useMessageInfoStore().checkChatMessage(route.query.userId as string);
});
</script>
<template>
  <div class="message">
    <div class="message-header">
      <img :src="chatObjMsg.coverImg" class="coverImg" />
      <span>{{ chatObjMsg.username }}</span>
    </div>
    <div class="message-list">
      <div
        v-for="(item, index) in chatList"
        :key="index"
        class="chatItem"
        :data-type="userInfo.id === item.senderId ? 'me' : 'other'"
      >
        <div class="chatItem-content">
          <img
            :src="
              userInfo.id === item.senderId
                ? userInfo.coverImg
                : chatObjMsg.coverImg
            "
          />
          <span class="text">{{ item.content }}</span>
        </div>
      </div>
    </div>
    <div class="message-edit">
      <van-field
        v-model="chatVal"
        ref="editRef"
        placeholder="输入.."
        class="message-edit-input"
        @keydown.enter="handleSendMsg"
      >
        <template #right-icon>
          <svg-icon class="icon" name="edit" />
        </template>
      </van-field>
    </div>
  </div>
</template>
<style lang="less" scoped>
.coverImg {
  width: 32px;
  height: 32px;
  border-radius: 100%;
}
.message {
  width: 100%;
  // height: 100%;
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
  background: #f4f4f7;
  .message-header {
    width: 100%;
    padding: 8px 16px;
    box-sizing: border-box;
    background: #fff;
    align-items: end;
    gap: 12px;
    display: flex;
    color: #999;
  }
  .message-list {
    width: 100%;
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    box-sizing: border-box;
  }
  &-edit {
    // position: sticky;
    // bottom: 50px;
    // opacity: 1;
    // box-sizing: border-box;
    // padding-inline: 16px;
    // padding-bottom: 8px;
    // left: 0px;
    // width: 100%;
    // padding: 12px;
    // z-index: 1;
    margin: 8px;
    .icon {
      color: #999;
    }
    &-input {
      border-radius: 12px;
    }
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
      min-height: 42px;
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
