import { MutationTree } from "vuex";

import { State } from "./state";

export enum MutationType {
  SetClusterImportVisible = "SET_CLUSTER_IMPORT_VISIBLE",
  SetClusterAddVisible = "SET_CLUSTER_ADD_VISIBLE"
}

export type Mutations = {
  [MutationType.SetClusterImportVisible](state: State, value: boolean): void;
  [MutationType.SetClusterAddVisible](state: State, value: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetClusterImportVisible](state, value) {
    state.clusterImportVisible = value;
  },
  [MutationType.SetClusterAddVisible](state, value) {
    state.clusterImportVisible = value;
  }
};
