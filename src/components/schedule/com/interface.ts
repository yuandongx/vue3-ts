export interface TaskItem {
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
export interface MoreInfo extends TaskItem {
  policy: number; //執行策略
  interval: number;
  repeat: number;
}

export const TaskColums = [
  { title: "名称", dataIndex: "name", key: "name" },
  { title: "平台", dataIndex: "platform", key: "platform" },
  { title: "描述信息", dataIndex: "description", key: "description" },
  { title: "作者", dataIndex: "author", key: "author" },
  { title: "创建时间", dataIndex: "createTime", key: "createTime" },
  { title: "操作", key: "operation", slots: { customRender: "operation" } }
];
