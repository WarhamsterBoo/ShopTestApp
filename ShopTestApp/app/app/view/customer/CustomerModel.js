Ext.define('ShopTestApp.view.customer.CustomerModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'customerviewmodel',
	alias: 'viewmodel.customerviewmodel',

    links: {
		customer: {
			
		}
	},

	data: {
		mode: '',
		formTitle: ''
	}
});