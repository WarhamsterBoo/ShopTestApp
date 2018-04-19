Ext.define('ShopTestApp.view.product.ProductModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'productviewmodel',
	alias: 'viewmodel.productviewmodel',

    links: {
		product: {
			
		}
	},

	data: {
		mode: '',
		formTitle: '',
		number: 1
	}
});