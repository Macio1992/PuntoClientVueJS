import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import socketio from "socket.io-client";
import env from "./environment/environment";

const { SERVER_URL } = env;
const app = createApp(App);

app.config.globalProperties.$socketio = socketio(SERVER_URL);
app.config.globalProperties.$testMode = false;

app.mount("#app");
