Ext.define('ShopTestApp.view.customer.CustomerPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'customerpanel',
    reference: 'customerpanel',
    controller: 'customerpanelcontroller',
    viewModel: {
        type: 'customerpanelviewmodel'
    },

    requires: [
        'Ext.layout.container.Border'
    ],

    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },

    tbar: {
        items: [{
            xtype: 'button',
            text: 'Add Customer',
            handler: 'addButtonClick'
        }, {
            xtype: 'button',
            text: 'Edit Customer',
            handler: 'openEditWindow'
        }, {
            xtype: 'button',
            text: 'Delete Customer',
            handler: 'deleteButtonClick'
        }]
    },

    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region:'west',
            floatable: false,
            margin: 5,
            width: '20%',
            title: 'Filters',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                margin: 3
            },
            items: [
                {
                    xtype: 'customerfilters',
                },
                {
                    xtype: 'button',
                    text: 'Apply',
                    handler: 'applyFiltersButtonClick'
                },
                {
                    xtype: 'button',
                    text: 'Reset Filters',
                    handler: 'clearFiltersButtonClick'
                }
            ]
        }, {
            collapsible: false,
            region: 'center',
            margin: 5,
            xtype: 'customerlist',
            listeners: {
                scope: 'controller',
                rowdblclick: 'openEditWindow'
            }
        }
    ]
});