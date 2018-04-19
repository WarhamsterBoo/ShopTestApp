Ext.define('ShopTestApp.view.order.OrderPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'orderpanel',
    reference: 'orderpanel',
    controller: 'orderpanelcontroller',
    viewModel: {
        type: 'orderpanelviewmodel'
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

    layout: {
        type: 'border'
    },

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
                    xtype: 'orderfilters',
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
            xtype: 'orderlist',
            listeners: {
                scope: 'controller',
                rowdblclick: 'openEditWindow'
            }
        }
    ]
});