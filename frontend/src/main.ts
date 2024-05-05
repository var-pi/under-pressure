import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { configFontAwesome } from "@/config/fontawesome";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.component("FontAwesomeIcon", FontAwesomeIcon);
configFontAwesome();

app.mount("#app");
