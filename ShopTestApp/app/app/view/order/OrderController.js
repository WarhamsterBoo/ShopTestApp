Ext.define('ShopTestApp.view.order.OrderController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ordercontroller',

    requires: [
        'ShopTestApp.view.order.Order'
    ],

    init: function() {
        if (this.getViewModel().get('OrdersSection.confirmOrderVisible'))
        {
            this.lookupReference('orderacitons').add({
                xtype: 'button',
                text: 'Confirm Order',
                handler: 'confirmOrder'
            });
        }

        if (this.getViewModel().get('OrdersSection.closeOrderVisible'))
        {
            this.lookupReference('orderacitons').add({
                xtype: 'button',
                text: 'Close Order',
                handler: 'closeOrder'
            });
        }

        if (this.getViewModel().get('OrdersSection.deleteOrderVisible'))
        {
            var cannotBeDeleted = this.getViewModel().get('cannotBeDeleted');
            this.lookupReference('orderacitons').add({
                xtype: 'button',
                text: 'Cancel Order',
                handler: 'cancelOrder',
                disabled: cannotBeDeleted
            });
        }
    },

    confirmOrder: function() {
        var orderId = this.getViewModel().get('selectedOrder').get("ID");
        Ext.Ajax.request(
            {
                url: "../../Order/Confirm",
                params: { id: orderId },
                scope: this,
                success: this.onSuccess,
                failure: this.onFailure
            }
        )
    },

    closeOrder: function() {
        var orderId = this.getViewModel().get('selectedOrder').get("ID");
        Ext.Ajax.request(
            {
                url: "../../Order/Close",
                params: { id: orderId },
                scope: this,
                success: this.onSuccess,
                failure: this.onFailure
            }
        )
    },

    cancelOrder: function() {
        var orderId = this.getViewModel().get('selectedOrder').get("ID");
        Ext.Ajax.request(
            {
                url: "../../Order/Delete",
                params: { id: orderId },
                scope: this,
                success: this.onSuccess,
                failure: this.onFailure
            }
        )
    },

    onSuccess: function(response, opts) {
        var xRespHeader = response.getResponseHeader('X-Responded-JSON');
        if (xRespHeader && Ext.decode(xRespHeader).status === 401) {
            this.closeWindow();
            Ext.globalEvents.fireEvent('unauthenticated');
            return;
        }

        var decodedResponse = null;
        try {
            decodedResponse = Ext.decode(response.responseText);
        }
        catch (Exception) {
            this.closeWindow();
            Ext.globalEvents.fireEvent('printMessage', 'Operation failed. Unexpected response.');
            return;
        }

        if (!(decodedResponse && decodedResponse.Success)) {
            this.closeWindow();
            Ext.globalEvents.fireEvent('printMessage', "Operation failed: " + decodedResponse.ResponseText);
            return;
        }

        Ext.globalEvents.fireEvent('printMessage', 'Order saved: ' + this.getViewModel().get('selectedOrder').get("Order_Number"));
        this.fireViewEvent('saved');
        this.closeWindow();
    },

    onFailure: function(response, opts) {
        this.closeWindow();
        Ext.globalEvents.fireEvent('printMessage', "Operation failed. Status: " + response.status + ". StatusText: " + response.statusText);
    },

    onCancel: function() {
        this.closeWindow();
    },

    closeWindow: function () {
        this.getView().destroy();
    }
});
