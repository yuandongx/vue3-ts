import { Credentials } from "./somes/culster";
export type State = {
  clusterImportVisible: boolean;
  clusterAddVisible: boolean;
  clusterCredentials: Array<Credentials>;
};

export const state: State = {
  clusterImportVisible: false,
  clusterAddVisible: false,
  clusterCredentials: []
};
