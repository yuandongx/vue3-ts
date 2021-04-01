import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  SetClusterImportVisible = "SET_CLUSTER_IMPORT_VISIBLE"
}

// /store/action.ts
type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};
export type Actions = {
  [ActionTypes.SetClusterImportVisible](context: ActionAugments): void;
};

//action.ts
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetClusterImportVisible]({ commit }) {
    sleep(10);
    commit(MutationType.SetClusterImportVisible, true);
  }
};
