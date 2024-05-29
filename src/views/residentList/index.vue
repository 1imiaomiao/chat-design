<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  userListApi,
  delUserApi,
  activeUserApi,
  changePwdApi
} from "@/api/userMsg";
import { showNotify, showConfirmDialog, showToast } from "vant";
import md5 from "md5";

interface UserMsg {
  username: string;
  email: string;
  id: string;
  coverImg: string;
  isDel: boolean;
}
const userList = ref<UserMsg[]>([]);
const pageNo = ref(1);
const pageSize = ref(100);
const activeType = ref("user");
const SearchVal = ref("");
const filterUsers = ref<UserMsg[]>([]);
const selectedUser = ref<UserMsg>();
const showChangePwd = ref(false);
const pwdVal = ref("");

const handleSelectUser = (user: UserMsg) => {
  selectedUser.value = user;
  showChangePwd.value = true;
  pwdVal.value = "";
};
const handleChangePwd = async () => {
  try {
    if (!selectedUser.value) {
      showToast("没有选择用户");
      return;
    }
    const res = await changePwdApi({
      userId: selectedUser.value.id,
      password: md5(pwdVal.value)
    });
    showToast("修改成功");
    pwdVal.value = "";
    showChangePwd.value = false;
  } catch (error: any) {
    showToast(error.msg || "网络错误");
  }
};
const activeUser = async (userId: string) => {
  try {
    await activeUserApi({ userId });
    showToast("激活成功");
    initUserList();
  } catch (error: any) {
    console.log("!!!!", error);
    showToast(error.message || "网络错误！删除失败");
  }
};
const delUser = async (userId: string) => {
  try {
    await delUserApi({ userId });
    showToast("删除成功");
    initUserList();
  } catch (error: any) {
    console.log("!!!!", error);
    showToast(error.message || "网络错误！删除失败");
  }
};
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
const handleClickDel = (user: UserMsg) => {
  showConfirmDialog({
    title: `确定${user.isDel ? "激活" : "停用"}用户${user.username}?`,
    message: "注意：删除之后账号会停用，但是会保留原来的历史记录和发布动态"
  })
    .then(() => {
      if (!user.isDel) delUser(user.id);
      else activeUser(user.id);
    })
    .catch(() => {
      // on cancel
    });
};

const handleSearch = () => {
  filterUsers.value = userList.value.filter(ele =>
    ele.username.includes(SearchVal.value)
  );
};
onMounted(async () => {
  await initUserList();
});
</script>
<template>
  <div>
    <van-search
      v-model:value="SearchVal"
      :maxlength="100"
      placeholder="请输入搜索关键词"
      @keydown.enter="handleSearch"
    />
    <div
      v-for="item in SearchVal ? filterUsers : userList"
      :key="item.id"
      class="residentList"
    >
      <van-card
        @click="handleClickDel(item)"
        class="residentList-item"
        :desc="item.introduce"
        :title="item.username"
        :currency="null"
        :price="`邮箱：${item.email}`"
        :thumb="item.coverImg"
      >
        <template #tags>
          <van-tag plain type="danger" v-if="item.isDel">已停用</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" @click.stop="handleSelectUser(item)"
            >修改密码</van-button
          >
        </template>
      </van-card>
    </div>
    <van-action-sheet
      v-model:show="showChangePwd"
      :title="`修改${selectedUser?.username} 的密码`"
    >
      <van-field
        v-model:value="pwdVal"
        label="修改密码"
        placeholder="请输入密码"
        type="password"
      />
      <div class="flex justify-center aligen-center mt-[10px]">
        <van-button type="primary" class="w-[120px]" @click="handleChangePwd"
          >确认</van-button
        >
      </div>
    </van-action-sheet>
  </div>
</template>
<style lang="less">
.van-dialog__header {
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.van-popup {
  padding: 10px;
  border-radius: 14px;
}
.van-dialog__message {
  margin-block: 8px;
}
.van-dialog__cancel,
.van-dialog__confirm {
  width: 50%;
  padding: 4px;
  text-align: center;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
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
