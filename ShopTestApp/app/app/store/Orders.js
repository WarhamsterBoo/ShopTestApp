Ext.define('ShopTestApp.store.Orders', {
    extend: 'Ext.data.Store',
    alias: 'store.orders',
    xtype: 'orders',
    model: 'ShopTestApp.model.Order',
    autoLoad: false,
    remoteFilter: true,
    pageSize: 10,
    storeId: 'ordersStoreId',
    proxy: {
        storeEntityName: 'Orders',
        api:{
            read: '../../Order',
            destroy: '../../Order/Delete'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        type: 'ajaxproxy',
        reader: {
            type: 'json',
            rootProperty: 'Orders',
            totalProperty: 'Total'
        },
        writer: {
            type: 'json',
            encode: false
        }
    },
});