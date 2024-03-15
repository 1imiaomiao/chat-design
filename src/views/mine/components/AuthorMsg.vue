<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useUserInfoStore } from "@/store/modules/userInfo";

const userStore = useUserInfoStore();
// const userMsg = computed(()=>useUserInfoStore.useInfo)
// import type { UserMsg } from "@/api/userMsg";
// interface Props {
//   userMsg: UserMsg;
// }
// const props = defineProps<Props>();
const userMsg = computed(() => userStore.userInfo);
</script>
<template>
  <div class="author-head">
    <img :src="userMsg.coverImg" class="author-head-img" />
    <div>
      <div class="author-head-title">{{ userMsg.username }}</div>
      <div class="author-head-text">ID:{{ userMsg.id }}</div>
    </div>
  </div>
  <div class="author-msg">
    <div>
      <div class="author-msg-title">{{ userMsg.followNum }}</div>
      <div class="author-msg-text">关注</div>
    </div>
    <div>
      <div class="author-msg-title">{{ userMsg.fanNum }}</div>
      <div class="author-msg-text">粉丝</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.author-head {
  display: flex;
  gap: 12px;
  &-img {
    width: 54px;
    height: 54px;
    border-radius: 100%;
  }
  &-title {
    font-weight: 600;
    font-size: 18px;
  }
  &-text {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
  }
}
.author-msg {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  display: flex;
  gap: 12px;
  background: #fff;
  border-radius: 8px;
  justify-content: space-around;
  &-title {
    font-weight: 800;
    font-size: 18px;
    margin-bottom: 8px;
    text-align: center;
  }
  &-text {
    color: #999;
    font-size: 14px;
    text-align: center;
  }
}
// }
// .author {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   margin-block: 12px;
//   gap: 24px;
//   &-title {
//     font-size: 24px;
//     width: 100%;
//     text-align: center;
//   }
//   &-avatar {
//     width: 120px;
//     height: 120px;
//     border-radius: 100%;
//   }
//   &-dataBoard {
//     display: flex;
//     justify-content: center;
//     gap: 36px;
//     text-align: center;
//     &-number {
//       font-weight: 900;
//       font-size: 18px;
//       margin-bottom: 8px;
//     }
//   }
// }
</style>
