<template>
  <div class="div-main-panel box">
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
  <div class="div-content-panel box">
    <div class="div-header" id="header-g6">
      <div id="toolbarContainer" />
    </div>
    <div class="div-content-canvas" id="content-g6" />
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
  registerBehavior,
  Minimap
} from "@antv/g6";
import insertCss from "insert-css";
import { Tabs, Tooltip } from "ant-design-vue";
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
    "a-tool-tip": Tooltip
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
    loadCss() {
      insertCss(`
                .g6-minimap-container {
                    border: 1px solid #606067;
                }

                .g6-minimap-viewport {
                    border: 2px solid #000;
                }

                .g6-minimap {
                    position: fixed;
                    right: 10px;
                    bottom: 10px;
                }
                
                .g6-component-contextmenu {
                    position: absolute;
                    list-style-type: none;
                    padding: 10px 8px;
                    left: -150px;
                    background-color: rgba(255, 255, 255, 0.9);
                    border: 1px solid #e2e2e2;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #3c3c3c;
                }

                .g6-component-contextmenu ul {
                    padding-left: 0px;
                    line-height: 30px;
                    margin: 0px;
                }

                .g6-component-contextmenu li {
                    cursor: pointer;
                    list-style-type:none;
                    list-style: none;
                    margin-left: 0px;
                }

                .g6-component-contextmenu li:hover {
                    color: #bd2c2d;
                }

            `);
    },
    onInit() {
      const width = document.getElementById("content-g6")?.scrollWidth;
      const height = document.getElementById("content-g6")?.scrollHeight;
      const menu = new GMenu({
        offsetX: 6,
        offsetY: 6,
        itemTypes: ["node", "edge"],
        getContent() {
          const outDiv = document.createElement("div");
          outDiv.style.width = "70px";
          outDiv.innerHTML = `<ul>
              <li>查看</li>
              <li>编辑</li>
              <li>删除</li>
            </ul>`;
          return outDiv;
        },
        handleMenuClick(target: Event, item: Item): void {
          console.log(target, item);
        }
      });
      const minMap = new Minimap({
        size: [150, 100],
        className: "minmap",
        type: "delegate"
      });

      this.g6 = new Graph({
        container: "content-g6",
        width: width,
        height: height,
        // fitCenter: true,
        defaultNode: {
          type: "image",
          clipCfg: {
            show: true,
            type: "circle"
          },
          anchorPoints: [
            [0, 0.5],
            [0.5, 0],
            [1, 0.5],
            [0.5, 1]
          ]
        },
        defaultEdge: {
          type: "polyline",
          style: {
            stroke: "#9C9C9C",
            lineWidth: 3,
            endArrow: true
          }
        },
        edgeStateStyles: {
          hover: {
            stroke: "#4F4F4F",
            lineWidth: 4
          }
        },
        layout: {
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
        plugins: [menu, minMap],
        enabledStack: true
      });

      this.g6.read({ nodes: [], edges: [] });
      const self = this;
      registerBehavior("clik-add-edge", {
        getEvents() {
          return {
            "node:click": "onClick",
            mousemove: "onMousemove",
            "edge:click": "onEdgeClick",
            "edge:mouseenter": "onEdgeMouseEnter",
            "edge:mouseleave": "onEdgeMouseLeave"
          };
        },
        onEdgeMouseEnter(event: IG6GraphEvent) {
          const item = event.item;
          if (item) {
            self.g6?.setItemState(item, "hover", true);
          }
        },
        onEdgeMouseLeave(event: IG6GraphEvent) {
          const item = event.item;
          if (item) {
            self.g6?.setItemState(item, "hover", false);
          }
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
      this.g6?.read(this.graphdata as GraphData);
    }
  }
});
</script>
<style scoped>
.box {
  float: left;
  border-width: 1px;
  height: 85vh;
}
.div-main-panel {
  border-color: rgb(70, 126, 70);
  border-style: groove;
  width: 10%;
}
.div-content-panel {
  border-color: rgb(12, 117, 12);
  border-style: groove;
  width: 90%;
  overflow: auto;
}
.div-node {
  width: 100px;
  height: 100px;
}
img {
  max-width: 50%;
  height: auto;
}
.div-content-canvas {
  height: 70vh;
  border-width: 1px;
  border-color: blue;
  background-color: rgb(205, 209, 201);
}
.div-header {
  background-color: blanchedalmond;
}
</style>
