Ext.define('ShopTestApp.view.product.ProductPanelModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'productpanelviewmodel',
	alias: 'viewmodel.productpanelviewmodel',

	stores: {
        ProductListStore: {
            type: 'products'
        }
    },

    data: {
        productFilters: {
            Name: '',
            Code: '',
            Price: '',
            Category: ''
        }
    }
});