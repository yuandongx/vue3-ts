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
import { Graph, Menu as GMenu, GraphData, TreeGraphData } from "@antv/g6";
import { Tabs, Tooltip, Layout } from "ant-design-vue";
import { guid } from "./base";
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
      graphdata: undefined
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
        layout: {
          type: "force",
          preventOverlap: true,
          linkDistance: 100
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node", "create-edge"]
        },
        plugins: [menu]
      });
      this.g6.read({ nodes: [], edges: [] });
    },
    onDragEnd(event: DragEvent, icon: string, nid: string) {
      event.dataTransfer?.setData("text/plain", icon);
      const point = this.g6?.getPointByClient(event.screenX, event.screenY);
      const newNode = {
        label: nid,
        img: icon,
        id: guid(),
        x: point?.x,
        y: point?.y,
        type: "image",
        size: 50
      };
      this.g6?.add("node", newNode);
      this.graphdata = this.g6?.save();
      console.log(this.graphdata);
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
