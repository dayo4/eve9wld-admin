<template>
  <div>
    <h1 class="Head text-center t-blue-grey font-8 px-2">
      {{ post.title }}
    </h1>

    <!-- Product Details... -->
    <article class="flex j-c-center wrap md-nowrap mt-10">
      <section class="xs11 md8 mb-5 px">
        <!-- Main Product Image -->
        <div class="MainImg px-2 mb-8">
          <img
            :title="post.title"
            :src="post.featured_image || post.images[0].url"
            draggable="false"
          />
        </div>
        <!-- FUll Description -->
        <div v-html="post.content"></div>
      </section>
    </article>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacl } from "@/plugins"

import { $General, $Axios, $Notify } from "@/plugins";
import { $Posts } from "@/store";

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    $Posts.$single.fetch({ slug: to.params.slug });
  },
  data() {},
  computed: {
    post: () => $Posts.$single.data
  }
  // methods: {

  // },
  // mounted () {
  // validate() {
  //   const schema = [
  //     {
  //       fieldName: "Title",
  //       data: $Validator.sanitize(this.title),
  //       rules: {
  //         required: true,
  //         min: 10,
  //         max: 100
  //       }
  //     },
  //     {
  //       fieldName: "Slug",
  //       data: $Validator.sanitize(this.slug),
  //       rules: {
  //         required: true,
  //         min: 5,
  //         max: 100
  //       }
  //     },
  //     {
  //       fieldName: "Content",
  //       data: this.content,
  //       rules: {
  //         required: true
  //       }
  //     }
  //   ];
  //   return $Validator.validate(schema);
  // },

  // init() {
  //   if (this.validate()) {
  //     $Obstacl.create("#saveBtn", {
  //       action: this.saveContent
  //       // action: this.captureContentImages,
  //     });
  //   }
  //   this.errors = $Validator.getErrors();

  //   $Process.abort();

  //   if (this.errors["Content"]) {
  //     $Notify.error(this.errors["Content"]);
  //   }
  //   if (this.errors["Slug"]) {
  //     $Notify.error(this.errors["Slug"]);
  //   }
  // },
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
