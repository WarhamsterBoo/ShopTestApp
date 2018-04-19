Ext.define('ShopTestApp.view.order.OrderPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.orderpanelcontroller',

    listen: {
        controller: {
            'basketcontroller': {
                createdOrder: 'doRefresh'
            }
        }
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    init: function() {
        this.getViewModel().getStore('OrderListStore').load();
    },

    openEditWindow: function(actionsPanelHidden) {
        var selectionModel = this.lookupReference('orderlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedRecord = selectionModel.getSelection()[0];
            var cannotBeDeleted = this.selectedRecord.get("Status") !== Ext.getStore('orderStatusStore').getById("New").get("name");
            this.order = Ext.create('ShopTestApp.view.order.Order', {
                viewModel: {
                    links: {
                        selectedOrder: {
                            type: 'ShopTestApp.model.Order',
                            id: this.selectedRecord.get("ID")
                        }
                    },
                    data: {
                        mode: 'edit',
                        formTitle: 'Order Details',
                        cannotBeDeleted: cannotBeDeleted
                    }
                },
                listeners: {
                    scope: this,
                    saved: 'doRefresh'
                }
            });
            this.order.show();
        }
    },

    deleteButtonClick: function() {
        var selectionModel = this.lookupReference('orderlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedItem = selectionModel.getSelection()[0];
            Ext.Msg.show({
                scope: this,
                title:'Delete Order?',
                message: 'You are going to delete order ' + this.selectedItem.get("Name") + '. Proceed?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var orderStore = Ext.getStore('ordersStoreId');
                        var record = orderStore.getById(this.selectedItem.get('ID'));
                        orderStore.remove(record);
                        orderStore.sync({
                            scope: this,
                            success: this.onSuccess,
                            failure: this.onFailure
                        });
                    }
                }
            });
        }
    },

    applyFiltersButtonClick: function() {
        var store = this.getViewModel().getStore('OrderListStore');
        store.clearFilter();
        var filters = store.getFilters();
        var orderFilters = this.getViewModel().data.orderFilters;

        if (orderFilters.Order_Number) {
            filters.add(new Ext.util.Filter({
                    property: 'Order_Number',
                    value   : orderFilters.Order_Number
                })
            );
        }
        if (orderFilters.Status) {
            filters.add(new Ext.util.Filter({
                    property: 'Status',
                    value   : orderFilters.Status
                })
            );
        }
        store.filter();
    },

    clearFiltersButtonClick: function() {
        var store = this.getViewModel().getStore('OrderListStore');
        store.clearFilter();
        store.filter();
    },

    onSuccess: function() {
        Ext.globalEvents.fireEvent('printMessage', 'Order deleted. Name: .' + this.selectedItem.get("Name") + ' Code: ' + this.selectedItem.get("Code") + '.');
        this.doRefresh();
    },

    onFailure: function(errorMsg) {
        this.doRefresh();
    },

    doRefresh: function() {
        this.getView().getViewModel().getStore('OrderListStore').load();
    }
});
