Ext.define('ShopTestApp.view.customer.CustomerPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerpanelcontroller',

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    init: function() {
        this.getViewModel().getStore('CustomerListStore').load();
    },

    addButtonClick: function() {
        this.customer = Ext.create('ShopTestApp.view.customer.Customer', {
            viewModel: {
                links: {
                    customer: {
                        reference: 'ShopTestApp.model.Customer',
                        create: true
                    }
                },
                data: {
                    mode: 'add',
                    formTitle: 'Create Customer'
                }
            },
            listeners: {
                scope: this,
                saved: 'doRefresh'
            }
        });
        this.customer.show();
    },

    openEditWindow: function(actionsPanelHidden) {
        var selectionModel = this.lookupReference('customerlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedRecord = selectionModel.getSelection()[0];
            this.customer = Ext.create('ShopTestApp.view.customer.Customer', {
                viewModel: {
                    links: {
                        customer: {
                            type: 'ShopTestApp.model.Customer',
                            id: this.selectedRecord.get("ID")
                        }
                    },
                    data: {
                        mode: 'edit',
                        formTitle: 'Edit Customer'
                    }
                },
                listeners: {
                    scope: this,
                    saved: 'doRefresh'
                }
            });
            this.customer.show();
        }
    },

    deleteButtonClick: function() {
        var selectionModel = this.lookupReference('customerlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedItem = selectionModel.getSelection()[0];
            Ext.Msg.show({
                scope: this,
                title:'Delete Product?',
                message: 'You are going to delete customer ' + this.selectedItem.get("Name") + '. Proceed?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var customersStore = Ext.getStore('customersStore');
                        var record = customersStore.getById(this.selectedItem.get('ID'));
                        customersStore.remove(record);
                        customersStore.sync({
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
        var store = this.getViewModel().getStore('CustomerListStore');
        store.clearFilter();
        var filters = store.getFilters();
        var customerFilters = this.getViewModel().get("customerFilters");
        
        if (customerFilters.Name) {
            filters.add(new Ext.util.Filter({
                    property: 'Name',
                    value   : customerFilters.Name
                })
            );
        }
        if (customerFilters.Code) {
            filters.add(new Ext.util.Filter({
                    property: 'Code',
                    value   : customerFilters.Code
                })
            );
        }
        if (customerFilters.Address) {
            filters.add(new Ext.util.Filter({
                    property: 'Address',
                    value   : customerFilters.Address
                })
            );
        }
        if (customerFilters.Discount) {
            filters.add(new Ext.util.Filter({
                    property: 'Discount',
                    value   : customerFilters.Discount
                })
            );
        }
        store.filter();
    },

    clearFiltersButtonClick: function() {
        var store = this.getViewModel().getStore('CustomerListStore');
        store.clearFilter();
        store.filter();
    },

    onSuccess: function() {
        Ext.globalEvents.fireEvent('printMessage', 'Customer deleted. Name: ' + this.selectedItem.get("Name") + '.');
        this.doRefresh();
    },

    onFailure: function(errorMsg) {
        this.doRefresh();
    },

    doRefresh: function() {
        this.getView().getViewModel().getStore('CustomerListStore').load();
    }
});
