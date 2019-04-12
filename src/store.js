import Vue from "vue";
import Vuex from "vuex";
import DataWorldTableFromApi from "@/utils/api/data-world-table.js";


import TrackEvent from "@/lib/trackEvent/TrackEventContainer.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tableCategories: [],
    tableHeaders: {},
    tableLoadComplete: false,
    userName: "mirumagency",
    trackEvent: new TrackEvent("trackClick", true)
  },
  mutations: {
    createTableHeaders: function(state) {
      state.tableHeaders = Object.keys(state.tableCategories[0]).map(
        category => {
          return {
            text: category,
            value: category
          };
        }
      );
    },
    tableLoadComplete: function(state, _value = true) {
      _value == true
        ? state.trackEvent.track({
            eventType: "FORM_COMPLETE",
            eventProps: {
              asset_id: "form_complete-234",
              event_name: "table_loaded",
              form_type: "first"
            }
          })
        : null;

      state.tableLoadComplete = _value;
    }
  },
  actions: {
    searchForTable(context, { _userName, _dataset, _query }) {
      return new Promise((resolve, reject) => {
        DataWorldTableFromApi(_userName, _dataset, _query)
          .then(tableCategories => {
            resolve(tableCategories);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getDescriptionTable(context, { _userName, _dataset, _tableName }) {
      return new Promise((resolve, reject) => {
        DataWorldTableFromApi(_userName, _dataset, _tableName)
          .then(tableCategories => {
            context.state.tableCategories = tableCategories;
            context.commit("createTableHeaders");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {}
});
