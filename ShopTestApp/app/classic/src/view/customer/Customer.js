Ext.define('ShopTestApp.view.customer.Customer', {
    extend: 'Ext.window.Window',
    xtype: 'customer',
    requires: [
        'ShopTestApp.model.Customer',
        'ShopTestApp.view.customer.CustomerModel',
        'Ext.layout.container.Border'
    ],

    controller: 'customercontroller',
    viewModel: {
        type: 'customerviewmodel'
    },

    header: false,
    bodyBorder: false,
    width: '30%',
    closable: true,
    autoShow: false,

    defaults: {
        split: true,
        bodyPadding: 10
    },

    items: {
        xtype: 'form',
        reference: 'customer-form',
        modelValidation: true,

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
            bind: '{customer.ID}'
        }, {
            xtype: 'textfield',
            name: 'Code',
            fieldLabel: 'Code',
            bind: '{customer.Code}',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'Name',
            fieldLabel: 'Name',
            bind: '{customer.Name}',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'Address',
            fieldLabel: 'Address',
            bind: '{customer.Address}',
            allowBlank: true
        }, {
            xtype: 'textfield',
            name: 'Discount',
            fieldLabel: 'Discount',
            bind: '{customer.Discount}',
            allowBlank: true
        }],
        buttons: [{
            text: 'Save',
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
    }
});