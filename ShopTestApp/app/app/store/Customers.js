Ext.define('ShopTestApp.store.Customers', {
    extend: 'Ext.data.Store',
    alias: 'store.customers',
    xtype: 'customers',
    model: 'ShopTestApp.model.Customer',
    autoLoad: false,
    remoteFilter: true,
    pageSize: 10,
    storeId: 'customersStore',
    proxy: {
        storeEntityName: 'Customers',
        api:{
            read: '../../Customer',
            destroy: '../../Customer/Delete'
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
            rootProperty: 'Customers',
            totalProperty: 'Total'
        },
        writer: {
            type: 'json',
            encode: false
        }
    },
});