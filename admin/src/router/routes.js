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
      path: "/notice_form",
      name: 'notice_form',

      component: () => import("pages/PageNotice_form.vue")
    },

    {
      path: "/notice_show",
			name: 'notice_show',

      component: () => import("pages/PageNotice_show.vue")
    },
    {
      path: "/notice_edit",
      name: 'notice_edit',
      component: () => import("pages/PageNotice_edit.vue")
    },
    {
      path: "/qna_list",
      name: "qna_list",
      component: () => import("pages/PageQna_list.vue")
    },
    {
      path: "/qna_form",
      name: "qna_form",
      component: () => import("pages/PageQna_form.vue")
    },
    {
      path: "/qna_show",
      name: "qna_show",

      component: () => import("pages/PageQna_show.vue")
    },
    {
      path: "/qna_edit",
      name: "qna_edit",

      component: () => import("pages/PageQna_edit.vue")
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
