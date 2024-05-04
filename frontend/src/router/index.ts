import { createRouter, createWebHistory } from "vue-router";
import AppPage from "@/views/AppPage.vue";
import OAuth2CallbackGoogle from "@/views/OAuth2CallbackGoogle.vue";
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/app",
      name: "app",
      component: AppPage,
    },
    {
      path: "/oauth2/callback/google",
      name: "oAuth2CallbackGoogle",
      component: OAuth2CallbackGoogle,
    },
  ],
});

export default router;
