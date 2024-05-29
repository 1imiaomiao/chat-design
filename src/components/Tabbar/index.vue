<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useUserInfoStore } from "@/store/modules/userInfo";

const userType = computed(() => useUserInfoStore().userInfo.type);

const active = ref(0);

const tabbarData = computed(() => {
  const res = [
    {
      icon: "wap-home-o",
      title: "主页",
      to: {
        name: "Home"
      }
    },
    {
      icon: "add",
      title: "发布",
      to: {
        name: "Publish"
      }
    },
    {
      icon: "chat-o",
      title: "私信",
      to: {
        name: "Message"
      }
    },
    {
      icon: "user-o",
      title: "我的",
      to: {
        name: "Mine"
      }
    }
  ];
  if (userType.value === "admin")
    res.unshift({
      icon: "friends-o",
      title: "成员管理",
      to: {
        name: "ResidentList"
      }
    });
  return res;
});
</script>
