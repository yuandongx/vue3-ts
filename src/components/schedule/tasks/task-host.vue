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
      :columns="tableColumsSelectHost"
      :dataSource="dataSource"
      :pagination="{ pageSize: 50 }"
      :scroll="{ y: 240 }"
      :rowSelection="rowSelection"
    >
      <template
        #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              e => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters)"
          >
            Reset
          </a-button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #customRender="{ text, column }">
        <span
          v-if="state.searchText && state.searchedColumn === column.dataIndex"
        >
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(
                new RegExp(
                  `(?<=${state.searchText})|(?=${state.searchText})`,
                  'i'
                )
              )"
          >
            <mark
              v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
              class="highlight"
              :key="i"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { Modal, Table, Input, Button } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { HostInfo } from "../com/interface";
export default defineComponent({
  components: {
    "a-table": Table,
    "a-modal": Modal,
    "a-input": Input,
    "a-button": Button,
    SearchOutlined
  },
  methods: {
    onCancel() {
      this.setThisVisible(false);
    }
  },
  data() {
    const dataSource: Array<HostInfo> = [];
    return {
      dataSource
    };
  },
  mounted() {
    const fetch = (p: string) => {
      this.$http.get(`/v1/cluster/${p}/`).then(({ data }) => {
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((item: any) => {
          const d: HostInfo = {
            name: item.hostname,
            ip: item.hostip,
            port: item.port,
            platform: p,
            description: "-",
            id: item.id,
            key: item.id + "-" + p
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
    const searchInput = ref();
    const store = useStore();
    let selectHosts: HostInfo[] = [];
    const state = reactive({
      searchText: "",
      searchedColumn: ""
    });
    const thisVisible = computed((): boolean => {
      return store.getters.selectHostVisible;
    });
    const selectedHosts = computed(() => {
      return store.getters.selectedHosts;
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
        if (selectedRowKeys.length === selectedRows.length) {
          selectHosts = selectedRows;
        }
      },
      onSelect: (
        record: HostInfo,
        selected: boolean,
        selectedRows: HostInfo[]
      ) => {
        // console.log(record, selected, selectedRows);
        selectHosts = selectedRows;
      },
      onSelectAll: (selected: boolean, selectedRows: HostInfo[]) => {
        // console.log(selected, selectedRows);
        if (selected) {
          selectHosts = selectedRows;
        } else {
          selectHosts = [];
        }
      }
    };
    const tableColumsSelectHost = [
      {
        title: "主机名",
        dataIndex: "name",

        slots: {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender"
        },
        onFilter: (value: string, record: HostInfo) =>
          record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 0);
          }
        }
      },
      { title: "平台", dataIndex: "platform" },
      {
        title: "主机地址",
        dataIndex: "ip",
        slots: {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender"
        },
        onFilter: (value: string, record: HostInfo) =>
          record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 0);
          }
        }
      },
      // { title: "访问端口", dataIndex: "port" },
      { title: "其它信息", dataIndex: "description" }
    ];
    const handleSearch = (
      selectedKeys: Array<string>,
      confirm: Function,
      dataIndex: string
    ) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const onOk = () => {
      setThisVisible(false);
      const seleted: HostInfo[] = selectedHosts.value;
      for (const h of selectHosts) {
        if (!seleted.includes(h)) {
          seleted.push(h);
        }
      }
      setSelectedHosts(seleted);
    };
    const handleReset = (clearFilters: Function) => {
      clearFilters();
      state.searchText = "";
    };
    return {
      thisVisible,
      setThisVisible,
      setSelectedHosts,
      rowSelection,
      tableColumsSelectHost,
      handleSearch,
      handleReset,
      state,
      searchInput,
      selectHosts,
      onOk
    };
  }
});
</script>
