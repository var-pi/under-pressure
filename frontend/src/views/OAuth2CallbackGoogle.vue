<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import server from "@/api/server";

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    // Now you have the authorization code, and you can send it to your backend
    server
      .post<{ code: string }, string>("/auth", { code })
      .then((r) => sessionStorage.setItem("idTokenString", r))
      .catch((e) => console.error(e));
  }

  router.push({ name: "home" });
});
</script>

