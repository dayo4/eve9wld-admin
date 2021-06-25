// import Index from '@/views/admin/Index.vue'
import DashboardContainer from "@/views/admin/Container.vue"
import Dashboard from "@/views/admin/Dashboard.vue"
import Users from '@/components/admin/tabs/users/Index.vue'
import Products from '@/components/admin/tabs/products/Index.vue'
import Categories from '@/components/admin/tabs/categories/Index.vue'
import Orders from '@/components/admin/tabs/orders/Index.vue'
import SystemSettings from '@/components/admin/tabs/system/Index.vue'
import MediaLibrary from '@/components/admin/tabs/media/Index.vue'

const routes = [
  {
    path: "/dashboard",
    component: DashboardContainer,

    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
        children: [
        ]
      },
      {
        path: "users",
        name: "users",
        component: Users,
      },
      {
        path: "products",
        name: "products",
        component: Products,
      },
      {
        path: "categories",
        name: "categories",
        component: Categories,
      },
      {
        path: "orders",
        name: "orders",
        component: Orders,
      },
      {
        path: "system-settings",
        name: "system-settings",
        component: SystemSettings,
      },
      {
        path: "media-library",
        name: "media-library",
        component: MediaLibrary,
      },
    ]
  }
]

export default routes.map(route => {
  return { ...route, meta: { adminOnly: true } }
})
