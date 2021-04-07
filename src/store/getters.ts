import { GetterTree } from "vuex";
import { Credentials } from "./somes/culster";
import { State } from "./state";
import { HostInfo } from "@/components/schedule/com/interface";
export type Getters = {
  clusterImportVisible(state: State): boolean;
  clusterAddVisible(state: State): boolean;
  clusterCredentials(state: State): Array<Credentials>;
  // task
  taskCreateVisible(state: State): boolean;
  selectedHosts(state: State): Array<HostInfo>;
  selectHostVisible(state: State): boolean;
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
  },
  // task
  taskCreateVisible(state: State) {
    return state.taskCreateVisible;
  },
  selectedHosts(state: State) {
    return state.selectedHosts;
  },
  selectHostVisible(state: State) {
    return state.selectHostVisble;
  }
};
