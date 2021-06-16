<template>
    <!-- <Container ownID="MC-Adm" :noSideNav="false"> -->
    <article class="flex j-c-center">
        <section class="MainView xs12 md11 lg10 pl-4">
            <!-- All tabs go here -->
            <keep-alive>
                <component :is="activeTab"></component>
            </keep-alive>
        </section>
    </article>

    <!-- Side Nav Component -->
    <section id="ADMMORPH" class="bg-img-masked"></section>
</template>

<script>
import { defineComponent } from "vue"
import MultiNav from "@/components/navs/reusables/morphors.js"
import Tab_1 from "@/components/admin/tabs/users/Index.vue"
import Tab_2 from "@/components/admin/tabs/system/Index.vue"
// import Container from "@/components/navs/reusables/Container.vue"

import { $Admin } from "@/store"

export default defineComponent({
    components: {
        // MultiNav,
        // Container,
        Tab_1,
        Tab_2
    },

    data () {
        return {
            activeTab: "Tab_1",

            tabsList: [
                { id: 1, name: "Manage Users", icon: "icon-users-1" },
                { id: 2, name: "System Settings", icon: "icon-cog-1" },
                // { id: 3, name: "Manage Posts", icon: "icon-doc-text" },
                // { id: 4, name: "Notifications", icon: "icon-bell" }
            ],

            NavConfig: {
                getActiveTab: (activeTab) => {
                    this.activeTab = "Tab_" + activeTab.id
                },
                type: 'vertical',
                // type: 'horizontal',
                vertical: {
                    mini: false,
                },
                horizontal: {
                    // mini: true,
                },
                position: {
                    type: 'absolute',
                    top: '0',
                    bottom: '',
                    right: '0',
                    left: '',
                },
                trigger: '',
                pri_color: '',
                sec_color: '#006064',
                font: {
                    size: '16px',
                    color: '',
                },
                bg: {
                    color: '',
                    image: '/defaults/pgs/scavorb_technolink.jp'
                },
                nav_width: '',
                nav_height: '',
                list_height: '',
                tabs: [
                    {
                        id: 1,
                        icon: 'icon-users-1',
                        name: 'Manage Users',
                        link: '',
                        onClick: () => console.log('kkkkjkg'),
                    },
                    {
                        id: 2,
                        icon: 'icon-cog-1',
                        name: 'System Settings',
                        link: '',
                        onClick: function () { console.log(this.icon) },
                    },
                ]
            }
        }
    },

    methods: {
        switchTab (tab_id) {
            const id = this.NavConfig.getActiveTab().id
            this.activeTab = "Tab_" + id
        }
    },

    mounted () {
        MultiNav('#ADMMORPH', this.NavConfig)
    }
})
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