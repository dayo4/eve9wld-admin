<template>
    <div>
        <TopNav />
        <HoverPanel />
        <Notify />
        <Input />
        <Process />
        <Auth />

        <router-view v-slot="{ Component }">
            <transition name="fade-in">
                <component :is="Component" />
            </transition>
        </router-view>

        <BottomNav />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { $Auth, $Navs } from "@/store"

import TopNav from "@/components/navs/TopNav.vue"
import BottomNav from "@/components/navs/BottomNav.vue"
import HoverPanel from "@/components/navs/HoverPanel.vue"
import Process from "@/components/GlobalComponents/notification/Process.vue"
import Notify from "@/components/GlobalComponents/notification/Notify.vue"
// import { $General } from "./plugins";
// import Footer from "@/components/navs/Footer.vue"

export default defineComponent({
    components: {
        TopNav,
        BottomNav,
        HoverPanel,
        Process,
        Notify,
        Input: () => import("@/components/GlobalComponents/Input.vue"),
        Auth: () => import("@/components/auth/Auth.vue"),
    },

    // computed: {
    //     // loadAuth: () => import(/* webpackChunkName: "auth" */ "@/components/auth/Auth.vue")
    // }

    mounted () {
        // $Auth.getSysSettings()
        //@ts-ignore
        $Navs.$container.element = window ? window : document.body //document.getElementsByClassName('GBLMContainer')[ 0 ]
        $Navs.$container.ScrollingHandler()
    },
});
</script>

<style lang="scss">
</style>
