Ext.define('ShopTestApp.view.product.Product', {
    extend: 'Ext.window.Window',
    xtype: 'product',
    requires: [
        'ShopTestApp.model.Product',
        'ShopTestApp.view.product.ProductModel',
        'Ext.layout.container.Border'
    ],
    controller: 'productcontroller',
    viewModel: {
        type: 'productviewmodel'
    },

    header: false,
    bodyBorder: false,
    height: '50%',
    width: '30%',
    closable: true,
    autoShow: false,

    layout: {
        type: 'border'
    },
    defaults: {
        split: true,
        bodyPadding: 10
    },

    items: [{
        xtype: 'panel',
        hidden: true,
        reference: 'actionspanel',
        region:'west',
        width: '25%',
        title: 'Actions',
        collapsible: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'numberfield',
            name: 'Count',
            bind: {
                value: '{number}'
            }
        }, {
            xtype: 'button',
            text: 'Add to Basket',
            handler: 'addToBasket'
        }]
    }, {
        xtype: 'form',
        reference: 'product-form',
        region:'center',
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
            bind: '{product.ID}'
        }, {
            xtype: 'textfield',
            name: 'Code',
            fieldLabel: 'Code',
            allowBlank: false,
            bind: {
                value: '{product.Code}',
                readOnly: '{!ProductsSection.toolbarVisible}'
            }
        }, {
            xtype: 'textfield',
            name: 'Name',
            fieldLabel: 'Name',
            allowBlank: true,
            bind: {
                value: '{product.Name}',
                readOnly: '{!ProductsSection.toolbarVisible}'
            }
        }, {
            xtype: 'textfield',
            name: 'Price',
            fieldLabel: 'Price',
            allowBlank: true,
            bind: {
                value: '{product.Price}',
                readOnly: '{!ProductsSection.toolbarVisible}'
            }
        }, {
            xtype: 'textfield',
            name: 'Category',
            fieldLabel: 'Category',
            allowBlank: true,
            bind: {
                value: '{product.Category}',
                readOnly: '{!ProductsSection.toolbarVisible}'
            }
        }],
        buttons: [{
            text: 'Save',
            formBind: true,
            hidden: true,
            reference: 'productsavebutton',
            listeners: {
                click: 'onSave'
            }
        }, {
            text: 'Cancel',
            listeners: {
                click: 'onCancel'
            }
        }]
    }]
});