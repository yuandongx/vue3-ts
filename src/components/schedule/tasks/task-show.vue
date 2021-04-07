<template>
  <a-table :columns="taskColums"> </a-table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Table } from "ant-design-vue";
import { TaskColums } from "../com/interface";

export default defineComponent({
  components: {
    "a-table": Table
  },
  data() {
    return {
      taskColums: TaskColums
    };
  }
});
</script>
