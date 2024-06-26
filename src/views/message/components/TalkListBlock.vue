<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import type { ChatMsg } from "@/api/chat";
import { queryList } from "@/api/chat";
import { showNotify } from "vant";
import { useUserInfoStore } from "@/store/modules/userInfo";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMessageInfoStore } from "@/store/modules/message";

const router = useRouter();
const route = useRoute();
const chatList = ref<ChatMsg[]>([]);

const userInfo = computed(() => useUserInfoStore().userInfo);
const chatStatusMap = computed(() => useMessageInfoStore().chatStatusMap);
const newChatMessage = computed(() => useMessageInfoStore().chatMessage);

watch(
  () => newChatMessage.value,
  () => {
    if (!newChatMessage.value) return;
    const temp = chatList.value.find(
      ele => ele.senderId === newChatMessage.value!.senderId
    );
    if (temp) temp.content = newChatMessage.value!.content;
    else chatList.value.push(newChatMessage.value);
  }
);
const skipRecord = (roomId: string, id: string) => {
  router.push({
    name: "Chat",
    query: {
      roomId: roomId,
      userId: id
    }
  });
};

const getChatList = async () => {
  try {
    const res = await queryList({ receiverId: userInfo.value.id });
    chatList.value = res;
  } catch (error: any) {
    showNotify({ message: error.message });
  }
};

onMounted(() => {
  getChatList();
});
</script>
<template>
  <div class="w-100 mt-[20px]">
    <div
      class="talk"
      v-for="(chat, key) in chatList"
      @click="
        skipRecord(
          chat.id,
          chat.senderId === userInfo.id ? chat.receiverId : chat.senderId
        )
      "
      :key="key"
    >
      <van-badge dot v-if="chatStatusMap.get(chat.senderId)">
        <img :src="chat.coverImg" />
      </van-badge>
      <img :src="chat.coverImg" v-else />
      <div style="flex: 1; margin-left: 12px">
        <div class="chatMsgContainer">
          <span>{{ chat.username }}</span>
          <span style="color: #999">{{
            dayjs(chat.createdAt).format("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </div>
        <div class="content">
          {{ chat.content }}
        </div>
      </div>
    </div>
    <van-divider>没有更多了~</van-divider>
  </div>
</template>
<style lang="less" scoped>
.talk {
  margin-block: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  img {
    width: 36px;
    height: 36px;
    border-radius: 100%;
  }
  .chatMsgContainer {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .content {
    color: #999;
  }
}
</style>
