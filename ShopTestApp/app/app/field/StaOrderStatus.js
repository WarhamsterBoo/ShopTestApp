Ext.define('ShopTestApp.field.StaOrderStatus', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'data.form.stacombobox',
    xtype: 'stacombobox',
    requires: [
        'ShopTestApp.store.OrderStatus'
    ],
    store: Ext.create('ShopTestApp.store.OrderStatus'),
    queryMode: 'local',
    displayField: 'name',
    valueField: 'name',
});