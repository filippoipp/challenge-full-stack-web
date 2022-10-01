import Vue from "vue";
import Router from "vue-router";

import Template from "@/template/Template";
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import Students from "@/views/Students";

Vue.use(Router);

export const Routes = {
  login: "/login",
  dashboard: "/",
  students: "/alunos",
};

Routes.main = Routes.dashboard;

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "",
      components: {
        template: Template,
      },
      children: [
        {
          path: Routes.dashboard,
          name: "Dashboard",
          components: {
            content: Dashboard,
          },
        },
        {
          path: Routes.students,
          name: "Estudantes",
          components: {
            content: Students,
          },
        },
      ],
    },
    {
      path: Routes.login,
      name: "Login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  if (!authRequired && loggedIn) {
    return next("/");
  }

  next();
});

export default router;
