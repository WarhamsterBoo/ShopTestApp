Ext.define('ShopTestApp.view.user.UserFilters', {
    extend: 'Ext.panel.Panel',
    xtype: 'accountfilters',
    reference: 'accountfilters',
    
    layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        multi: true
    },
    items: [{
        title: 'Email',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textfield',
            name: 'Email',
            bind: {
                value: '{userFilters.Email}'
            }
        }]
    }]
});