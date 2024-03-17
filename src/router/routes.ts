import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
          title: "登录"
        }
      },
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "主页"
        }
      },
      {
        path: "publish",
        name: "Publish",
        component: () => import("@/views/publish/index.vue"),
        meta: {
          title: "发布"
        }
      },
      {
        path: "message",
        name: "Message",
        component: () => import("@/views/message/index.vue"),
        meta: {
          title: "私信",
          noCache: true
        }
      },
      {
        path: "mine",
        name: "Mine",
        component: () => import("@/views/mine/index.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "blogDetail",
        name: "BlogDetail",
        component: () => import("@/views/blogDetail/index.vue"),
        meta: {
          title: "博客详情",
          noCache: true
        }
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/index.vue"),
        meta: {
          title: "设置",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
