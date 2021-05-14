import moment from "moment";

const charsUUID =
  "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const imgControlPath = "/img/playbook/control/";
export function getUID(type: string | undefined): string {
  const st = moment.now().toString();
  let randChars = "";
  const n = charsUUID.length;
  for (let i = 0; i < 32; i++) {
    const index = Math.fround(Math.random() * n);
    randChars = randChars + charsUUID.charAt(index);
  }
  if (type != undefined) {
    return `${type}-${st}-${randChars}`;
  }
  return st + "-" + randChars;
}

export interface MetaData {
  [key: string]: string; // 节点变量，key/value
}

export interface NodeData {
  label: string;
  appId: string;
  onlyOne?: boolean;
  metaData: MetaData[];
  imgPath: string;
}

export function getControlNodesInfo(): NodeData[] {
  return [
    {
      label: "开始",
      onlyOne: true,
      metaData: [],
      appId: "node-control-0001",
      imgPath: imgControlPath + "start.png"
    },
    {
      label: "结束",
      onlyOne: true,
      metaData: [],
      appId: "node-control-0002",
      imgPath: imgControlPath + "end.png"
    },
    {
      label: "输入参数",
      onlyOne: true,
      metaData: [],
      appId: "node-control-0003",
      imgPath: imgControlPath + "input.png"
    },
    {
      label: "定时器",
      onlyOne: true,
      metaData: [],
      appId: "node-control-0004",
      imgPath: imgControlPath + "timer.png"
    },
    {
      label: "webhook",
      onlyOne: true,
      metaData: [],
      appId: "node-control-0005",
      imgPath: imgControlPath + "webhook.png"
    }
  ];
}
