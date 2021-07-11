<template>
  <div>
    <section id="PostsNav"></section>

    <!-- All tabs go here -->
    <transition name="fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// import { $Admin, $Auth } from '@/store'
// import { $Confirm } from '@/plugins'

import MultiNav from "@/components/navs/reusables/morphors.js";

export default Vue.extend({
  data() {
    return {
      // subActiveTab: "Tab_1",
      NavConfig: {
        getActiveTab: activeTab => {
          this.$router.push({ name: activeTab.routeName });
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
          {
            id: 1,
            name: "View Posts",
            icon: "icon-users-1",
            routeName: "posts"
          },
          {
            id: 2,
            name: "Add Posts",
            icon: "icon-cog-1",
            routeName: "edit-post"
          }
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
