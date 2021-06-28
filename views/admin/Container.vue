<template>
  <div>
    <article class="flex j-c-center">
      <section class="MainView xs12 md11 lg10 pl-4">
        <!-- All tabs go here -->
        <transition name="fade-in">
          <router-view> </router-view>
        </transition>
      </section>
    </article>

    <!-- Side Nav Component -->
    <section id="ADMMORPH" class="bg-img-masked">
      <a href="#">
        <span class="icon-check"></span>
        <span class="">Custom Tabs</span>
      </a>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import MultiNav from "@/components/navs/reusables/morphors.js";
// import { $Admin } from "@/store"

export default Vue.extend({
  data() {
    return {
      activeTab: "Tab_1",

      NavConfig: {
        getActiveTab: activeTab => {
          this.$router.push({ name: activeTab.routeName });
        },
        type: "vertical",
        // type: 'horizontal',
        vertical: {
          mini: false
        },
        horizontal: {
          // mini: true,
        },
        position: {
          type: "absolute",
          top: "0",
          bottom: "",
          right: "0",
          left: ""
        },
        trigger: "",
        pri_color: "",
        sec_color: "#006064",
        font: {
          size: "16px",
          color: ""
        },
        bg: {
          color: "",
          image: "/defaults/pgs/scavorb_technolink.jp"
        },
        nav_width: "",
        nav_height: "",
        list_height: "",
        tabs: [
          {
            id: 1,
            icon: "icon-users-1",
            name: "Dashboard",
            routeName: "dashboard"
          },
          {
            id: 2,
            icon: "icon-users-1",
            name: "Manage Users",
            routeName: "users"
          },
          {
            id: 3,
            icon: "icon-cog-1",
            name: "Products",
            routeName: "products"
          },
          {
            id: 4,
            icon: "icon-cog-1",
            name: "Categories",
            routeName: "categories"
          },
          {
            id: 5,
            icon: "icon-cog-1",
            name: "Orders",
            routeName: "orders"
          },
          {
            id: 6,
            icon: "icon-cog-1",
            name: "Media/Images",
            routeName: "media"
          },
          {
            id: 10,
            icon: "icon-cog-1",
            name: "Settings",
            routeName: "system-settings"
          }
        ]
      }
    };
  },

  methods: {
    switchTab(tab_id) {
      const id = this.NavConfig.getActiveTab().id;
      this.activeTab = "Tab_" + id;
    }
  },

  mounted() {
    MultiNav("#ADMMORPH", this.NavConfig);
  }
});
</script>
<style lang="scss" scoped>
.MainView {
  & .Tab {
    animation: fade 0.7s;
  }
  min-height: 100vh;
}

@include sm-and-down {
  .MainView {
    // width: 100%;
    padding-left: 6px;
    padding-right: 10px;
  }
}
</style>
