const sidebar = [{
        id: 'dashboards',
        link: '/app/pages/details',
        icon: 'iconsminds-dashboard',
        children: [{
            id: 'start',
            icon: 'simple-icon-paper-plane',
            link: '/app/dashboards/default'
        }]
    },
    {
        id: 'catalog',
        icon: 'iconsminds-shop',
        children: [{
                id: 'product',
                icon: 'simple-icon-bag',
                link: '/app/product'
            },
            {
                id: 'brand',
                icon: 'iconsminds-suitcase',
                link: '/app/brand'
            },
            {
                id: 'category',
                icon: 'simple-icon-layers',
                link: '/app/category'
            },
            {
                id: 'newcategory',
                icon: 'simple-icon-layers',
                link: '/app/newcategory'
            }
        ]
    },
    {
        id: 'transaction',
        icon: 'iconsminds-shop',
        children: [{
                id: 'sales',
                icon: 'iconsminds-shopping-cart',
                link: '/'
            },
            {
                id: 'shipping',
                icon: 'iconsminds-shopping-cart',
                link: '/app/product'
            },
            {
                id: 'payment',
                icon: 'iconsminds-shopping-cart',
                link: '/app/product'
            }
        ]
    },
    {
        id: 'promotion',
        icon: 'iconsminds-tag-3',
        children: [{
                id: 'flash-sale',
                icon: 'iconsminds-stopwatch',
                link: '/app/product'
            },
            {
                id: 'voucher',
                icon: 'iconsminds-tag-3',
                link: '/app/category'
            },
            {
                id: 'buy-x-get-y',
                icon: 'iconsminds-suitcase',
                link: '/app/brand'
            },
            {
                id: 'complimentary-product',
                icon: 'iconsminds-suitcase',
                link: '/app/brand'
            },
            {
                id: 'free-ongkir',
                icon: 'iconsminds-suitcase',
                link: '/app/brand'
            },
            {
                id: 'more-discount',
                icon: 'iconsminds-suitcase',
                link: '/app/brand'
            }
        ]
    },
    {
        id: 'website',
        icon: 'iconsminds-shop',
        children: [{
                id: 'page',
                icon: 'simple-icon-bag',
                link: '/app/product'
            },
            {
                id: 'banner',
                icon: 'simple-icon-bag',
                link: '/app/product'
            },
            {
                id: 'slider',
                icon: 'simple-icon-layers',
                link: '/app/category'
            }
        ]
    }
]

export default sidebar