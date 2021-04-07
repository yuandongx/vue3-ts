<template>
  <a-modal
    :visible="thisVisible"
    title="选择执行主机"
    okText="确定"
    cancelText="取消"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-table
      :columns="TableColumsSelectHost"
      :dataSource="dataSource"
      :rowSelection="rowSelection"
    ></a-table>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { Modal, Table } from "ant-design-vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { HostInfo, TableColumsSelectHost } from "../com/interface";
export default defineComponent({
  components: {
    "a-table": Table,
    "a-modal": Modal
  },
  methods: {
    onOk() {
      this.setThisVisible(false);
    },
    onCancel() {
      this.setThisVisible(false);
    }
  },
  data() {
    const dataSource: Array<HostInfo> = [];
    return {
      TableColumsSelectHost,
      dataSource
    };
  },
  mounted() {
    const fetch = (p: string) => {
      this.$http.get(`/api/cluster/${p}/`).then(({ data }) => {
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((item: any) => {
          const d: HostInfo = {
            name: item.hostname,
            ip: item.hostip,
            port: item.port,
            platform: p,
            description: "-",
            id: item.id
          };
          this.dataSource.push(d);
        });
      });
    };
    const platforms = ["linux", "router", "firewall", "switch"];

    for (const p of platforms) {
      fetch(p);
    }
  },
  setup() {
    const store = useStore();
    const thisVisible = computed((): boolean => {
      return store.getters.selectHostVisible;
    });
    const setThisVisible = (v: boolean) => {
      store.commit(MutationType.SetSelectHostsVisible, v);
    };
    const setSelectedHosts = (v: Array<HostInfo>) => {
      store.commit(MutationType.SetSelectedHosts, v);
    };
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
    return { thisVisible, setThisVisible, setSelectedHosts, rowSelection };
  }
});
</script>
