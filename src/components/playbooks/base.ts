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

export interface Node {
  label: string;
  img: string;
  id: string;
  onlyOne?: boolean;
  x?: number | undefined;
  y?: number | undefined;
  type?: string;
  size?: number;
}
export interface Edge {
  source: string;
  target: string;
}
export interface Variable {
  key: string;
  value: string;
}
export interface GraphData {
  nodes: Array<Node>;
  edges: Array<Edge>;
}
export interface TaskNode extends Node {
  variables?: Array<Variable>;
  uid: string;
}

export function CreateNode(
  label: string,
  img: string,
  x: number | undefined,
  y: number | undefined,
  onlyOne: boolean,
  type: string
) {
  return {
    label: label,
    img: img,
    id: getUID("node"),
    x: x,
    y: y,
    onlyOne: onlyOne,
    type: type,
    size: 100
  } as Node;
}
