/**
 * Overriding the Ext.ZIndexManager class
 */
var dt = new Date();
/**
 * @function formatDate
 * @description This method formats the field values Date
 * @returns {value}
 */
function formatDate(value) {
    var newDate = new Date(value);
    return value ? Ext.Date.format(newDate, 'd/m/Y') : '';
}

Ext.define('Ext.ux.SistemasCasa.BaseClasses.DinamicGrid', {
    extend: 'Ext.grid.Panel',
    border: false,
    loadMask: true,
    itemId: 'reportsgrid',
    stateful: false,
    autoScroll: true,
    loadingMask: true,
    initComponent	: function() {
        var me = this;

        me.callParent();
    },
    
    viewConfig : {
        listeners : {
            refresh : function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                 if (column.autoSizeColumn === true)
                  column.autoSize();
                })
            }
        }
    },
	
});