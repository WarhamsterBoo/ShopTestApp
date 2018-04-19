Ext.define('ShopTestApp.model.Order', {
    extend: 'Ext.data.Model',

    requires: [
        'ShopTestApp.field.StaDateField'
    ],

    idProperty:'ID',

    fields: [{
        name: 'ID'
    }, {
        name: 'Customer',
        reference: 'ShopTestApp.model.Customer'
    }, {
        name: 'Customer_Name',
        type: 'string',
        calculate: function(data) {
            if (data && data.Customer) {
                return data.Customer.Name;
            }
            return null;
        }
    }, {
        name: 'Order_Date',
        type: 'stadate'
    }, {
        name: 'Shipment_Date',
        type: 'stadate'
    }, {
        name: 'Order_Number',
        type: 'int'
    }, {
        name: 'Status',
        type: 'string'
    }],

    hasMany: {
        model: 'ShopTestApp.model.ProductInOrder',
        name: 'ProductsInOrder',
        associationKey: 'ProductsInOrder'
    },

    validators: {
        Order_Date: [{
            type: 'presence'
        }],
        Customer_ID: [{
            type: 'presence'
        }]
    },

    proxy: {
        storeEntityName: 'Order',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        api:{
            read: '../../Order/Details',
            create: '../../Order/Create',
            update: '../../Order/Edit'
        },
        type: 'ajaxproxy',
        reader: {
            type: 'json',
            rootProperty: 'Order'
        },
        writer: {
            type: 'json',
            encode: false,
            writeAllFields: true
        }
    },
});