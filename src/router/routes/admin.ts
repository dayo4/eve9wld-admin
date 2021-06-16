import Index from '@/views/admin/Index.vue'
import Dashboard from "@/views/admin/Dashboard.vue"

const routes = [
  {
    path: "/dashboard",
    component: Index,

    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
    ]
  }
]

export default routes.map(route => {
  return { ...route, meta: { adminOnly: true } }
})
