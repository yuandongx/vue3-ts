import moment from "moment";

const charsUUID =
  "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
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

export interface DataNode {
  label: string;
  id: string;
  onlyOne?: boolean;
  metaData: MetaData[];
}
