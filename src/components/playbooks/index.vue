<template>
  <div class="div-0-panel box">
    <a-tabs :tabBarGutter="tabBarGutter">
      <a-tab-pane key="1">
        <template #tab>
          <a-tool-tip>
            <template #title>
              <span>控制器</span>
            </template>
            <ControlFilled />
          </a-tool-tip>
        </template>
        <div
          class="div-node"
          draggable="true"
          @dragend="onDragEnd($event, '/img/playbook/control/end.png', 'end')"
        >
          <img src="/img/playbook/control/end.png" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <a-tool-tip>
            <template #title>
              <span>应用</span>
            </template>
            <AppstoreFilled />
          </a-tool-tip>
        </template>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #tab>
          <a-tool-tip>
            <template #title>
              <span>变量</span>
            </template>
            <SettingFilled />
          </a-tool-tip>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div class="div-1-panel box">
    <a-layout>
      <a-layout-header>header</a-layout-header>
      <a-layout-content>
        <div class="div-content" id="content-g6"></div>
      </a-layout-content>
      <a-layout-foot>foot</a-layout-foot>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  Graph,
  Menu as GMenu,
  GraphData,
  TreeGraphData,
  IG6GraphEvent,
  Item,
  registerBehavior
} from "@antv/g6";
import { Tabs, Tooltip, Layout } from "ant-design-vue";
import { getUID } from "./base";
import {
  AppstoreFilled,
  ControlFilled,
  SettingFilled
} from "@ant-design/icons-vue";
type G6data = GraphData | TreeGraphData | undefined;
interface Data {
  g6: Graph | null;
  tabBarGutter: number;
  graphdata: G6data;
  currentEdge: Item | undefined;
  sourceNodeId: string | undefined;
  edgeId: string | undefined;
  addingEdge: boolean;
}

export default defineComponent({
  components: {
    AppstoreFilled,
    ControlFilled,
    SettingFilled,
    "a-tabs": Tabs,
    "a-tab-pane": Tabs.TabPane,
    "a-tool-tip": Tooltip,
    "a-layout": Layout,
    "a-layout-header": Layout.Header,
    "a-layout-content": Layout.Content,
    "a-layout-foot": Layout.Footer
  },
  data() {
    return {
      tabBarGutter: 0,
      g6: null,
      graphdata: undefined,
      currentEdge: undefined,
      sourceNodeId: undefined,
      edgeId: undefined,
      addingEdge: false
    } as Data;
  },
  mounted() {
    this.onInit();
  },
  methods: {
    onInit() {
      const width = document.getElementById("content-g6")?.scrollWidth;
      const height = document.getElementById("content-g6")?.scrollHeight;
      const menu = new GMenu({
        offsetX: 6,
        offsetY: 6,
        itemTypes: ["node"],
        getContent() {
          const outDiv = document.createElement("div");
          outDiv.style.width = "180px";
          outDiv.innerHTML = `<ul>
              <li>测试01</li>
              <li>测试01</li>
              <li>测试01</li>
              <li>测试01</li>
              <li>测试01</li>
            </ul>`;
          return outDiv;
        },
        // eslint-disable-next-line
        handleMenuClick(target: Event, item: any): void {
          console.log(target, item);
        }
      });
      this.g6 = new Graph({
        container: "content-g6",
        width: width,
        height: height,
        defaultNode: {
          type: "image",
          clipCfg: {
            show: true,
            type: "circle"
          }
        },
        defaultEdge: {
          type: "polyline",
          style: {
            stroke: "#000000",
            lineWidth: 5,
            endArrow: true
          }
        },
        layout: {
          type: "force",
          preventOverlap: true,
          linkDistance: 100
        },
        modes: {
          addEdge: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            "clik-add-edge",
            "click-select"
          ]
        },
        plugins: [menu]
      });

      this.g6.read({ nodes: [], edges: [] });
      const self = this;
      registerBehavior("clik-add-edge", {
        getEvents() {
          return {
            "node:click": "onClick",
            mousemove: "onMousemove",
            "edge:click": "onEdgeClick"
          };
        },
        onMousemove(event: IG6GraphEvent) {
          if (self.currentEdge != undefined) {
            const point = {
              x: event.x,
              y: event.y
            };
            self.g6?.updateItem(self.currentEdge, {
              target: point
            });
          }
        },
        onClick(event: IG6GraphEvent) {
          const point = {
            x: event.x,
            y: event.y
          };
          const node = event.item;
          if (node) {
            const id = node.getID();
            if (self.currentEdge == undefined && self.addingEdge == false) {
              // self.edgeId = getUID();
              self.currentEdge = self.g6?.addItem("edge", {
                id: self.edgeId,
                source: id,
                target: point
              });
              self.addingEdge = true;
            } else if (self.currentEdge != undefined && self.addingEdge) {
              self.g6?.updateItem(self.currentEdge, {
                target: id
              });
              self.currentEdge = undefined;
              self.addingEdge = false;
            }
          } else {
            console.log("click node ", node, " is not accessed.");
          }
        },
        onEdgeClick(event: IG6GraphEvent) {
          const item = event.item;
          if (item) {
            if (self.addingEdge && self.currentEdge?.getID() == item.getID()) {
              self.g6?.removeItem(self.currentEdge);
              self.currentEdge = undefined;
              self.addingEdge = false;
            }
          }
        }
      });
      self.g6?.setMode("addEdge");
    },

    onEdgeClick(e: IG6GraphEvent) {
      console.log(e);
    },

    onDragEnd(event: IG6GraphEvent, icon: string, nid: string) {
      // event.dataTransfer?.setData("text/plain", icon);
      const point = this.g6?.getPointByClient(event.x, event.y);
      const newNode = {
        label: nid,
        img: icon,
        id: getUID("node"),
        x: point?.x,
        y: point?.y,
        type: "image",
        size: 50
      };
      this.g6?.add("node", newNode);
      this.graphdata = this.g6?.save();
      // console.log(this.graphdata);
      this.g6?.read(this.graphdata as GraphData);
    }
  }
});
</script>
<style scoped>
.box {
  float: left;
  border-width: 2px;
  height: 85vh;
}
.div-0-panel {
  border-color: rgb(18, 19, 18);
  border-style: groove;
  width: 10%;
}
.div-1-panel {
  border-color: rgb(18, 19, 18);
  border-style: groove;
  width: 90%;
  overflow: auto;
}
.div-2-panel {
  border-color: rgb(18, 19, 18);
  border-style: groove;
  width: 10%;
}
.div-node {
  width: 100px;
  height: 100px;
}
img {
  max-width: 50%;
  height: auto;
}
.div-content {
  height: 70vh;
}
</style>
