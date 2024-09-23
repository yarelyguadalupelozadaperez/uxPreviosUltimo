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

Ext.define("Ext.ux.SistemasCasa.BaseClasses.EditLiveSearchGrid",{
    extend: 'Ext.ux.SistemasCasa.BaseClasses.LiveSearchGrid',
	
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
	
	border		: true,
	editable	: true,
	anchor		: '100%',
	stateful	: false,
	autoScroll	: true,
	loadingMask	: true,	
	
	listeners: {
		edit: function (editor, e) {
			var me = this;
			me.store.sync();
		},
		
		beforeedit: function (editor, context, eOpts) {
			if (context.column.disabled) {
				return false;
			}
		}
	},
	
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