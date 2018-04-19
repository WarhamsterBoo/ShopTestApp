Ext.define('ShopTestApp.view.basket.BasketList', {
    extend: 'Ext.grid.Panel',
    xtype: 'basketlist',
    reference: 'basketlist',

    store: 'basketStoreId',

    columns: [{
        text: 'Name',
        width: '33%',
        dataIndex: 'Item_Name'
    }, {
        text: 'Items Count',
        dataIndex: 'Items_Count',
        width: '33%'
    }, {
        text: 'Item Price',
        dataIndex: 'Item_Price',
        width: '33%',
    }]
});