Ext.define('ShopTestApp.view.main.UserLoginInfoPanel', {
    extend: 'Ext.menu.Menu',
    xtype: 'userloginpanel',
    
    reference: 'userlogininfo',

    plain: true,

    items: [{
        xtype: 'label',
        margin: 5,
        text: 'User Roles'
    }, '-', {    
        xtype: 'dataview',
        border: true,
        bind: {
            data: '{CurrentUser.Roles}'
        },
        itemTpl: '<p>{Name}</p>'
    }, '-', {
        text: 'Logout',
        handler: 'onLogoutClick'
    }]
});