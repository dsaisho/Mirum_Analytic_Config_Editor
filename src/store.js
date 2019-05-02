import Vue from "vue";
import Vuex from "vuex";
import {
  GetLinkedDatasets
} from "@/utils/api/data-world-api.js";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    projectName:"marketing-tag-delivery-uhc",
    projectListLoaded: false,
    tableCategories: [],
    tableHeaders: {},
    activeFile: '',
    activeDataset: "",
    datasets: []
  },
  mutations: {
    SET_PROJECT_LIST_LOADED(state, _value) {
      state.projectListLoaded = _value
    },
    SET_DATASET(state, _value) {
      state.datasets = _value
    },
    SET_PROJECT_NAME(state,_value){
      state.projectName = _value
    },
    updateActiveFile: function (state, _value) {
      //note:: _value = [activeFile , activeDataset]
      state.activeFile = _value[0]
      state.activeDataset = _value[1]
    },
    createTableHeaders: function (state) {
      //TODO MAKETHIS A GETTER
      state.tableHeaders = Object.keys(state.tableCategories[0]).map(
        category => {
          return {
            text: category,
            value: category
          }
        });
    },
  },
  actions: {
    INIT_LINKED_DATASETS: function (context) {
      GetLinkedDatasets(context.state.projectName).then(res => {
        context.commit("SET_DATASET", res)
        context.commit("SET_PROJECT_LIST_LOADED", true)
      })
    }
  },
  getters: {
    editableDatasets(state) {
      const editableDatasets = state.datasets.reduce((_datasetList, currentDataset) => {
        const id = currentDataset.data.id;
        if (id.indexOf("output") === -1) {
          _datasetList.push(currentDataset)
        }
        return _datasetList
      }, [])
      
      return editableDatasets
    },
    readyToShowTable(state) {
      return state.activeFile && state.projectListLoaded
    }

  }
});