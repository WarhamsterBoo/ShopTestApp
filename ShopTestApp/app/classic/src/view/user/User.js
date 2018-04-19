Ext.define('ShopTestApp.view.user.User', {
    extend: 'Ext.window.Window',
    xtype: 'user',
    requires: [
        'ShopTestApp.model.User',
        'ShopTestApp.view.user.UserModel',
        'ShopTestApp.view.user.AddUserForm',
        'ShopTestApp.view.user.EditUserForm'
    ],
    controller: 'usercontroller',
    viewModel: {
        type: 'userviewmodel'
    },

    reference: 'userwindow',

    header: false,
    bodyBorder: false,
    width: '20%',
    closable: true,
    autoShow: false,

    defaults: {
        split: true,
        bodyPadding: 10
    },

    items: []
});