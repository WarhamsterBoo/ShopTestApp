Ext.define('ShopTestApp.view.basket.Basket', {
    extend: 'Ext.window.Window',
    xtype: 'basket',
    requires: [
        'ShopTestApp.view.basket.BasketList'
    ],
    
    controller: 'basketcontroller',
    viewModel: {
        type: 'basketviewmodel'
    },

    title: 'Basket',

    header: true,
    bodyBorder: false,
    height: '50%',
    width: '30%',
    closable: true,
    autoShow: false,

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'basketlist'
    }],

    buttons: [{
        text: 'Create Order',
        handler: 'onCreate'
    }, {
        text: 'Cancel',
        handler: 'onCancel'
    }]
});