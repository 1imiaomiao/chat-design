<script setup lang="ts" name="Home">
import { getUserMsgApi } from "@/api/userMsg";
import type { UserMsg } from "@/api/userMsg";
import { onMounted, ref } from "vue";
import AuthorMsg from "./components/AuthorMsg.vue";
import BlogList from "./components/BlogList.vue";

const userMsg = ref<UserMsg>({
  userId: "",
  commentNum: 0,
  attentionNum: 0,
  blogNum: 0,
  avatar: "",
  email: "",
  userName: ""
});
const getUserMsg = async () => {
  try {
    const res = await getUserMsgApi();
    userMsg.value = res;
    console.log("susssss", userMsg.value);
  } catch (error) {
    console.log(">>>>>error", error);
  }
};
onMounted(async () => {
  getUserMsg();
  getUserMsgApi();
});
</script>
<template>
  <div class="flex flex-col h-[100vh]">
    <AuthorMsg :userMsg="userMsg" />
    <BlogList class="flex-1" :userId="userMsg.userId" />
  </div>
</template>
<style lang="less" scoped></style>
