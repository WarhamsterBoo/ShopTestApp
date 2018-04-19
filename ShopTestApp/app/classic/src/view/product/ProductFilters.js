Ext.define('ShopTestApp.view.product.ProductFilters', {
    extend: 'Ext.panel.Panel',
    xtype: 'productfilters',
    reference: 'productfilters',
    
    layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        multi: true
    },
    items: [{
        title: 'Name',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Name',
            bind: {
                value: '{productFilters.Name}'
            }
        }]
    }, {
        title: 'Code',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Code',
            bind: {
                value: '{productFilters.Code}'
            }
        }]
    }, {
        title: 'Price',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Price',
            bind: {
                value: '{productFilters.Price}'
            }
        }]
    }, {
        title: 'Category',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Category',
            bind: {
                value: '{productFilters.Category}'
            }
        }]
    }]
});