Ext.define('ShopTestApp.view.customer.CustomerPanelModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'customerpanelviewmodel',
	alias: 'viewmodel.customerpanelviewmodel',

	stores: {
        CustomerListStore: {
            type: 'customers'
        }
    },

    data: {
        customerFilters: {
            Name: '',
            Code: '',
            Address: '',
            Discount: ''
        }
    }
});