<template>
  <footer
    v-show="!['profile', 'posts'].includes($route.name)"
    class="Footer t-blue-grey text-center"
  >
    <div>
      <span class="icon-copyright mr-2">2021 scavorb</span>
    </div>
    <div class="mt-3">
      <router-link class="t-blue--3 no-deco" to="/privacy">Privacy</router-link>
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from "vue";
// import { $Navs } from '@/store'

export default Vue.extend({
  computed: {
    // scrolled: () => $Navs.$container.scrolled,
  }
});
</script>
<style lang="scss" scoped>
.Footer {
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 0;
  margin: 60px 0 40px 0;
}

// @include sm-and-down {
// 	.BottomNav {
// 		left: 31%;
// 	}
// }
// @include xs-only {
// 	.BottomNav {
// 		left: 27%;
// 	}
// }
</style>
