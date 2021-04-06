import { GetterTree } from "vuex";
import { Credentials } from "./somes/culster";
import { State } from "./state";

export type Getters = {
  clusterImportVisible(state: State): boolean;
  clusterAddVisible(state: State): boolean;
  clusterCredentials(state: State): Array<Credentials>;
};

export const getters: GetterTree<State, State> & Getters = {
  clusterImportVisible(state) {
    return state.clusterImportVisible;
  },
  clusterAddVisible(state) {
    return state.clusterAddVisible;
  },
  clusterCredentials(state: State) {
    return state.clusterCredentials;
  }
};
