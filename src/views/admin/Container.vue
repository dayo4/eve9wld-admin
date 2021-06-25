<template>
    <!-- <Container ownID="MC-Adm" :noSideNav="false"> -->
    <article class="flex j-c-center">
        <section class="MainView xs12 md11 lg10 pl-4">
            <!-- All tabs go here -->
            <!-- <keep-alive>
                <component :is="activeTab"></component>
            </keep-alive> -->
            <transition name="fade-in">
                <router-view> </router-view>
            </transition>
            <!-- <router-view></router-view> -->
        </section>
    </article>

    <!-- Side Nav Component -->
    <section id="ADMMORPH" class="bg-img-masked">
        <a href="#">
            <span class="icon-check"></span>
            <span class="">Custom Tabs</span>
        </a>
    </section>
</template>

<script>
import { defineComponent } from "vue"
import MultiNav from "@/components/navs/reusables/morphors.js"
// import Tab_1 from "./Dashboard.vue"
// import Tab_2 from "@/components/admin/tabs/users/Index.vue"
// import Tab_3 from "@/components/admin/tabs/products/Index.vue"
// import Tab_4 from "@/components/admin/tabs/categories/Index.vue"
// import Tab_5 from "@/components/admin/tabs/orders/Index.vue"
// import Tab_6 from "@/components/admin/tabs/media/Index.vue"
// import Tab_10 from "@/components/admin/tabs/system/Index.vue"
// import Container from "@/components/navs/reusables/Container.vue"

// import { $Admin } from "@/store"

export default defineComponent({
    // components: {
    // MultiNav,
    // Tab_1,
    // Tab_2,
    // Tab_3,
    // Tab_4,
    // Tab_5,
    // Tab_6,
    // Tab_10,
    // },

    data() {
        return {
            activeTab: "Tab_1",

            NavConfig: {
                getActiveTab: (activeTab) => {
                    this.$router.push({ name: activeTab.name })
                },
                type: "vertical",
                // type: 'horizontal',
                vertical: {
                    mini: false,
                },
                horizontal: {
                    // mini: true,
                },
                position: {
                    type: "absolute",
                    top: "0",
                    bottom: "",
                    right: "0",
                    left: "",
                },
                trigger: "",
                pri_color: "",
                sec_color: "#006064",
                font: {
                    size: "16px",
                    color: "",
                },
                bg: {
                    color: "",
                    image: "/defaults/pgs/scavorb_technolink.jp",
                },
                nav_width: "",
                nav_height: "",
                list_height: "",
                tabs: [
                    {
                        id: 1,
                        icon: "icon-users-1",
                        name: "Dashboard",
                        name: "dashboard",
                    },
                    {
                        id: 2,
                        icon: "icon-users-1",
                        name: "Manage Users",
                        name: "users",
                    },
                    {
                        id: 3,
                        icon: "icon-cog-1",
                        name: "Products",
                        name: "products",
                    },
                    {
                        id: 4,
                        icon: "icon-cog-1",
                        name: "Categories",
                        name: "categories",
                    },
                    {
                        id: 5,
                        icon: "icon-cog-1",
                        name: "Orders",
                        name: "orders",
                    },
                    {
                        id: 6,
                        icon: "icon-cog-1",
                        name: "Media/Images",
                        name: "media",
                    },
                    {
                        id: 10,
                        icon: "icon-cog-1",
                        name: "Settings",
                        name: "system-settings",
                    },
                ],
            },
        }
    },

    methods: {
        switchTab(tab_id) {
            const id = this.NavConfig.getActiveTab().id
            this.activeTab = "Tab_" + id
        },
    },

    mounted() {
        MultiNav("#ADMMORPH", this.NavConfig)
    },
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
