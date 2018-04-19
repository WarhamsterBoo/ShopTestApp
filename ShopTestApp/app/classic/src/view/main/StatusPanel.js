Ext.define('ShopTestApp.view.main.StatusPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'statuspanel',
    reference: 'statuspanel',

    frame: true,
    titleAlign: 'center',
    bind: {
        title: '{lastMessage}',
    }
});