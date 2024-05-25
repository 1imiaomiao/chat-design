<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { userListApi } from "@/api/userMsg";
import { showNotify } from "vant";

interface UserMsg {
  username: string;
  email: string;
  id: string;
  coverImg: string;
}
const userList = ref<UserMsg[]>([]);
const pageNo = ref(1);
const pageSize = ref(10);
const activeType = ref("user");
const SearchVal = ref("");

const initUserList = async () => {
  try {
    const params = {
      page: pageNo.value,
      pageSize: pageSize.value,
      type: activeType.value
    };
    userList.value = await userListApi(params);
  } catch (error: any) {
    showNotify({
      message: error?.message || "网络错误",
      type: "danger"
    });
  }
};
onMounted(async () => {
  await initUserList();
});
</script>
<template>
  <div>
    <van-search v-model="SearchVal" placeholder="请输入搜索关键词" />
    <div v-for="(item, index) in userList" :key="index" class="residentList">
      <van-card
        class="residentList-item"
        :desc="item.introduce"
        :title="item.username"
        :currency="null"
        :price="`邮箱：${item.email}`"
        :thumb="item.coverImg"
      />

      <!-- <van-contact-card
        type="edit"
        :editable="false"
        :tel="item.email"
        :name="item.username"
        >ssss</van-contact-card
      > -->
    </div>
  </div>
</template>
<style lang="less" scoped>
.residentList {
  .residentList-item {
    margin-bottom: 5px;
  }
  :deep(.van-card__thumb) {
    width: 75px;
    height: 75px;
  }
  :deep(.van-card__content) {
    min-height: 75px;
  }
  // display: flex;
  // gap: 8px;
  // img {
  //   width: 30px;
  //   height: 30px;
  //   object-fit: cover;
  //   border-radius: 100%;
  // }
}
</style>
