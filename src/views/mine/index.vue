<script setup lang="ts" name="Mine">
import { getUserMsgApi } from "@/api/userMsg";
import type { UserMsg } from "@/api/userMsg";
import { computed, onMounted, ref } from "vue";
import AuthorMsg from "./components/AuthorMsg.vue";
import BlogList from "./components/BlogList.vue";
import { useUserInfoStore } from "@/store/modules/userInfo";

const userMsg = computed(() => useUserInfoStore().userInfo);
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
  height: calc(100vh - 30px);
  background: #f4f4f7;
  gap: 12px;
  overflow: hidden;
}
</style>
