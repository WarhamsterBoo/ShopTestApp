Ext.define('ShopTestApp.model.Customer', {
    extend: 'Ext.data.Model',
    idProperty:'ID',
    fields: [{
        name: 'ID'
    }, {
        name: 'Name',
        type: 'string'
    }, {
        name: 'Code',
        type: 'string'
    } , {
        name: 'Address',
        type: 'string'
    } , {
        name: 'Discount',
        type: 'number'
    }, {
        name: 'Email',
        type: 'string'
    }, {
        name: 'Password',
        type: 'string'
    }],

    validators: {
        Name: [{
            type: 'presence'
        }],
        Code: [{
            type: 'format',
            matcher: /^[0-9]{4}-[0-9]{4}$/,
            message: 'Format must be: XXXX-YYYY'
        }, {
            type: 'presence'
        }],
        Password: [{
            type: 'length',
            min: 6
        }]
    },

    proxy: {
        storeEntityName: 'Customer',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        api:{
            read: '../../Customer/Details',
            create: '../../Customer/Create',
            update: '../../Customer/Edit'
        },
        type: 'ajaxproxy',
        reader: {
            type: 'json',
            rootProperty: 'Customer'
        },
        writer: {
            type: 'json',
            encode: false,
            writeAllFields: true
        }
    },
});
