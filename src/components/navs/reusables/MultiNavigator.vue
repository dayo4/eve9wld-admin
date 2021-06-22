<template>
    <div class="">

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MultiNav from "./morphors.js"

export default defineComponent({
    props: {
        tabsList: { required: false, type: Array },/* Array of objects containing -> {icon,name} */
        navConfig: { required: true, type: String },/*Currently active tab*/
    },

    data () {
        return {
            collapsed: true
        }
    },
		mounted () {
				MultiNav('#ProductsNav', this.NavConfig)
		}
})
</script>
