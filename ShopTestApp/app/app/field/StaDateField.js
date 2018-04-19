Ext.define('ShopTestApp.field.StaDateField', {
    extend: 'Ext.data.field.Date',
    alias: 'data.field.stadate',
    xtype: 'stadate',
    convert: function(data) {
        if (data) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(data);
            if (results.length > 1)
            {
                var dt = new Date(parseFloat(results[1]));
                return dt;
            }
        }
        return null;
    }
});