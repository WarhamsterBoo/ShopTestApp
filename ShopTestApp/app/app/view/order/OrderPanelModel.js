Ext.define('ShopTestApp.view.order.OrderPanelModel', {
    extend: 'Ext.app.ViewModel',
    xtype: 'orderpanelviewmodel',
	alias: 'viewmodel.orderpanelviewmodel',

	stores: {
        OrderListStore: {
            type: 'orders'
        }
    },

    data: {
        orderFilters: {
            Order_Number: '',
            Status: ''
        }
    }
});