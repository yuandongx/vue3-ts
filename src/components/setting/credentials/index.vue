<template>
  <a-row>
    <a-col :span="2">
      <a-button type="link" @click="edit">添加访问凭证</a-button>
    </a-col>
    <a-col :span="4"><a-input-serch placeholder="输入信息以查找" enter-button="查找"/> </a-col>
  </a-row>
  <edit-form :show="editFormShow"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { FormData } from "./interface"
import { Row, Col, Button, Input } from "ant-design-vue";
import EditForm from "./form.vue";

export default defineComponent({
  components: {
    "a-row": Row,
    "a-col": Col,
    "a-button": Button,
    "a-input-serch": Input.Search,
    "edit-form": EditForm
  },
  methods: {
    edit(data: FormData|undefined) {
      this.editFormShow = true;
    }
  },
  data() {
    return {
      editFormShow: false
    }
  },
  // setup() {
    
  // }
})
</script>
