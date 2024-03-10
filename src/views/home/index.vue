<script setup lang="ts" name="Home">
import { getUserMsgApi } from "@/api/userMsg";
import type { UserMsg } from "@/api/userMsg";
import { computed, onMounted, ref } from "vue";
import AuthorMsg from "./components/AuthorMsg.vue";
import BlogList from "./components/BlogList.vue";
import { useUserInfoStore } from "@/store/modules/userInfo";

const userMsg = computed(() => useUserInfoStore().userInfo);
// const userMsg = ref<UserMsg>({
//   userId: "",
//   commentNum: 0,
//   attentionNum: 0,
//   blogNum: 0,
//   avatar: "",
//   email: "",
//   userName: "",
//   getLikeNum: 0,
//   fanNum: 0
// });
// const getUserMsg = async () => {
//   try {
//     const res = await getUserMsgApi();
//     userMsg.value = res;
//     console.log("susssss", userMsg.value);
//   } catch (error) {
//     console.log(">>>>>error", error);
//   }
// };
// onMounted(async () => {
//   // getUserMsg();
//   // getUserMsgApi();
// });
</script>
<template>
  <div class="home">
    <AuthorMsg />
    <BlogList :userId="userMsg.id" />
  </div>
</template>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 16px;
  height: calc(100vh - 90px);
  background: #f4f4f7;
  gap: 12px;
  overflow: auto;
}
</style>
