import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import TableSearch from "./views/TableSearch.vue";
import TableDetails from "./views/TableDetails.vue";
import TabulatorDemo from "./views/TabulatorDemo.vue";
import TabulatorDemoDynamic from "./views/TabulatorDemoDynamic.vue";
import UploadMultipleFiles from "./views/UploadMultipleFiles.vue";
import UpdateDataset from "./views/UpdateDataset.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/table-search",
      name: "tableSearch",
      component: TableSearch
    },
    {
      path: "/table-details",
      name: "tableDetailsearch",
      component: TableDetails
    },
    {
      path: "/tabulator",
      name: "tabulator",
      component: TabulatorDemo
    },
    {
      path: "/tabulator-dynamic",
      name: "tabulatorDynamic",
      component: TabulatorDemoDynamic
    },
    {
      path: "/upload-multiple",
      name: "uploadMultiple",
      component: UploadMultipleFiles
    },
    {
      path: "/update-dataset",
      name: "updateDataset",
      component: UpdateDataset
    }
    
  ]
});
