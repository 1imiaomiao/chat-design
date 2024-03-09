<script setup lang="ts" name="Publish">
import EditBlock from "./components/EditBlock.vue";
import { ref } from "vue";
const editRef = ref();
const onSubmit = () => {
  console.log(">>>>>");
  editRef.value.handleCreateArticle();
};
</script>
<template>
  <div class="publish">
    <svg-icon name="back" style="font-size: 32px" />
    <EditBlock ref="editRef" />
    <van-button color="#FF2442" round block class="edit-btn" @click="onSubmit"
      >发布</van-button
    >
  </div>
</template>
<style lang="less" scoped>
.publish {
  box-sizing: border-box;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
