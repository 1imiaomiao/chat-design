<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { queryUserMsg } from "@/api/userMsg";

const userStore = useUserInfoStore();
const router = useRouter();
const route = useRoute();

const userMsg = ref(userStore.userInfo);
// const userId = computed(() => route.query.id);
const storeInfoMsg = computed(() => userStore.userInfo);

const initUserMsg = async () => {
  if (!route.query.id) return;
  try {
    const res = await queryUserMsg({ userId: route.query.id });
    userMsg.value = res;
  } catch (error) {
    console.log(error);
  }
};
const handleSkipSetting = () => {
  router.push("Setting");
};
const skipChat = () => {
  const receiverId = storeInfoMsg.value.id;
  const senderId = userMsg.value.id;
  const roomId =
    receiverId.slice(-5) > senderId.slice(-5)
      ? receiverId.slice(-5) + senderId.slice(-5)
      : senderId.slice(-5) + receiverId.slice(-5);
  router.push({
    name: "Chat",
    query: {
      roomId: roomId,
      userId: userMsg.value.id
    }
  });
};
onMounted(() => {
  initUserMsg();
});
</script>
<template>
  <div class="author-head">
    <img
      :src="userMsg.coverImg"
      class="author-head-img"
      @click="handleSkipSetting"
    />
    <div class="flex-[1]">
      <div class="author-head-title">
        <div>{{ userMsg.username }}</div>
        <div
          class="flex gap-[8px]"
          v-if="route.query.id && route.query.id != storeInfoMsg?.id"
        >
          <van-button round type="primary" color="#478BFF" style="height: 32px">
            <span>关注</span>
          </van-button>
          <van-button
            round
            type="success"
            color="#B0B1B2"
            style="height: 32px"
            @click="skipChat"
          >
            <svg-icon name="send" />
          </van-button>
        </div>
      </div>
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
    display: flex;
    justify-content: space-between;
    // .text {
    font-weight: 600;
    font-size: 18px;
    // }
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
