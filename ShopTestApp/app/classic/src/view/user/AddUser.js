
Ext.define('ShopTestApp.view.user.AddUserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'adduserform',

    modelValidation: true,
    region:'center',
    bind: {
        title: '{formTitle}'
    },

    layout: {
        type:'vbox', 
        align:'stretch'
    },

    items: [{
        xtype: 'hidden',
        name: 'ID',
        bind: '{user.ID}'
    }, {
        xtype: 'textfield',
        name: 'Email',
        fieldLabel: 'Email',
        bind: '{user.Email}'
    }, {
        xtype: 'textfield',
        inputType: 'password',
        name: 'Password',
        fieldLabel: 'Password',
        bind: '{user.Password}'
    }, {
        xtype: 'checkboxgroup',
        fieldLabel: 'Roles',
        defaultType: 'checkboxfield',
        reference: 'userformroles',
        columns: 1,
        items: [
            {boxLabel: 'Admin', name: 'admin'},
            {boxLabel: 'Manager', name: 'manager', checked: true},
            {boxLabel: 'Customer', name: 'customer'}
        ]
    }],
    buttons: [{
        text: 'Create',
        formBind: true,
        listeners: {
            click: 'onSave'
        }
    }, {
        text: 'Cancel',
        listeners: {
            click: 'onCancel'
        }
    }]
});