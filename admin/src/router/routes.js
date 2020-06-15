const routes = [{
  path: "/",
  component: () => import("layouts/Layout.vue"),
  children: [{
      path: "",
      component: () => import("pages/PageNotice_list.vue")
    },
    {
      path: "/notice_list",
      name: 'notice_list',

      component: () => import("pages/PageNotice_list.vue")
    },
    {
      path: "/board_form",
      name: 'board_form',

      component: () => import("pages/Page_form.vue")
    },
    {
      path: "/board_show",
      name: 'board_show',

      component: () => import("pages/Page_show.vue")
    },
    {
      path: "/board_edit",
      name: 'board_edit',
      component: () => import("pages/Page_edit.vue")
    },
    {
      path: "/qna_list",
      name: "qna_list",
      component: () => import("pages/PageQna_list.vue")
    }

  ]
}];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
