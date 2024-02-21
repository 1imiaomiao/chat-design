import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Mine from "@/views/mine/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Mine" },
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
        path: "mine",
        name: "Mine",
        component: Mine,
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
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
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
      }
    ]
  }
];

export default routes;
