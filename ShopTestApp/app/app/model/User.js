Ext.define('ShopTestApp.model.User', {
    extend: 'Ext.data.Model',

    idProperty: 'ID',

    fields: [
        'ID',
        'Email',
        'Name'
    ],
    requires: [
        'ShopTestApp.model.Role'
    ],

    hasMany: {
        model : 'ShopTestApp.model.Role',
        name : 'Roles',
        associationKey: 'Roles'
    },

    proxy: {
        storeEntityName: 'User',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        api:{
            read: '../../Manage/Details',
            create: '../../Manage/Create'
        },
        type: 'ajaxproxy',
        reader: {
            type: 'json',
            rootProperty: 'User'
        },
        writer: {
            type: 'json',
            encode: false,
            writeAllFields: true,
            allDataOptions: {
                associated: true
            }
        }
    },
});
