<template>
  <article>
    <section class="Top bg-blue-grey-3">
      <div class="SomeInfo flex wrap a-i-center j-c-between px-8">
        <section class="xs12 sm4 md3">
          <h2>Welcome Adedayo</h2>
          <p>Some words or more</p>
        </section>
        <section class="flex j-c-around xs12 sm8 md9">
          <div>
            <h2>142k</h2>
            <p><i class="icon-edit"></i>likes</p>
          </div>
          <div>
            <h2>142k</h2>
            <p><i class="icon-edit"></i>likes</p>
          </div>
          <div>
            <h2>142k</h2>
            <p><i class="icon-edit"></i>likes</p>
          </div>
        </section>
      </div>
    </section>

    <section class="WidgetsCont">
      <div v-for="i in 6" :key="i" class="Widgets xs12 md6 lg3">
        <!-- <section v-for="(each, i) in 3" :key="i" class=""> -->
        <section>
          <div class="Icon">
            <i class="icon-edit"></i>
          </div>
          <div class="text-right">
            <h3>New Sales</h3>
            <small>Some texts</small>
          </div>
        </section>
        <!-- </section> -->
      </div>
    </section>
  </article>
</template>

<script>
import Vue from "vue";
// import MultiNav from "@/components/navs/reusables/morphors.js"
// import Tab_100 from "@/components/admin/tabs/users/Index.vue"
// import Tab_1 from "@/components/admin/tabs/users/Index.vue"
// import Tab_2 from "@/components/admin/tabs/system/Index.vue"

// import { $Admin } from "@/store"

export default Vue.extend({
  components: {
    // MultiNav,
    // Container,
    // Tab_1,
    // Tab_2
  },

  data() {
    return {
      activeTab: "Tab_1"
    };
  },

  methods: {},

  mounted() {
    // MultiNav('#ADMMORPH', this.NavConfig)
  }
});
</script>
<style lang="scss" scoped>
article {
  background-color: $grey-2;
}
.Top {
  height: 200px;
  & .SomeInfo {
    height: 50%;
    background-color: rgba(128, 128, 128, 0.199);
    color: white;
    // & > section:first-child {
    //     flex: 1;
    // }
    // & > section:last-child {
    //     flex: 3;
    // }
  }
}
.WidgetsCont {
  display: flex;
  flex-wrap: wrap;
  & .Widgets {
    flex-grow: 1;
    & section {
      margin: 15px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      border-radius: 4px;
      & .Icon {
        background-color: $light-blue;
        color: white;
        font-size: 30px;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & h3 {
        color: $light-blue-1;
        margin: 4px 0;
      }
      & small {
        color: $blue-grey-3;
      }
    }
  }
}

@include sm-and-down {
  // .SomeInfo {
  // & > section {
  //     flex: 1 1 auto !important;
  // }
  // }
}
</style>
