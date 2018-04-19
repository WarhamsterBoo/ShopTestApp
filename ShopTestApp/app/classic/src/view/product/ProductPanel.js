Ext.define('ShopTestApp.view.product.ProductPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'productpanel',
    reference: 'productpanel',
    controller: 'productpanelcontroller',
    viewModel: {
        type: 'productpanelviewmodel'
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
        bind: {
            hidden: '{!ProductsSection.toolbarVisible}'
        },
        items: [{
            xtype: 'button',
            text: 'Add Product',
            handler: 'addButtonClick'
        }, {
            xtype: 'button',
            text: 'Edit Product',
            handler: 'openEditWindow'
        }, {
            xtype: 'button',
            text: 'Delete Product',
            handler: 'deleteButtonClick'
        }]
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
                    xtype: 'productfilters',
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
            xtype: 'productlist',
            listeners: {
                scope: 'controller',
                rowdblclick: 'openEditWindow'
            }
        }
    ]
});