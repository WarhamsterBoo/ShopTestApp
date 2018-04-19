Ext.define('ShopTestApp.view.customer.CustomerFilters', {
    extend: 'Ext.panel.Panel',
    xtype: 'customerfilters',
    reference: 'customerfilters',
    
    layout: {
        type: 'accordion',
        titleCollapse: false,
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
                value: '{customerFilters.Name}'
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
                value: '{customerFilters.Code}'
            }
        }]
    }, {
        title: 'Address',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Address',
            bind: {
                value: '{customerFilters.Address}'
            }
        }]
    }, {
        title: 'Discount',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Discount',
            bind: {
                value: '{customerFilters.Discount}'
            }
        }]
    }]
});