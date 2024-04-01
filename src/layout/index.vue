<script setup lang="ts">
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { initSocket, useSocketServer } from "@/hooks/useSocketHooks";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

const { listeningAllMessage } = useSocketServer();

const exceptRouterName = ["Login"];
const route = useRoute();

// const tabbarRef = ref();
const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
const showTabbar = computed(() =>
  exceptRouterName.indexOf(route.name as string) === -1 ? true : false
);
onMounted(() => {
  console.log("项目 init....");
  initSocket();
  listeningAllMessage();
});
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider
      :theme="useDarkMode() ? 'dark' : 'light'"
      class="h-full"
    >
      <nav-bar v-if="false" />
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar v-if="showTabbar" />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
