
<script setup lang="ts" name="Home">
import {getUserMsgApi} from "@/api/userMsg"
import { onMounted } from "vue"
onMounted(async()=>{
  const res = await getUserMsgApi()
  console.log("!!@!2",res)
})
</script>
<template>
  <div>
    121212
  </div>
</template>
<style lang="less" scoped>
</style>
