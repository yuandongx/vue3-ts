<template>
  <a-table :rowSelection="rowSelections" :data-source="data" :columns="columns" :rowKey="recoder => recoder.id" :loading="loading">
    <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          :ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          查找
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          重置
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
      <template #customRender="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" class="highlight" :key="i">
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template #statusTags="{ text }">
      <span>
        <a-tag :color="tagColor(text)">{{ tagMsg(text) }}</a-tag>
      </span>
    </template>
    <template #moreOperations="{ record }">

      <Tooltip title="修改">
      <EditTwoTone @click="modify(record)"/>
      </Tooltip>
      <divide type="vertical"/>
      <Tooltip title="删除">
      <DeleteTwoTone @click="deleteHosts(record)"/>
      </Tooltip>
      <divide type="vertical"/>
      <Tooltip title="终端交互" @click="openConsole(record)">
      <InteractionTwoTone/>
      </Tooltip>
    </template>
  </a-table>
</template>

<script lang="ts">
import  { createVNode, defineComponent } from "vue";
import { SearchOutlined, DeleteTwoTone, EditTwoTone, InteractionTwoTone, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import {Divider, Modal, Tooltip, Table, Button, Input, Tag, message} from "ant-design-vue";
const data: [] = [];
const colors = ["green", "default", "red", "warning"];
const tagmsgs = ["验证成功", "未验证", "主机不可达", "认证失败"];
export default defineComponent ({
  components: {
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Input.name]: Input,
    [Table.name]: Table,
    [Modal.name]: Modal,
    SearchOutlined,
    DeleteTwoTone,
    EditTwoTone,
    InteractionTwoTone,
    divide: Divider,
    Tooltip,
  },
  
});
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
.menustyle{
  border: 0em;
  height: 10em;
}
</style>
