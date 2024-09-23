/**
 * @class Pemexmaoo.modules.catalogs.users.view.UsersGrid
 * @extends Ext.ux.LiveSearchGridPanel
 * @autor Jaime Santana Zaldivar
 * @date Tue Apr 9 13:23:00 CDT 2013
 *
 * Abstract EditGrid class
 *
 *
 **/

/**
 * Including the ux classes
 */

Ext.override(Ext.LoadMask, {
    getStoreListeners: function(store) {
        var load = this.onLoad,
            beforeLoad = this.onBeforeLoad,
            result = {
                // Fired when a range is requested for rendering that is not in the cache
                cachemiss: beforeLoad,

                // Fired when a range for rendering which was previously missing from the cache is loaded
                cachefilled: load
            };

        // Only need to mask on load if the proxy is asynchronous - ie: Ajax/JsonP
        if (!store.proxy.isSynchronous) {
            result.beforeload = beforeLoad;
            result.load = load;
        }
        return result;
    }
});

Ext.Loader.setPath('Ext.ux', '../');

Ext.define("Ext.ux.SistemasCasa.grid.EditGrid",{
    extend: 'Ext.grid.Panel',
	
	requires	: [
	    'Ext.data.*',
	    'Ext.util.*',
	    'Ext.state.*',
	    'Ext.form.*',
	    'Ext.panel.Panel',
	    'Ext.view.View',
	    'Ext.layout.container.Fit',
	    'Ext.toolbar.Paging',
	    'Ext.ux.CheckColumn',
		'Ext.grid.plugin.CellEditing'
	],
	
	border		: false,
	editable	: true,
	anchor		: '100%',
	stateful	: false,
	//autoScroll	: true,
	loadingMask	: true,	
	
	/**
     * Component Startup
     */
	initComponent	: function() {
		var me = this;

		if(this.editable){
			this.editing = Ext.create('Ext.grid.plugin.CellEditing');
			me.plugins = [this.editing];
		}
		
		me.callParent();
	},
	
	/**
	 * This method formats the field values
	 */
	showActive	: function(value){
		var icon = "bleext-failure-icon-16";
		if(value){
			icon = "bleext-success-icon-16";
		}
		
		return '<center><img src="' + Ext.BLANK_IMAGE_URL + '" class="bleext-permission-icon ' + icon + '" /></center>';
	},
	
	formatDate	: function(value){
		if(value.date == undefined) {
			return value;
		} else {
			var dt = new Date(value.date);
			return Ext.Date.format(dt,'d/m/Y');
		}
	}
});