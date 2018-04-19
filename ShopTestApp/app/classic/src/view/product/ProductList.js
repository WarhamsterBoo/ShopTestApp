Ext.define('ShopTestApp.view.product.ProductList', {
    extend: 'Ext.grid.Panel',
    xtype: 'productlist',
    reference: 'productlist',

    requires: ['ShopTestApp.store.Products'],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{ProductListStore}'
        },
        dock: 'bottom',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: 'Товары {0} - {1} из {2}'
    }],

    bind: {
        store: '{ProductListStore}'
    },

    columns: [{
        text: 'Code',
        width: '24%',
        sortable: true,
        dataIndex: 'Code'
    }, {
        text: 'Name',
        width: '24%',
        sortable: true,
        dataIndex: 'Name'
    }, {
        text: 'Price',
        width: '24%',
        sortable: true,
        dataIndex: 'Price'
    }, {
        text: 'Category',
        width: '24%',
        sortable: true,
        dataIndex: 'Category'
    }]
});