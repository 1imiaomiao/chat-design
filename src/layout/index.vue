<script setup lang="ts">
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import router from "@/router";

const route = useRoute();
const tabbarRef = ref();
const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
const routeName = computed(() => route.name);
const showTabbar = computed(() =>
  tabbarRef.value?.exceptRouterName.indexOf(routeName) === -1 ? true : false
);
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <nav-bar v-if="false" />
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar ref="tabbarRef" v-if="showTabbar" />
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
