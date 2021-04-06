<template>
  <h1 />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Table } from "ant-design-vue";
@Options({
  props: {
    msg: String
  },
  components: {
    "a-table": Table
  }
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>
