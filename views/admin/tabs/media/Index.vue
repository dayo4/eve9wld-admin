<template>
  <div>
    <section id="ProductsNav"></section>

    <!-- All tabs go here -->
    <keep-alive>
      <component :is="subActiveTab"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// import { $Admin, $Auth } from '@/store'
// import { $Confirm } from '@/plugins'

import MultiNav from "@/components/navs/reusables/morphors.js";

import Tab_1 from "./List.vue";
import Tab_2 from "./Edit.vue";

export default Vue.extend({
  components: {
    Tab_1,
    Tab_2
  },
  data() {
    return {
      subActiveTab: "Tab_1",
      NavConfig: {
        getActiveTab: activeTab => {
          //@ts-ignore
          this.subActiveTab = "Tab_" + activeTab.id;
        },
        type: "horizontal",
        horizontal: {},
        position: {
          type: "relative",
          top: "",
          bottom: "",
          right: "",
          left: ""
        },
        trigger: "",
        pri_color: "",
        sec_color: "#006064",
        font: {
          size: "13px",
          color: ""
        },
        bg: {
          color: "",
          image: ""
        },
        nav_width: "",
        nav_height: "",
        list_height: "",
        tabs: [
          { id: 1, name: "View Products", icon: "icon-users-1" },
          { id: 2, name: "Add Products", icon: "icon-cog-1" }
        ]
      }
    };
  },

  computed: {
    // isSAdmin: (): boolean => $Auth.isSAdmin,
    // settings: () => $Auth.sysSettings
  },

  // methods: {
  //
  // },

  mounted() {
    MultiNav("#ProductsNav", this.NavConfig);
  }
});
</script>
<style lang="scss"></style>
