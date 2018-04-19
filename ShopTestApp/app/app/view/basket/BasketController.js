Ext.define('ShopTestApp.view.basket.BasketController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.basketcontroller',

    onCreate: function() {
        var s = Ext.getStore('basketStoreId');
        s.sync({
            scope: this,
            success: this.onSuccess,
            failure: this.onFailure
        });
    },

    onSuccess: function(records, action) {
        var s = Ext.getStore('basketStoreId');
        s.destroy();
        Ext.create('ShopTestApp.store.Basket');
        Ext.globalEvents.fireEvent('printMessage', 'Order created');
        this.fireEvent('createdOrder');
        this.closeWindow();
    },

    onFailure: function(errorMsg) {
        this.closeWindow();
    },

    onCancel: function() {
        this.closeWindow();
    },

    closeWindow: function () {
        this.getView().destroy();
    }
});
