<template>
  <div class=""></div>
</template>
<script lang="ts">
import Vue from "vue";
import MultiNav from "./morphors.js";

export default Vue.extend({
  props: {
    tabsList: {
      required: false,
      type: Array
    } /* Array of objects containing -> {icon,name} */,
    navConfig: { required: true, type: String } /*Currently active tab*/
  },

  data() {
    return {
      collapsed: true
    };
  },
  mounted() {
    MultiNav("#ProductsNav", this.NavConfig);
  }
});
</script>
