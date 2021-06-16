<template>
    <div class="Tab ">
        <!-- MorphNavigator -->
        <section id="ADMMORPHHOR"></section>
        <!-- <HorizontalNavigator
            :tabsList="tabsList"
            @tabClicked="switchTab"
            :activeTab="subActiveTab"
        /> -->

        <div class="SubTabs flex j-c-center w-full">
            <User :activeTab="subActiveTab" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { $Auth, $Profile, $Admin } from '@/store'
import MultiNav from "@/components/navs/reusables/morphors.js"

// import HorizontalNavigator from '@/components/navs/reusables/navigators/HorizontalNavigator.vue'

import User from './Users.vue'
export default defineComponent({
    components: {
        User,
        // HorizontalNavigator
    },

    data () {
        return {
            subActiveTab: "Tab_1",
            tabsList: [
                { id: 1, name: "Users", icon: "icon-users-1" },
                { id: 2, name: "Settings", icon: "icon-cog-1" },
                { id: 3, name: "Privilege", icon: "icon-angle-double-up" },
                { id: 4, name: "Reports", icon: "icon-thumbs-down-alt" }
            ],

            NavConfig: {
                getActiveTab: (activeTab) => {
                    //@ts-ignore
                    this.subActiveTab = "Tab_" + activeTab.id
                },
                type: 'horizontal',
                horizontal: {},
                position: {
                    type: 'relative',
                    top: '',
                    bottom: '',
                    right: '',
                    left: '',
                },
                trigger: '',
                pri_color: '',
                sec_color: '#006064',
                font: {
                    size: '13px',
                    color: '',
                },
                bg: {
                    color: '',
                    image: ''
                },
                nav_width: '',
                nav_height: '',
                list_height: '',
                tabs: [
                    { id: 1, name: "Users", icon: "icon-users-1" },
                    { id: 2, name: "Settings", icon: "icon-cog-1" },
                    { id: 3, name: "Privilege", icon: "icon-angle-double-up" },
                    { id: 4, name: "Reports", icon: "icon-thumbs-down-alt" }
                ]
            }
        }
    },

    methods: {
        // switchTab (tab_id) {
        //     this.subActiveTab = "Tab-" + tab_id
        // }
    },
    mounted () {
        MultiNav('#ADMMORPHHOR', this.NavConfig)
    }
})

</script>
<style lang="scss" scoped>
.SubTabs {
    & .Tab {
        animation: fade 0.7s;
    }
}
</style>