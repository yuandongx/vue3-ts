import { MutationTree } from "vuex";
import { HostInfo } from "@/components/schedule/com/interface";
import { State } from "./state";
import { Credentials } from "./somes/culster";
export enum MutationType {
  SetClusterImportVisible = "SET_CLUSTER_IMPORT_VISIBLE",
  SetClusterAddVisible = "SET_CLUSTER_ADD_VISIBLE",
  SetCredentials = "SET_CREDENTIALS",
  SetClusterGroups = "SET_CLUSTER_GROUPS",
  // task
  SetTaskCreateVisible = "SET_TASK_CREATE_VISIBLE",
  SetSelectedHosts = "SET_SELECTED_HOSTS",
  SetSelectHostsVisible = "SET_SELECTED_HOST_VISIBLE"
}

export type Mutations = {
  [MutationType.SetClusterImportVisible](state: State, value: boolean): void;
  [MutationType.SetClusterAddVisible](state: State, value: boolean): void;
  [MutationType.SetCredentials](state: State, value: Array<Credentials>): void;
  [MutationType.SetClusterGroups](state: State, value: Array<string>): void;
  // task
  [MutationType.SetTaskCreateVisible](state: State, value: boolean): void;
  [MutationType.SetSelectedHosts](state: State, value: Array<HostInfo>): void;
  [MutationType.SetSelectHostsVisible](state: State, value: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetClusterImportVisible](state, value) {
    state.clusterImportVisible = value;
  },
  [MutationType.SetClusterAddVisible](state, value) {
    state.clusterAddVisible = value;
  },
  [MutationType.SetCredentials](state, value) {
    state.clusterCredentials = value;
  },
  [MutationType.SetClusterGroups](state, value) {
    state.clusterGroups = value;
  },
  // task
  [MutationType.SetTaskCreateVisible](state, value) {
    state.taskCreateVisible = value;
  },
  [MutationType.SetSelectedHosts](state, value) {
    state.selectedHosts = value;
  },
  [MutationType.SetSelectHostsVisible](state, value) {
    state.selectHostVisble = value;
  }
};
