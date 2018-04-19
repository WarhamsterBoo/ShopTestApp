Ext.define('ShopTestApp.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    xtype: 'users',
    model: 'ShopTestApp.model.User',
    autoLoad: false,
    remoteFilter: true,
    pageSize: 10,
    storeId: 'usersStore',
    proxy: {
        storeEntityName: 'Users',
        api: {
            read: '../../Manage',
            destroy: '../../Manage/Delete'
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
            rootProperty: 'Users',
            totalProperty: 'Total'
        },
        writer: {
            type: 'json',
            encode: false
        }
    }
});