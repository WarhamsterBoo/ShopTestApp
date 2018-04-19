Ext.define('ShopTestApp.model.Product', {
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
        name: 'Price',
        type: 'number'
    } , {
        name: 'Category',
        type: 'string'
    }],

    validators: {
        Category: {
            type: 'length',
            max: 30
        },
        Code: [{
            type: 'format',
            matcher: /^[0-9]{2}-[0-9]{4}-[A-Z]{2}[0-9]{2}$/,
            message: 'Format must be: XX-XXXX-YYXX'
        }, {
            type: 'presence'
        }]
    },

    belongsTo: [
        'ShopTestApp.model.ProductInOrder'
    ],

    proxy: {
        storeEntityName: 'Product',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        api:{
            read: '../../Product/Details',
            create: '../../Product/Create',
            update: '../../Product/Edit'
        },
        type: 'ajaxproxy',
        reader: {
            type: 'json',
            rootProperty: 'Product'
        },
        writer: {
            type: 'json',
            encode: false,
            writeAllFields: true
        }
    },
});
