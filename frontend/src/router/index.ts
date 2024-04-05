import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import OAuth2CallbackGoogle from "@/views/OAuth2CallbackGoogle.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPage,
    },
    {
      path: "/oauth2/callback/google",
      name: "oAuth2CallbackGoogle",
      component: OAuth2CallbackGoogle,
    },
  ],
});

export default router;

