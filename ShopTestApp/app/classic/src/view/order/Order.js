Ext.define('ShopTestApp.view.order.Order', {
    extend: 'Ext.window.Window',
    xtype: 'order',
    requires: [
        'ShopTestApp.model.Order',
        'ShopTestApp.view.order.OrderModel',
        'Ext.layout.container.Border'
    ],

    controller: 'ordercontroller',
    viewModel: {
        type: 'orderviewmodel'
    },

    session: true,

    header: false,
    bodyBorder: false,
    height: '50%',
    width: '45%',
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
        region:'west',
        width: '20%',
        title: 'Actions',
        reference: 'orderacitons',
        collapsible: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            margin: 3
        }
    }, {
        xtype: 'form',
        reference: 'order-form',
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
            bind: {
                value: '{selectedOrder.ID}'
            }
        }, {
            xtype: 'textfield',
            name: 'Order_Number',
            fieldLabel: 'Order Number',
            bind: {
                value: '{selectedOrder.Order_Number}'
            },
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Status',
            fieldLabel: 'Status',
            bind: {
                value: '{selectedOrder.Status}'
            },
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Customer_Name',
            fieldLabel: 'Customer Name',
            bind: {
                value: '{selectedOrder.Customer.Name}'
            },
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Order_Date',
            fieldLabel: 'Order Date',
            bind: {
                value: '{selectedOrder.Order_Date}'
            },
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Shipment_Date',
            fieldLabel: 'Shipment Date',
            bind: {
                value: '{selectedOrder.Shipment_Date}'
            },
            readOnly: true
        }, {
            xtype: 'grid',
            bind: {
                store: '{selectedOrder.ProductsInOrder}'
            },
            columns: [{
                text: 'Name',
                width: '33%',
                dataIndex: 'Item_Name',
            }, {
                text: 'Items Count',
                dataIndex: 'Items_Count',
                width: '33%'
            }, {
                text: 'Item Price',
                dataIndex: 'Item_Price',
                width: '33%',
            }]
        }],
        buttons: [{
            text: 'Cancel',
            listeners: {
                click: 'onCancel'
            }
        }]
    }]
});