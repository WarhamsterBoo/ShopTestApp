
Ext.define('ShopTestApp.view.user.EditUserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'edituserform',

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
        bind: '{user.Email}',
        readOnly: true
    }, {
        xtype: 'grid',
        columns: [{
            text: 'Name',
            dataIndex: 'Name',
            width: '100%'
        }],
        bind: {
            store: '{user.Roles}'
        }
    }],
    buttons: [{
        text: 'Cancel',
        listeners: {
            click: 'onCancel'
        }
    }]
});