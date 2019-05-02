import Vue from "vue";
import Router from "vue-router";
import HomeView from "./views/HomeView.vue";
import EditView from "./views/EditView.vue";
import ConfigView from "./views/ConfigView.vue";



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/edit",
      name: "edit",
      component: EditView
    },
    {
      path: "/config",
      name: "config",
      component: ConfigView
    }
  ]
});
