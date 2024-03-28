<script setup lang="ts" name="Mine">
import { computed, onMounted, ref } from "vue";
import AuthorMsg from "./components/AuthorMsg.vue";
import BlogList from "./components/BlogList.vue";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { useRoute } from "vue-router";

const route = useRoute();
const userMsg = computed(() => useUserInfoStore().userInfo);
const userId = ref(route.params.id);
</script>
<template>
  <div class="home">
    <AuthorMsg />
    <div class="home-btns" v-if="userId">
      <van-button>
        <svg-icon/>
      </van-button>
      <van-button>私信</van-button>
    </div>
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
}
</style>
