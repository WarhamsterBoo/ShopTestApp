Ext.define('ShopTestApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    listen: {
        global: {
            printMessage: 'printMessage',
            unauthenticated: 'onUnauthenticated'
        }
    },

    printMessage: function(message) {
        this.getViewModel().set('lastMessage', message);
    },

    onUnauthenticated: function() {
        Ext.Msg.alert('Session expired', "Your session is expired. Relogin.", this.toLogout.bind(this));
    },

    toLogout: function() {
        this.fireViewEvent('logout');
    },

    init: function() {
        this.getViewModel().BasketStore = Ext.create('ShopTestApp.store.Basket');

        if (this.getViewModel().get('CustomersSection') && this.getViewModel().get('CustomersSection').visible)
        {
            var centerpanel = this.lookupReference('centerpanel');
            centerpanel.add({
                title: 'Customers',
                xtype: 'customerpanel'
            });
        }
        
        if (this.getViewModel().get('AccountsSection') && this.getViewModel().get('AccountsSection').visible)
        {
            var centerpanel = this.lookupReference('centerpanel');
            centerpanel.add({
                title: 'Users',
                xtype: 'userpanel'
            });
        }
    },

    onLogoutClick: function()
    {
        Ext.Ajax.request(
            {
                scope: this,
                url: "../Account/LogOff",
                method: 'POST',
                callback: this.toLogout
            }
        );
    },

    openBasket: function() {
        if (!Ext.getStore('basketStoreId')) {
            Ext.create('ShopTestApp.store.Basket');
        }
        this.basket = Ext.create('ShopTestApp.view.basket.Basket');
        this.basket.show();
    }
});
