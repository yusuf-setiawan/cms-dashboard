import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [{
        path: '/',
        component: () =>
            import ( /* webpackChunkName: "app" */ './views/app'),
        redirect: '/app/dashboards',
        beforeEnter: AuthRequired,
        children: [{
                path: 'app/dashboards',
                component: () =>
                    import ( /* webpackChunkName: "dashboards" */ './views/app/dashboards'),
                redirect: '/app/dashboards/default',
                children: [{
                        path: 'default',
                        component: () =>
                            import ( /* webpackChunkName: "dashboards" */ './views/app/dashboards/Default')
                    },
                    {
                        path: 'ecommerce',
                        component: () =>
                            import ( /* webpackChunkName: "dashboards" */ './views/app/dashboards/Ecommerce')
                    },
                    {
                        path: 'content',
                        component: () =>
                            import ( /* webpackChunkName: "dashboards" */ './views/app/dashboards/Content')
                    }
                ]
            },
            {
                path: 'app/product',
                component: () =>
                    import ( /* webpackChunkName: "second-menu" */ './views/app/product'),
                redirect: '/app/product/list',
                children: [{
                        path: 'list',
                        component: () =>
                            import ( /* webpackChunkName: "product-list" */ './views/app/product/list')
                    },
                    {
                        path: 'view/:id',
                        component: () =>
                            import ( /* webpackChunkName: "product-view" */ './views/app/product/view')
                    }
                ]
            },
            {
                path: 'app/category',
                component: () =>
                    import ( /* webpackChunkName: "second-menu" */ './views/app/category'),
                redirect: '/app/category/list',
                children: [{
                    path: 'list',
                    component: () =>
                        import ( /* webpackChunkName: "category-list" */ './views/app/category/list')
                }, ]
            },
            {
                path: 'app/newcategory',
                component: () =>
                    import ( /* webpackChunkName: "second-menu" */ './views/app/newcategory'),
                redirect: '/app/newcategory/list',
                children: [{
                    path: 'list',
                    component: () =>
                        import ( /* webpackChunkName: "category-list" */ './views/app/newcategory/list')
                }, ]
            },
            {
                path: 'app/brand',
                component: () =>
                    import ( /* webpackChunkName: "second-menu" */ './views/app/brand'),
                redirect: '/app/brand/list',
                children: [{
                    path: 'list',
                    component: () =>
                        import ( /* webpackChunkName: "category-list" */ './views/app/brand/list')
                }, ]
            },
            {
                path: 'app/second-menu',
                component: () =>
                    import ( /* webpackChunkName: "second-menu" */ './views/app/secondMenu'),
                redirect: '/app/second-menu/second',
                children: [{
                    path: 'second',
                    component: () =>
                        import ( /* webpackChunkName: "second-menu" */ './views/app/secondMenu/Second')
                }]
            },
            {
                path: 'app/single',
                component: () =>
                    import ( /* webpackChunkName: "single" */ './views/app/single')
            }
        ]
    },
    {
        path: '/error',
        component: () =>
            import ( /* webpackChunkName: "error" */ './views/Error')
    },
    {
        path: '/user',
        component: () =>
            import ( /* webpackChunkName: "user" */ './views/user'),
        redirect: '/user/login',
        children: [{
                path: 'login',
                component: () =>
                    import ( /* webpackChunkName: "user" */ './views/user/Login')
            },
            {
                path: 'register',
                component: () =>
                    import ( /* webpackChunkName: "user" */ './views/user/Register')
            },
            {
                path: 'forgot-password',
                component: () =>
                    import ( /* webpackChunkName: "user" */ './views/user/ForgotPassword')
            }
        ]
    },
    {
        path: '*',
        component: () =>
            import ( /* webpackChunkName: "error" */ './views/Error')
    }
]

const router = new Router({
    linkActiveClass: 'active',
    routes,
    mode: 'history'
})

export default router