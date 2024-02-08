<script setup lang="ts">
import { ref, reactive } from "vue";
const activeName = ref("like");
</script>
<template>
  <div class="blogList">
    <van-tabs v-model:active="activeName">
      <van-tab title="点赞" name="like">内容 1</van-tab>
      <van-tab title="最近博客" name="content">内容 2</van-tab>
    </van-tabs>
  </div>
</template>
<style lang="less" scoped>
.blogList {
  background: #f2f2f2;
}
</style>
