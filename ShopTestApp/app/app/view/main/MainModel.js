Ext.define('ShopTestApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'ShopTestApp',
        lastMessage: "Welcome!",

        CurrentUser: null,
        
        ProductsSection: {
            toolbarVisible: false,
            addToBasketVisible: false
        },
        CustomersSection: {
            visible: false
        },
        OrdersSection: {
            confirmOrderVisible: false,
            closeOrderVisible: false,
            basketVisible: false,
            deleteOrderVisible: false
        },
        AccountsSection: {
            visible: false
        }
    }
});