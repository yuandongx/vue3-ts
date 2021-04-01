import { GetterTree } from "vuex";

import { State } from "./state";

export type Getters = {
  clusterImportVisible(state: State): boolean;
  clusterAddVisible(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  clusterImportVisible(state) {
    return state.clusterImportVisible;
  },
  clusterAddVisible(state) {
    return state.clusterImportVisible;
  }
};
