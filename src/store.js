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
    SET_ACTIVE_FILE: function (state, _value) {
      //note:: _value = [activeFile , activeDataset]
      state.activeFile = _value[0]
      state.activeDataset = _value[1]
    }
  },
  actions: {
    RETRIEVE_LINKED_DATASETS: function (context) {
      GetLinkedDatasets(context.state.projectName).then(linkedDatasets => {
        context.commit("SET_DATASET", linkedDatasets)
        context.commit("SET_PROJECT_LIST_LOADED", true)
      })
    },
    SET_PROJECT_NAME: function(context,{name}){
      context.commit("SET_PROJECT_NAME", name);
      context.dispatch("RETRIEVE_LINKED_DATASETS")
    }
  },
  getters: {
    editableDatasets(state) {
      return state.datasets.reduce((_datasetList, currentDataset) => {
        const id = currentDataset.data.id;
        if (id.indexOf("output") === -1) {
          _datasetList.push(currentDataset)
        }
        return _datasetList
      }, [])
    },
    outputDatasets(state) {
      return state.datasets.reduce((_datasetList, currentDataset) => {
        const id = currentDataset.data.id;
        if (id.indexOf("output") !== -1) {
          _datasetList.push(currentDataset)
        }
        return _datasetList
      }, [])
    },
    readyToShowTable(state) {
      return state.activeFile && state.projectListLoaded
    }

  }
});