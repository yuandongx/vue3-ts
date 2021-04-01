<template>
  <the-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TheView from "../base/index.vue";
export default defineComponent({
  components: {
    "the-view": TheView
  }
});
</script>
