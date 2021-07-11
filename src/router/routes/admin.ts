const routes = [
  {
    path: "/dashboard",
    component: () =>
      import("@/views/admin/Container.vue"),

    children: [
      {
        path: "",
        name: "dashboard",
        component: () =>
          import("@/views/admin/Dashboard.vue"),
        children: []
      },
      {
        path: "users",
        name: "users",
        component: () =>
          import("@/views/admin/tabs/users/Index.vue")
      },
      /* POSTS ROUTES */
      {
        path: "posts",
        component: () =>
          import("@/views/admin/tabs/posts/Index.vue"),
        children: [
          {
            path: "",
            name: "posts",
            component: () =>
              import("@/views/admin/tabs/posts/List.vue")
          },
          {
            path: "edit",
            name: "edit-post",
            component: () =>
              import("@/views/admin/tabs/posts/Edit.vue")
          }
        ]
      },
      /* PRODUCTS ROUTES */
      {
        path: "products",
        // name: "products",
        component: () =>
          import("@/views/admin/tabs/products/Index.vue"),
        children: [
          {
            path: "",
            name: "products",
            component: () =>
              import("@/views/admin/tabs/products/List.vue")
          },
          {
            path: "edit",
            name: "edit-product",
            component: () =>
              import("@/views/admin/tabs/products/Edit.vue")
          }
        ]
      },
      {
        path: "categories",
        name: "categories",
        component: () =>
          import("@/views/admin/tabs/categories/Index.vue")
      },
      {
        path: "orders",
        name: "orders",
        component: () =>
          import("@/views/admin/tabs/orders/Index.vue")
      },
      {
        path: "system-settings",
        name: "system-settings",
        component: () =>
          import("@/views/admin/tabs/system/Index.vue")
      },
      {
        path: "media-library",
        name: "media-library",
        component: () =>
          import("@/views/admin/tabs/media/Index.vue")
      }
    ]
  }
];

export default routes.map(route => {
  return { ...route, meta: { adminOnly: true } };
});
