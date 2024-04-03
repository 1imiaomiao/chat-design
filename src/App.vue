<template>
  <router-view />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { initSocket, useSocketServer } from "@/hooks/useSocketHooks";

const { listeningAllMessage } = useSocketServer();

onMounted(() => {
  console.log("项目 init....");
  initSocket();
  listeningAllMessage();
});
</script>

<style></style>
