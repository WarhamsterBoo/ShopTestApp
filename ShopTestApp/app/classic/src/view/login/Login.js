Ext.define('ShopTestApp.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'ShopTestApp.view.login.LoginController'
    ],

    controller: 'login',
    
    bodyPadding: 10,
    title: 'Login Window',
    closable: false,
    autoShow: false,

    items: {
        xtype: 'form',
        reference: 'login-form',
        items: [{
            xtype: 'textfield',
            name: 'Email',
            fieldLabel: 'Email',
            allowBlank: false,
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'textfield',
            name: 'Password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'label',
            hidden: true,
            reference: 'loginerrorlabel'
        }],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});