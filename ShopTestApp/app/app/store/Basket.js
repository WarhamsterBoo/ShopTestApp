Ext.define('ShopTestApp.store.Basket', {
    extend: 'Ext.data.Store',
    alias: 'store.basketstore',
    xtype: 'basketstore',
    model: 'ShopTestApp.model.ProductInOrder',
    autoLoad: false,
    autoSync: false,
    storeId: 'basketStoreId',

    proxy: {
        type: 'ajaxproxy',
        storeEntityName: 'Order',
        api:{
            create: '../../Order/Create',
            update: '../../Order/Create'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        writer: {
            type: 'json',
            encode: false,
            writeAllFields: true,
            rootProperty: 'Products',
            allowSingle: false
        },

        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});