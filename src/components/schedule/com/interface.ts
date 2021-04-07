export interface TaskItem {
  id?: string;
  name: string;
  platform: string;
  description: string;
  author: string;
  createTime: string;
}
export interface Resultem {
  name: string;
  lastDateTime: string;
  status: string;
}
export interface TaskInfo extends TaskItem {
  contents: string;
  policy: number; //執行策略
  interval: number;
  repeat: number;
}

export interface HostInfo {
  name: string;
  id: string;
  ip: string;
  port: string;
  platform: string;
  description: string;
  key: string;
}

export const TableColums = [
  { title: "主机名", dataIndex: "name" },
  { title: "平台", dataIndex: "platform" },
  { title: "主机地址", dataIndex: "port" },
  { title: "访问端口", dataIndex: "ip" },
  { title: "其它信息", dataIndex: "name" },
  {
    title: "操作",
    dataIndex: "operation",
    slots: { customRender: "operation" }
  }
];

export const TaskColums = [
  { title: "名称", dataIndex: "name", key: "name" },
  { title: "平台", dataIndex: "platform", key: "platform" },
  { title: "描述信息", dataIndex: "description", key: "description" },
  { title: "作者", dataIndex: "author", key: "author" },
  { title: "创建时间", dataIndex: "createTime", key: "createTime" },
  { title: "操作", key: "operation", slots: { customRender: "operation" } }
];
