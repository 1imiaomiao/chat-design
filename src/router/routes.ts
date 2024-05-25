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
        path: "loginAdmin",
        name: "LoginAdmin",
        component: () => import("@/views/login/login_admin.vue"),
        meta: {
          title: "工作人员登录"
        }
      },
      {
        path: "residentList",
        name: "ResidentList",
        component: () => import("@/views/residentList/index.vue"),
        meta: {
          title: "管理居民列表"
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
        path: "chat",
        name: "Chat",
        component: () => import("@/views/message/chatDetail/index.vue"),
        meta: {
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
        path: "blog-detail",
        name: "BlogDetail",
        component: () => import("@/views/blogDetail/index.vue"),
        meta: {
          title: "博客详情",
          noCache: true
        }
      },
      {
        path: "ai-chat",
        name: "AiChat",
        component: () => import("@/views/blogDetail/aiChat.vue"),
        meta: {
          title: "AI解读",
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
