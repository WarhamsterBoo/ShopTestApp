Ext.define('ShopTestApp.view.main.CenterPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'centerpanel',
    reference: 'centerpanel',
    frame: true,

    requires: [
        'ShopTestApp.view.basket.Basket'
    ],

    bind: {
        title: '{name}'
    },

    header: {
        items: [{
            xtype: 'button',
            text: 'Basket',
            handler: 'openBasket',
            bind: {
                hidden: '{!OrdersSection.basketVisible}'
            }
        }, {
            xtype: 'button',
            bind:
            {
                text: '{CurrentUser.Email}'
            },
            menu: {
                xtype: 'userloginpanel'
            }
        }]
    },

    items: [
        {
            title: 'Products',
            xtype: 'productpanel'
        },
        {
            title: 'Orders',
            xtype: 'orderpanel'
        }
    ]
});