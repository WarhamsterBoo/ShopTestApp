Ext.define('ShopTestApp.store.Products', {
    extend: 'Ext.data.Store',
    alias: 'store.products',
    xtype: 'products',
    model: 'ShopTestApp.model.Product',
    autoLoad: false,
    remoteFilter: true,
    pageSize: 10,
    storeId: 'storeId',
    proxy: {
        storeEntityName: 'Products',
        api:{
            read: '../../Product',
            destroy: '../../Product/Delete'
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
            rootProperty: 'Products',
            totalProperty: 'Total'
        },
        writer: {
            type: 'json',
            encode: false
        }
    },
});