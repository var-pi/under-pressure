<script setup lang="ts">
import { onMounted } from "vue";
import axios from "axios";
import router from "@/router";

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    // Now you have the authorization code, and you can send it to your backend
    axios
      .post("http://localhost:9091/auth", { code: code })
      .then((r) => sessionStorage.setItem("idTokenString", r.data.data))
      .catch((e) => console.error(e));
    router.push({ name: "home" });
  } else {
    console.error("Authorization code not found in the URL.");
  }
});
</script>

