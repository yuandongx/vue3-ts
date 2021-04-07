import { Credentials } from "./somes/culster";
import { HostInfo } from "@/components/schedule/com/interface";
export type State = {
  clusterImportVisible: boolean;
  clusterAddVisible: boolean;
  clusterCredentials: Array<Credentials>;
  clusterGroups: Array<string>;
  // task
  taskCreateVisible: boolean;
  selectedHosts: Array<HostInfo>;
  selectHostVisble: boolean;
};

export const state: State = {
  clusterImportVisible: false,
  clusterAddVisible: false,
  clusterCredentials: [],
  clusterGroups: [],
  // task
  taskCreateVisible: false,
  selectedHosts: [],
  selectHostVisble: false
};
