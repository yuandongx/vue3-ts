<template>
  <a-modal
    :visible="theVisible"
    okText="确定"
    cancelText="取消"
    @ok="onOk"
    @cancel="onCancel"
    :okDisble="okDisble"
    title="批量导入"
  >
    <a-tag :color="levelColor">
      <template #icon>
        <CheckCircleOutlined v-if="levelColor == 'success'" />
        <ClockCircleOutlined v-else-if="levelColor == 'error'" />
        <ExclamationCircleFilled v-else />
      </template>
      {{ msg }}
    </a-tag>
    <br />
    <div>
      <a href="resource/template.xlsx">下载模板</a>
      <a-upload
        :customRequest="upload"
        @change="handleChange"
        :multiple="false"
        v-model:fileList="fileList"
      >
        <a-button type="link">上传文件</a-button>
      </a-upload>
    </div>
  </a-modal>
</template>
<script lang="ts">
import {
  ExclamationCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons-vue";
import { Modal, Button, Upload, Tag, message } from "ant-design-vue";
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
interface Data {
  commit?: string;
  file: string;
  fileAlias: string;
  levelColor: string;
  fileList: Array<FileItem>;
  msg: string;
  theVisible?: boolean;
}
interface Resonse {
  url?: string;
  status?: string;
}
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: Resonse;
  url?: string;
}
interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
interface ButtonProp {
  disabled: boolean;
}
export default defineComponent({
  props: {
    platform: {
      type: String,
      default: "linux"
    }
  },
  setup() {
    const store = useStore();
    const theVisible = computed(
      (): boolean => store.getters.clusterImportVisible
    );
    const setTheVisible = (v: boolean) => {
      store.commit(MutationType.SetClusterImportVisible, v);
    };
    return { theVisible, setTheVisible };
  },
  data() {
    return {
      fileList: [],
      msg: "请先下载 Excel 模板文件，并填写表格字段对应，然后上传！",
      levelColor: "warning",
      fileAlias: "",
      file: ""
    } as Data;
  },
  components: {
    ExclamationCircleFilled,
    ClockCircleOutlined,
    CheckCircleOutlined,
    [Button.name]: Button,
    [Modal.name]: Modal,
    [Upload.name]: Upload,
    [Tag.name]: Tag
  },
  methods: {
    handleChange(info: FileInfo) {
      let fileList: FileItem[] = [...info.fileList];
      // 1. Limit th]e number (fileaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);
      // 2. read from response and sho;w file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      this.fileList = fileList;
    },
    onOk() {
      const commit = this.commit;
      console.log(this.fileList.length > 0 && this.levelColor == "success");
      if (this.fileList.length > 0 && this.levelColor == "success") {
        Modal.confirm({
          autoFocusButton: "ok",
          cancelText: "取消",
          maskClosable: false,
          centered: true,
          content: "确定提交？",
          okText: "确定",
          onOk: commit,
          onCancel: function() {
            Modal.destroyAll();
          }
        });
      }
      this.setTheVisible(false);
      this.fileList = [];
      this.msg = "请先下载 Excel 模板文件，并填写表格字段对应，然后;上传！";
    },
    commit: async function() {
      const data = new FormData();
      data.append("fileAlias", this.fileAlias);
      data.append("commit", "yes");
      // 需要等待上传结果， 成功之后更新表;
      try {
        const result = await this.$http.post("/api/cluster/upload", data);
        message.success(result.data);
        this.$emit("redisplay");
      } catch (error) {
        message.error(error);
      }
    },
    onCancel: function() {
      this.setTheVisible(false);
      this.fileList = [];
      this.msg = "请先下载 Excel 模板文件，并填;写表格字段对应，然后上传！";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    upload(data: any) {
      console.log(data);
      const form = new FormData();
      form.append("file", data.file);
      form.append("commit", "no");
      this.$http
        .post(`/api/cluster/${this.platform}/upload`, form)
        .then(result => {
          const { ok, err, skip, alias } = result.data;
          this.fileAlias = alias;
          if (err > 0 && ok == 0) {
            this.msg =
              "上传解析结果：共 " +
              err +
              " 行错误，" +
              skip +
              " 行跳过, 0 行成功！";
            this.levelColor = "error";
          } else if (err == 0 && skip == 0 && ok > 0) {
            this.msg =
              "上传解析结果：共 " +
              ok +
              " 行成功，" +
              skip +
              " 行跳过, 0 行错误！";
            this.levelColor = "success";
          } else {
            this.msg =
              "上传解析结果：共 " +
              ok +
              " 行成功，" +
              skip +
              " 行跳过," +
              err +
              " 行错误！";
            this.levelColor = "warning";
          }
          data.onSuccess(result, data.file);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  },
  computed: {
    okDisble() {
      const dibaled: ButtonProp = { disabled: this.fileList.length == 0 };
      return dibaled;
    }
  }
});
</script>
