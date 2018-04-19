Ext.define('ShopTestApp.view.product.ProductPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.productpanelcontroller',

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    init: function() {
        this.getViewModel().getStore('ProductListStore').load();
    },

    addButtonClick: function() {
        this.product = Ext.create('ShopTestApp.view.product.Product', {
            viewModel: {
                links: {
                    product: {
                        reference: 'ShopTestApp.model.Product',
                        create: true
                    }
                },
                data: {
                    mode: 'add',
                    formTitle: 'Create Product'
                }
            },
            listeners: {
                scope: this,
                saved: 'doRefresh'
            }
        });
        this.product.show();
    },

    openEditWindow: function(actionsPanelHidden) {
        var selectionModel = this.lookupReference('productlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedRecord = selectionModel.getSelection()[0];
            this.product = Ext.create('ShopTestApp.view.product.Product', {
                viewModel: {
                    links: {
                        product: {
                            type: 'ShopTestApp.model.Product',
                            id: this.selectedRecord.get("ID")
                        }
                    },
                    data: {
                        mode: 'edit',
                        formTitle: 'Edit Product'
                    }
                },
                listeners: {
                    scope: this,
                    saved: 'doRefresh'
                }
            });
            this.product.show();
        }
    },

    deleteButtonClick: function() {
        var selectionModel = this.lookupReference('productlist').getSelectionModel();
        if (selectionModel.hasSelection() && selectionModel.getSelection().length === 1)
        {
            this.selectedItem = selectionModel.getSelection()[0];
            Ext.Msg.show({
                scope: this,
                title:'Delete Product?',
                message: 'You are going to delete product ' + this.selectedItem.get("Name") + '. Proceed?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var productsStore = Ext.getStore('storeId');
                        var record = productsStore.getById(this.selectedItem.get('ID'));
                        productsStore.remove(record);
                        productsStore.sync({
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
        var store = this.getViewModel().getStore('ProductListStore');
        store.clearFilter();
        var filters = store.getFilters();
        var productFilters = this.getViewModel().data.productFilters;
        
        if (productFilters.Name) {
            filters.add(new Ext.util.Filter({
                    property: 'Name',
                    value   : productFilters.Name
                })
            );
        }
        if (productFilters.Code) {
            filters.add(new Ext.util.Filter({
                    property: 'Code',
                    value   : productFilters.Code
                })
            );
        }
        if (productFilters.Price) {
            filters.add(new Ext.util.Filter({
                    property: 'Price',
                    value   : productFilters.Price
                })
            );
        }
        if (productFilters.Category) {
            filters.add(new Ext.util.Filter({
                    property: 'Category',
                    value   : productFilters.Category
                })
            );
        }
        store.filter();
    },

    clearFiltersButtonClick: function() {
        var store = this.getViewModel().getStore('ProductListStore');
        store.clearFilter();
        store.filter();
    },

    onSuccess: function() {
        Ext.globalEvents.fireEvent('printMessage', 'Product deleted. Name: ' + this.selectedItem.get("Name") + ' Code: ' + this.selectedItem.get("Code") + '.');
        this.doRefresh();
    },

    onFailure: function(errorMsg) {
        this.doRefresh();
    },

    doRefresh: function() {
        this.getView().getViewModel().getStore('ProductListStore').load();
    }
});
