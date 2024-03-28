<script setup lang="ts" name="Mine">
import { computed, onMounted, ref } from "vue";
import AuthorMsg from "./components/AuthorMsg.vue";
import BlogList from "./components/BlogList.vue";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { useRoute } from "vue-router";

const route = useRoute();
const userMsg = computed(() => useUserInfoStore().userInfo);
const userId = ref(route.query.id);
</script>
<template>
  <div class="home">
    <AuthorMsg />
    <BlogList :userId="userId || userMsg.id" />
  </div>
</template>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 16px;
  height: calc(100vh - 30px);
  background: #f4f4f7;
  gap: 12px;
  overflow: hidden;
  // .home-btns {
  //   width: 100%;
  //   display: flex;
  //   padding: 8px 12px;
  //   border-radius: 8px;
  //   background: #fff;
  //   gap: 8px;
  //   button {
  //     flex: 1;
  //   }
  //   :deep(.van-button__text) {
  //     width: 100%;
  //     display: flex;
  //     justify-content: center;
  //     align-content: center;
  //     font-size: 16px;
  //     gap: 8px;
  //   }
  // }
}
</style>
