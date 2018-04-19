Ext.define('ShopTestApp.view.order.OrderModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'orderviewmodel',
	alias: 'viewmodel.orderviewmodel',

    links: {
		selectedOrder: {
			
		}
	},

	data: {
		mode: '',
		formTitle: '',
		number: 1,
		cannotBeDeleted: false
	}
});