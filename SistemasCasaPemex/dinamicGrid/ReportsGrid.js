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

Ext.define('Ext.ux.SistemasCasa.dinamicGrid.ReportsGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*',
        'Ext.panel.Panel',
        'Ext.view.View',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Paging',
        'Ext.ux.form.SearchField',
        'Ext.ux.CheckColumn',
    ],
    border: false,
    loadMask: true,
    itemId: 'reportsgrid',
    stateful: false,
    autoScroll: true,
    loadingMask: true,
    initComponent	: function() {
        var me = this;

        if(this.editable){
                me.plugins = [Ext.create("Ext.grid.plugin.RowEditing")];
        }
        
        me.callParent();
            /**
            * @function formatDate
            * @description This method formats the field values Date
            * @returns {value}
            */
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
    }
    
	
});