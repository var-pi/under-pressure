<template>
  <LoaderComponent class="center" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import server from "@/api/server";
import LoaderComponent from "@/components/LoaderComponent.vue";

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (!code) return router.push({ name: "app" });

  // Now you have the authorization code, and you can send it to your backend
  server
    .post<{ code: string }, string>("/auth", { code })
    .then((r) => sessionStorage.setItem("idTokenString", r))
    .then(() => router.push({ name: "app" }));
});
</script>

<style scoped>
.center {
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
}
</style>
