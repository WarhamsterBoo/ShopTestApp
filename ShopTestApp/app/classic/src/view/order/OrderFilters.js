Ext.define('ShopTestApp.view.order.OrderFilters', {
    extend: 'Ext.panel.Panel',
    xtype: 'orderfilters',
    reference: 'orderfilters',
    
    layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        multi: true
    },
    items: [{
        title: 'Order Number',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Order_Number',
            bind: {
                value: '{orderFilters.Order_Number}'
            }
        }]
    }, {
        title: 'Status',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'stacombobox',
            name: 'Status',
            bind: {
                value: '{orderFilters.Status}'
            }
        }]
    }]
});