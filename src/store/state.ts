import { Credentials } from "./somes/culster";
export type State = {
  clusterImportVisible: boolean;
  clusterAddVisible: boolean;
  clusterCredentials: Array<Credentials>;
  clusterGroups: Array<string>;
};

export const state: State = {
  clusterImportVisible: false,
  clusterAddVisible: false,
  clusterCredentials: [],
  clusterGroups: []
};
