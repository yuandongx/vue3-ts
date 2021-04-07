<template>
  <a-modal :visible="thisVisible" title="创建任务" @cancel="cancel">
    <template #footer>
      <a-button v-if="current == 0" key="cancel" @click="cancel">取消</a-button>
      <a-button v-if="current !== 0" key="back" @click="previous"
        >上一步</a-button
      >
      <a-button
        v-if="current < steps.length - 1"
        key="next"
        type="primary"
        :loading="loading"
        @click="next"
        >下一步</a-button
      >
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        key="submit"
        @click="commit"
        >完成</a-button
      >
    </template>
    <a-steps v-model:current="current">
      <a-step
        v-for="item in steps"
        :title="item.title"
        :key="item.key"
      ></a-step>
    </a-steps>
    <a-divider />
    <a-form v-model="taskForm" layout="vertical">
      <a-form-item
        v-if="current == 0"
        label="任务内容:"
        :wrapperCol="rowItemWrap"
      >
        <a-input-text-area :autosize="textAreaSize" showCount />
      </a-form-item>
      <a-button
        v-if="current == 1"
        type="link"
        @click="onSelectHosts"
        class="opreat-host-button"
        >选择主机</a-button
      >
      <a-button v-if="current == 1" type="link" class="opreat-host-button"
        >删除主机</a-button
      >
      <a-table
        v-if="current == 1"
        :columns="TableColums"
        :dataSource="selectedHosts"
        :row-selection="rowSelection"
      ></a-table>
    </a-form>
    <select-host />
  </a-modal>
</template>
<script lang="ts">
import {
  Modal,
  Steps,
  Button,
  Form,
  Input,
  Divider,
  Table
} from "ant-design-vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { defineComponent, computed, ref } from "vue";
import { TaskInfo, TableColums, HostInfo } from "../com/interface";
import SelectHost from "./select-host.vue";
const rowItemWrap = {
  sm: { span: 22, offset: 1 }
};
const textAreaSize = { minRows: 6, maxRows: 10 };
const taskForm: TaskInfo = {
  name: "",
  platform: "",
  description: "",
  author: "",
  createTime: "",
  contents: "",
  policy: 0,
  interval: 0,
  repeat: 0
};
export default defineComponent({
  data() {
    return {
      steps: [
        { key: "1", title: "任务内容" },
        { key: "2", title: "目标主机" },
        { key: "3", title: "执行策略" }
      ],
      rowItemWrap,
      loading: false,
      nextText: "下一步",
      previousText: "取消",
      cancelButtonProps: {},
      taskForm,
      textAreaSize,
      TableColums
    };
  },
  components: {
    SelectHost,
    "a-modal": Modal,
    "a-steps": Steps,
    "a-step": Steps.Step,
    "a-button": Button,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input-text-area": Input.TextArea,
    "a-divider": Divider,
    "a-table": Table
  },
  setup() {
    const store = useStore();
    const current = ref<number>(0);
    const thisVisible = computed((): boolean => {
      return store.getters.taskCreateVisible;
    });
    const setThisVisible = (v: boolean) => {
      store.commit(MutationType.SetTaskCreateVisible, v);
    };
    const setSelectHostsVisible = (v: boolean) => {
      store.commit(MutationType.SetSelectHostsVisible, v);
    };
    const selectedHosts = computed(() => {
      return store.getters.selectedHosts;
    });
    const rowSelection = {
      onChange: (
        selectedRowKeys: (string | number)[],
        selectedRows: HostInfo[]
      ) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (
        record: HostInfo,
        selected: boolean,
        selectedRows: HostInfo[]
      ) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (
        selected: boolean,
        selectedRows: HostInfo[],
        changeRows: HostInfo[]
      ) => {
        console.log(selected, selectedRows, changeRows);
      }
    };
    return {
      current,
      thisVisible,
      setSelectHostsVisible,
      setThisVisible,
      selectedHosts,
      rowSelection
    };
  },
  methods: {
    cancel() {
      this.setThisVisible(false);
      this.current = 0;
    },
    previous() {
      this.current = this.current - 1;
    },
    next() {
      this.current = this.current + 1;
    },
    commit() {
      console.log("已提交任务");
    },
    onSelectHosts() {
      this.setSelectHostsVisible(true);
    }
  }
});
</script>
<style lang="less" scoped>
.opreat-host-button {
  margin-bottom: 2px;
  margin-left: 2px;
  margin-right: 2px;
}
</style>
