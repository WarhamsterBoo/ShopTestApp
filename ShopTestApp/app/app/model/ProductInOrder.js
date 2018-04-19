Ext.define('ShopTestApp.model.ProductInOrder', {
    extend: 'Ext.data.Model',
    idProperty:'ID',
    fields: [{
        name: 'ID'
    }, {
        name: 'Items_Count',
        type: 'int'
    }, {
        name: 'Item_Price',
        type: 'number'
    }, {
        name: 'Item_ID',
        type: 'string'
    }, {
        name: 'Item_Name',
        mapping: function(data) {
            if (data.Item) {
                return data.Item.Name;
            }
            else {
                return null;
            }
        }
    }],

    validators: {
        Items_Count: [{
            type: 'presence'
        }],
        Items_Price: [{
            type: 'presence'
        }],
        Item_ID: [{
            type: 'presence'
        }]
    },

    belongsTo: [ 'ShopTestApp.model.Order' ]
});
