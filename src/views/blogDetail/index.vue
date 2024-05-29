<script setup lang="ts" name="BlogDetail">
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";


import BlogMsgBlock from "./components/BlogMsgBlock.vue";
import TalkList from "./components/BlogTalkList.vue";

const route = useRoute();
const id = computed(() => route.query.id as string);
</script>
<template>
  <div class="blogDetail-container">
    <BlogMsgBlock :id="id" />
    <van-divider />
    <TalkList :id="id" />
  </div>
</template>
<style lang="less" scoped>
.blogDetail-container {
  box-sizing: border-box;
  padding: 12px 16px;
}
</style>
