<template>
  <article class="Tab xs12">
    <h2 class="text-center t-blue-grey--1">Edit Categories</h2>
  </article>
</template>

<script lang="ts">
import Vue from "vue";

// import { $Auth } from '@/store'
// import { $Notify } from "@/plugins";

// import Composer from "@/components/Editor/Composer.vue";
// import { $Products } from "@/store/products";

export default Vue.extend({});
</script>
<style lang="scss" scoped>
.MainCont {
  & .textFeilds {
    border-bottom: 1.5px solid grey;
    & input[type="text"] {
      border: solid 1.5px $blue-grey-2;
      border-radius: 4px;
      padding: 7px;
    }
  }
}

div[contenteditable="true"] {
  max-height: 250px;
}
div[contenteditable="true"],
input {
  border: solid 2px rgba(128, 128, 128, 0.591);
  border-radius: 4px;
  padding: 5px;
}
</style>
