<template>
  <span>是否需要执行结果通知？ </span>
  <a-radio-group v-model:value="needNotify">
    <a-radio :value="1">是</a-radio>
    <a-radio :value="2">否</a-radio>
  </a-radio-group>
  <a-form
    v-if="needNotify === 1"
    v-model="notifyForm"
    labelAlign="right"
    :wrapperCol="wrapperCol"
    :labelCol="labelCol"
  >
    <a-form-item label="邮件通知">
      <a-input v-model="notifyForm.email"> </a-input>
    </a-form-item>
    <a-form-item label="微信通知">
      <a-input v-model:value="notifyForm.weiChatId"></a-input>
    </a-form-item>
    <a-form-item label="webhook通知">
      <a-input v-model:value="notifyForm.webhookUrl">
        <template #addonBefore>
          <a-select
            v-model:value="notifyForm.webhookUrlType"
            style="width: 90px"
          >
            <a-select-option value="Http://">Http://</a-select-option>
            <a-select-option value="Https://">Https://</a-select-option>
          </a-select>
        </template>
      </a-input>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Form, Input, Radio, Select } from "ant-design-vue";
import { NotifyItem } from "./interface";
export default defineComponent({
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-radio": Radio,
    "a-radio-group": Radio.Group,
    "a-select": Select,
    "a-select-option": Select.Option
  },
  setup() {
    const needNotify = ref<number>(2);
    const wrapperCol = {
      sm: { span: 14, offset: 1 }
    };
    const labelCol = {
      sm: { span: 4 }
    };
    return { needNotify, wrapperCol, labelCol };
  },
  data() {
    const notifyForm: NotifyItem = {
      weiChatId: "",
      webhookUrl: "",
      webhookUrlType: "Http://",
      email: ""
    };
    return {
      notifyForm
    };
  }
});
</script>
