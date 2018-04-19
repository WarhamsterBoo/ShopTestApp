Ext.define('ShopTestApp.store.OrderStatus', {
    extend: 'Ext.data.Store',
    alias: 'store.orderstatus',
    xtype: 'orderstatus',
    autoLoad: true,
    storeId: 'orderStatusStore',
    idProperty: 'id',
    fields: ['id', 'name'],
    data : [
        {
            'id': 'New',
            'name': 'Новый'
        },
        {
            'id': 'InProgress',
            'name': 'Выполняется'
        },
        {
            'id': 'Completed',
            'name': 'Выполнен'
        }
    ]
});