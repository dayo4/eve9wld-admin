const routes = [
  {
    path: "/dashboard",
    component: () =>
      import("@/views/admin/Container.vue").then(m => m.default || m),

    children: [
      {
        path: "",
        name: "dashboard",
        component: () =>
          import("@/views/admin/Dashboard.vue").then(m => m.default || m),
        children: []
      },
      {
        path: "users",
        name: "users",
        component: () =>
          import("@/views/admin/tabs/users/Index.vue").then(m => m.default || m)
      },
      /* POSTS ROUTES */
      {
        path: "posts",
        component: () =>
          import("@/views/admin/tabs/posts/Index.vue").then(
            m => m.default || m
          ),
        children: [
          {
            path: "",
            name: "posts",
            component: () =>
              import("@/views/admin/tabs/posts/List.vue").then(
                m => m.default || m
              )
          },
          {
            path: "edit",
            name: "edit-post",
            component: () =>
              import("@/views/admin/tabs/posts/Edit.vue").then(
                m => m.default || m
              )
          }
        ]
      },
      /* PRODUCTS ROUTES */
      {
        path: "products",
        // name: "products",
        component: () =>
          import("@/views/admin/tabs/products/Index.vue").then(
            m => m.default || m
          ),
        children: [
          {
            path: "",
            name: "products",
            component: () =>
              import("@/views/admin/tabs/products/List.vue").then(
                m => m.default || m
              )
          },
          {
            path: "edit",
            name: "edit-product",
            component: () =>
              import("@/views/admin/tabs/products/Edit.vue").then(
                m => m.default || m
              )
          }
        ]
      },
      {
        path: "categories",
        name: "categories",
        component: () =>
          import("@/views/admin/tabs/categories/Index.vue").then(
            m => m.default || m
          )
      },
      {
        path: "orders",
        name: "orders",
        component: () =>
          import("@/views/admin/tabs/orders/Index.vue").then(
            m => m.default || m
          )
      },
      {
        path: "system-settings",
        name: "system-settings",
        component: () =>
          import("@/views/admin/tabs/system/Index.vue").then(
            m => m.default || m
          )
      },
      {
        path: "media-library",
        name: "media-library",
        component: () =>
          import("@/views/admin/tabs/media/Index.vue").then(m => m.default || m)
      }
    ]
  }
];

export default routes.map(route => {
  return { ...route, meta: { adminOnly: true } };
});
