import { MutationTree } from "vuex";

import { State } from "./state";
import { Credentials } from "./somes/culster";
export enum MutationType {
  SetClusterImportVisible = "SET_CLUSTER_IMPORT_VISIBLE",
  SetClusterAddVisible = "SET_CLUSTER_ADD_VISIBLE",
  SetCredentials = "SET_CREDENTIALS"
}

export type Mutations = {
  [MutationType.SetClusterImportVisible](state: State, value: boolean): void;
  [MutationType.SetClusterAddVisible](state: State, value: boolean): void;
  [MutationType.SetCredentials](state: State, value: Array<Credentials>): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetClusterImportVisible](state, value) {
    state.clusterImportVisible = value;
  },
  [MutationType.SetClusterAddVisible](state, value) {
    state.clusterImportVisible = value;
  },
  [MutationType.SetCredentials](state, value) {
    state.clusterCredentials = value;
  }
};
