import admin from "./admin";
import pages from "./pages";

/* OTHER FEATURES */

// const NotFound = () =>
  // import("@/views/pages/ERRORS/404.vue")
  
export default [
  ...admin,
  ...pages,
  // { path: "/:pathMatch(.*)*", component: NotFound }
];
