Ext.define('ShopTestApp.view.customer.CustomerList', {
    extend: 'Ext.grid.Panel',
    xtype: 'customerlist',
    reference: 'customerlist',

    requires: ['ShopTestApp.store.Customers'],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{CustomerListStore}'
        },
        dock: 'bottom',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: 'Пользователи {0} - {1} из {2}'
    }],

    bind: {
        store: '{CustomerListStore}'
    },

    columns: [{
        text: 'Code',
        width: '25%',
        sortable: true,
        dataIndex: 'Code'
    }, {
        text: 'Name',
        width: '25%',
        sortable: true,
        dataIndex: 'Name'
    }, {
        text: 'Address',
        width: '25%',
        sortable: true,
        dataIndex: 'Address'
    }, {
        text: 'Discount',
        width: '25%',
        sortable: true,
        dataIndex: 'Discount'
    }]
});