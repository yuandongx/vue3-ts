<template>
  <a-modal
    :visible="addHostVisiable"
    title="添加新主机"
    @ok="handleAddOk"
    destroyOnClose
    okText="确定"
    cancelText="取消"
    @cancel="handleAddCancle"
  >
    <a-form
      :model="form"
      ref="ruleForm"
      :rules="rules"
      name="add-new-host"
      @finish="addFinsh"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @finishFailed="addFinishFailed"
    >
      <a-form-item name="hostname" label="主机名" hasFeedback>
        <a-input v-model:value="form.hostname" autocomplete="off"></a-input>
      </a-form-item>
      <a-form-item name="hostgroup" label="主机组" hasFeedback>
        <a-select
          placeholder="请选择主机组"
          v-model:value="form.hostgroup"
          show-search
        >
          <template #dropdownRender="{ menuNode: menu }">
            <v-nodes :vnodes="menu" />
            <a-divider style="margin: 4px 0;" />
            <div
              style="padding: 4px 8px; cursor: pointer;"
              @mousedown="e => e.preventDefault()"
              @click="addItem"
            >
              <plus-outlined /> 新加主机组
              <a-modal
                v-model:visible="newGroupModal"
                @ok="handleNewGroupOk"
                okText="确定"
                cancelText="取消"
                @cancel="handleNewGroupCancle"
                title="新加主机组"
              >
                <a-input
                  v-model:value="newGroup"
                  placeholder="新主机组名"
                ></a-input>
              </a-modal>
            </div>
          </template>
          <a-select-option v-for="g in groups" :key="g">{{
            g
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="hostip" label="主机地址" required hasFeedback>
        <a-input v-model:value="form.hostip" autocomplete="off"></a-input>
      </a-form-item>
      <a-form-item name="port" label="端口" hasFeedback>
        <a-input-number v-model:value="form.port" autocomplete="off" />
      </a-form-item>
      <a-form-item name="credential" label="访问凭证" hasFeedback>
        <a-select
          placeholder="请选择访问凭证"
          v-model:value="form.credential"
          show-search
        >
          <a-select-option v-for="item in credentials" :key="item">{{
            item
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="description" label="描述信息">
        <a-textarea
          v-model:value="form.description"
          autocomplete="off"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  message,
  Modal,
  Form,
  Select,
  Input,
  InputNumber,
  Divider
} from "ant-design-vue";
import { computed, defineComponent, App } from "vue";
interface FormData {
  hostname: string;
  hostgroup: string;
  hostip: string;
  port: number;
  credential: string;
  description: string;
  id?: string | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatIp = (_: any, value: string) => {
  const tmp = value
    .split(".")
    .filter(
      item =>
        Number(item) != Number.NaN && Number(item) < 256 && Number(item) > 0
    );
  if (tmp.length != 4) {
    return Promise.reject("IP 地址无效！");
  }
  return Promise.resolve();
};
export default defineComponent({
  components: {
    [Divider.name]: Divider,
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Select.name]: Select,
    "a-select-option": Select.Option,
    [Input.name]: Input,
    "a-textarea": Input.TextArea,
    [InputNumber.name]: InputNumber,
    PlusOutlined,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    }
  },
  props: {
    platform: {
      type: String,
      default: "linux"
    }
  },
  data() {
    return {
      newGroup: "",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      credentials: [],
      newGroupModal: false,
      groups: [],
      form: {
        hostname: "",
        hostgroup: "",
        hostip: "",
        port: 22,
        credential: "",
        description: ""
      } as FormData,
      rules: {
        hostname: [
          { required: true, message: "请输入主机名", trigger: "blur" },
          { min: 1, max: 64, message: "名称长度应从1到64", trigger: "blur" }
        ],
        hostgroup: [
          { required: true, message: "请选择主机组", trigger: "blur" },
          { min: 1, max: 64, message: "组名长度应从1到64", trigger: "blur" }
        ],
        hostip: [
          {
            required: true,
            message: "请输入有效的主机IP地址",
            trigger: "blur",
            validator: validatIp
          }
        ],
        port: [
          {
            required: true,
            type: "number",
            message: "请输入端口",
            trigger: "blur"
          },
          {
            type: "number",
            min: 1,
            max: 65535,
            message: "端口应从1到65535",
            trigger: "blur"
          }
        ],
        credential: [
          { required: true, message: "请选择访问凭证", trigger: "blur" }
        ],
        description: [
          { max: 512, message: "描述信息长度应小于512个字符", trigger: "blur" }
        ]
      }
    };
  },
  setup() {
    const store = useStore();
    const addHostVisiable = computed(
      (): boolean => store.getters.clusterAddVisible
    );
    const setVisible = (v: boolean) => {
      store.commit(MutationType.SetClusterAddVisible, v);
    };
    return { addHostVisiable, setVisible };
  },
  mounted() {
    this.fetchCred();
    this.fetchGroups();
  },
  methods: {
    handleAddOk: async function() {
      (this.$refs.ruleForm as App & { validate: Function })
        .validate()
        .then(() => {
          this.add();
        });
    },
    add() {
      this.setVisible(false);
      if (this.form.id !== undefined) {
        this.$http
          .post(`/api/cluster/${this.platform}/update`, this.form)
          .then(respone => {
            if (respone.data == "failed") {
              message.error("保存失败");
            } else {
              message.success(respone.data);
            }
          });
      } else {
        this.$http
          .post(`/api/cluster/${this.platform}/add`, this.form)
          .then(respone => {
            if (respone.data == "failed") {
              message.error("保存失败");
            } else {
              message.success(respone.data);
            }
          });
      }
    },
    handleAddCancle: function() {
      this.setVisible(false);
    },
    handleNewGroupOk: function() {
      this.newGroupModal = false;
      this.form.hostgroup = this.newGroup;
    },
    handleNewGroupCancle: function() {
      this.newGroupModal = false;
    },
    addFinsh: function() {
      console.log();
    },
    addFinishFailed: function() {
      console.log();
    },
    fetchCred: function() {
      this.$http.get("/api/setting/credential").then(({ data }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.credentials = data.map((item: { name: any }) => item.name);
      });
    },
    fetchGroups: function() {
      this.$http.get(`/api/cluster/${this.platform}/group`).then(({ data }) => {
        this.groups = data;
      });
    },
    addItem() {
      this.newGroupModal = true;
    },
    update: function(row: FormData) {
      this.addHostVisiable = true;
      this.form = row;
    }
  }
});
</script>
