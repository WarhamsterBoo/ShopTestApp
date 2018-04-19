Ext.define('ShopTestApp.view.order.OrderList', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlist',
    reference: 'orderlist',

    requires: ['ShopTestApp.store.Orders'],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{OrderListStore}'
        },
        dock: 'bottom',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: 'Заказы {0} - {1} из {2}'
    }],

    bind: {
        store: '{OrderListStore}'
    },

    columns: [{
        text: 'Customer',
        width: '19%',
        sortable: true,
        dataIndex: 'Customer_Name'
    }, {
        xtype: 'datecolumn',
        text: 'Order_Date',
        width: '19%',
        sortable: true,
        dataIndex: 'Order_Date'
    }, {
        xtype: 'datecolumn',
        text: 'Shipment_Date',
        width: '19%',
        sortable: true,
        dataIndex: 'Shipment_Date'
    }, {
        text: 'Order_Number',
        width: '19%',
        sortable: true,
        dataIndex: 'Order_Number'
    }, {
        text: 'Status',
        width: '19%',
        sortable: true,
        dataIndex: 'Status'
    }]
});