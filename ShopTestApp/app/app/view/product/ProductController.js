Ext.define('ShopTestApp.view.product.ProductController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.productcontroller',

    requires: [
        'ShopTestApp.view.product.Product'
    ],

    init: function() {
        if (this.getViewModel().get('ProductsSection.addToBasketVisible'))
        {
            this.lookupReference('actionspanel').show();
        }
        if (this.getViewModel().get('ProductsSection.toolbarVisible'))
        {
            this.lookupReference('productsavebutton').show();
        }
    },

    onSave: function() {
        var vm = this.getViewModel();
        var p = vm.get('product');
        if (vm.get('mode') == 'add')
        {
            delete p.data.ID;
        }
        p.save({
            scope: this,
            success: this.onSuccess,
            failure: this.onFailure
        });
    },

    addToBasket: function() {
        var product = this.getViewModel().get('product');
        var number = this.getViewModel().get('number');
        if (product != null && number > 0) {
            var s = Ext.getStore('basketStoreId');
            var productId = product.get("ID");
            var productInStore = s.findRecord('Item_ID', productId);

            if (productId != null &&  productInStore == null) {
                var po = Ext.create('ShopTestApp.model.ProductInOrder', {
                    Items_Count: number,
                    Item_ID: productId,
                    Item_Name: product.get("Name"),
                    Item_Price: product.get("Price")
                });
                s.add(po);
            }
            else {
                productInStore.set('Items_Count', productInStore.get('Items_Count') + number);
                productInStore.set('Item_Name', product.get("Name"));
                productInStore.set('Item_Price', product.get("Price"));
            }
            
            this.closeWindow();
        }
    },

    onSuccess: function(records, action) {
        Ext.globalEvents.fireEvent('printMessage', 'Product saved. Name: ' + this.getViewModel().get('product').get("Name") + '. Code: ' + this.getViewModel().get('product').get("Code") + '.');
        this.fireViewEvent('saved');
        this.closeWindow();
        Ext.getBody().unmask();
    },

    onFailure: function(errorMsg) {
        this.closeWindow();
        Ext.getBody().unmask();
    },

    onCancel: function() {
        this.closeWindow();
    },

    closeWindow: function () {
        this.getView().destroy();
    }
});
