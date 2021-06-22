import Index from '@/views/admin/Index.vue'
import DashboardContainer from "@/views/admin/Container.vue"

const routes = [
  {
    path: "/dashboard",
    component: Index,

    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardContainer,
      },
    ]
  }
]

export default routes.map(route => {
  return { ...route, meta: { adminOnly: true } }
})
