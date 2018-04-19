Ext.define('ShopTestApp.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'ShopTestApp.view.main.CenterPanel',
        'ShopTestApp.view.main.StatusPanel'
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    ui: 'navigation',

    items: [{
        xtype: 'centerpanel',
        flex: 1
    }, {
        xtype: 'statuspanel'
    }]
});