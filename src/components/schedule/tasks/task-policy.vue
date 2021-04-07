<template>
  <a-form layout="vertical">
    <a-tabs tab-position="left">
      <a-tab-pane key="1" tab="一次性执行">
        <a-form-item label="执行时间"
          ><a-date-picker
            placeholder="选择时间"
            :showTime="true"
          ></a-date-picker
        ></a-form-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="每天执行">
        <a-form-item label="选择每天执行时间">
          <a-time-picker></a-time-picker>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="3" tab="每周执行">
        <a-form-item label="选择星期几">
          <a-select
            mode="multiple"
            v-model:value="days"
            style="width: 100%"
            placeholder="Please select"
            @change="handleSelectChange"
          >
            <a-select-option v-for="i in weekdays" :key="i.key">
              {{ i.value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择时间">
          <a-time-picker></a-time-picker>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="4" tab="每月执行">
        <a-form-item label="选择时间">
          <a-date-picker
            v-model:value="valueByMothon"
            :showTime="true"
          ></a-date-picker>
          <a-button type="primary" shape="circle" @click="addDateByMonth">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-form-item>
        <a-list :data-source="listSelectMothons" :pagination="pagination">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <delete-outlined @click="handleDeleteMothon(item.key)" />
              </template>
              {{ item.value }}
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="6" tab="linux corn" disabled>
        <a-form-item label="月份">
          <a-select>
            <a-select-option
              v-for="m in mothons"
              :key="m"
              :value="m"
            ></a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-tab-pane>
    </a-tabs>
  </a-form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  Tabs,
  DatePicker,
  Form,
  TimePicker,
  Select,
  Button,
  List
} from "ant-design-vue";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import moment, { Moment } from "moment";
interface Week {
  key: string;
  value: string;
}
interface DataTimeItem {
  key: number;
  value: string;
}
export default defineComponent({
  components: {
    PlusOutlined,
    DeleteOutlined,
    "a-list": List,
    "a-list-item": List.Item,
    "a-button": Button,
    "a-tabs": Tabs,
    "a-date-picker": DatePicker,
    // "a-week-picker": DatePicker.WeekPicker,
    "a-tab-pane": Tabs.TabPane,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-time-picker": TimePicker,
    "a-select": Select,
    "a-select-option": Select.Option
  },
  data() {
    const weekdays: Week[] = [
      { key: "1", value: "星期一" },
      { key: "2", value: "星期二" },
      { key: "3", value: "星期三" },
      { key: "4", value: "星期四" },
      { key: "5", value: "星期五" },
      { key: "6", value: "星期六" },
      { key: "7", value: "星期七" }
    ];
    const formDate = "YYYY-MM-DD HH:mm:ss";
    const days: string[] = [];
    const valueByMothon: Moment = moment(undefined);
    const listSelectMothons: DataTimeItem[] = [];
    const countSeletMothon = 0;
    const mothons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return {
      weekdays,
      formDate,
      valueByMothon,
      listSelectMothons,
      countSeletMothon,
      days,
      mothons
    };
  },
  methods: {
    handleSelectChange() {
      console.log();
    },
    addDateByMonth() {
      const f: string | undefined = "每月的 DD日 HH时 mm分 ss秒";
      if (this.valueByMothon != undefined) {
        this.listSelectMothons.push({
          key: this.countSeletMothon++,
          value: this.valueByMothon.format(f)
        });
      }
      this.valueByMothon = moment(undefined);
    },
    handleDeleteMothon(key: number) {
      console.log(key);
      this.listSelectMothons = this.listSelectMothons.filter(
        (item: DataTimeItem) => item.key !== key
      );
    }
  },
  setup() {
    const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize: 3
    };
    return {
      pagination
    };
  }
});
</script>
