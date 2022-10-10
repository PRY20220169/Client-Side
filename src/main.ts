import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./main.css";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;
const options = {
	confirmButtonColor: "#5860FF",
	cancelButtonColor: "#FF5E5E",
};
Vue.use(VueSweetalert2, options);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
