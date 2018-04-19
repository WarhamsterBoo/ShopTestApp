Ext.define('ShopTestApp.view.user.UserPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'userpanel',
    reference: 'userpanel',
    controller: 'userpanelcontroller',
    viewModel: {
        type: 'userpanelviewmodel'
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
            hidden: '{userToolbarHidden}'
        },
        items: [{
            xtype: 'button',
            text: 'Add User',
            handler: 'addButtonClick'
        }, {
            xtype: 'button',
            text: 'Delete User',
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
                    xtype: 'accountfilters',
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
            xtype: 'userlist',
            listeners: {
                scope: 'controller',
                rowdblclick: 'openEditWindow'
            }
        }
    ]
});