<template>
  <div>
    <h1 class="Head text-center t-blue-grey font-8 px-2">
      {{ product.name }}
    </h1>

    <!-- Product Details... -->
    <article class="flex j-c-center wrap md-nowrap mt-10">
      <section class="xs11 md8 mb-5 px">
        <!-- Main Product Image -->
        <div class="MainImg px-2 mb-8">
          <img
            :title="product.name"
            :src="product.images[0].url"
            draggable="false"
          />
        </div>
        <!-- FUll Description -->
        <div v-html="product.description"></div>
      </section>
    </article>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacl } from "@/plugins"

import { $General, $Axios, $Notify } from "@/plugins";
import { $Products } from "@/store";

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    const foundProduct = $Products.$single.fetch({ slug: to.params.slug });
  },
  data() {},
  computed: {
    product: () => $Products.$single.data
  }
  // methods: {

  // },
  // mounted () {

  // }
});
</script>
<style lang="scss" scoped>
.MainImg {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  // max-height: 350px;
  // margin: 20px 0;
  & img {
    position: absolute;
    top: 0;
    border-radius: 4px;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
