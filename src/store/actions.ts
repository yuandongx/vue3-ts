import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
// /store/action.ts
type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};
// 可增加
export enum ActionTypes {
  SetClusterImportVisible = "SET_CLUSTER_IMPORT_VISIBLE",
  SetClusterAddVisible = "SET_CLUSTER_ADD_VISIBLE"
}

// 可增加
export type Actions = {
  [ActionTypes.SetClusterImportVisible](context: ActionAugments): void;
  [ActionTypes.SetClusterAddVisible](context: ActionAugments): void;
};

// 可增加
//action.ts
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetClusterImportVisible]({ commit }) {
    commit(MutationType.SetClusterImportVisible, true);
  },
  async [ActionTypes.SetClusterAddVisible]({ commit }) {
    commit(MutationType.SetClusterAddVisible, true);
  }
};
