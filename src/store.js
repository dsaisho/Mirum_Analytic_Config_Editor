import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tableCategories: [],
    tableHeaders: {},
    userName: "mirumagency",
    activeFile:'',
    activeDataset:"",
    projectListLoaded:false,
    projectName:"testupload"
    //projectName:"marketing-tag-delivery-uhc"
  },
  mutations: {
    SET_PROJECT_LIST_LOADED(state, _value){
      state.projectListLoaded = _value
    },
    updateActiveFile:function(state, _value){
      //note:: _value = [activeFile , activeDataset]
      state.activeFile = _value[0]
      state.activeDataset = _value[1]
    },
    createTableHeaders: function(state) {
      state.tableHeaders = Object.keys(state.tableCategories[0]).map(
        category => {
          return {
            text: category,
            value: category
        }});
    },
  },
  actions: {
   
    
  },
  getters: {
    editableDatasets (state){
      return true
    },
    readyToShowTable(state){
      return state.activeFile && state.projectListLoaded
    }

  }
});
