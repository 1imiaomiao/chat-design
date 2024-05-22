<script setup lang="ts" name="Publish">
import EditBlock from "./components/EditBlock.vue";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { computed, ref } from "vue";
const editRef = ref();
const editType = ref<"dynamic" | "policy">("dynamic");
const userType = computed(() => useUserInfoStore().userInfo.type);
const onSubmit = () => {
  editRef.value.handleCreateArticle();
};
</script>
<template>
  <div class="publish">
    <div class="edit-header">
      <svg-icon name="back" style="font-size: 32px" />
      <van-tabs class="blogList-head" v-model:active="editType">
        <van-tab title="动态" name="dynamic"></van-tab>
        <van-tab
          title="公文"
          name="policy"
          v-if="userType === 'admin'"
        ></van-tab>
      </van-tabs>
    </div>
    <EditBlock ref="editRef" :type="editType" />
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
