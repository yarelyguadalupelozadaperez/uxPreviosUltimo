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
Ext.define('Ext.ux.SistemasCasa.view.GridAbstract', {
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
	store: [],
	//alias: "widget.clientreportgrid",
	border: false,
	layout: 'fit',
	anchor: '100%',
	stateful: false,
	autoScroll: true,
	loadingMask: true,
        autoLoad: true,
        
	initComponent	: function() {
		var me = this;
		
		if(this.editable){
			me.plugins = [Ext.create("Ext.grid.plugin.RowEditing")];
		}
//		me.columns = [
//                    Ext.create('Ext.grid.RowNumberer',({width: 50})),
//                    {header:"Nombre, Raz\u00f3n Social de Almacenadora", width: 260, dataIndex:"NOMBRE", hidden: false},
//                    {header:"RFC Almacenadora", width: 145, dataIndex:"RFC", hidden: false},
//                    {header:"Patente AGD", width: 105, dataIndex:"PATENTE", hidden: false},
//                    {header:"Vigencia patente", width: 125,dataIndex:"VIGENCIA",renderer: this.formatDate, hidden: false,allowBlank: false},
//                    {header: "Inicio patente", width: 125, dataIndex: "INICIO", renderer: this.formatDate, hidden: true,allowBlank: false},
//                    {header:"Clave de aduana de circunscripci\u00f3n", width: 235, dataIndex:"ADUANA", hidden: false},
//                    {header:"Clave de unidad autorizada SIDEFI", width: 235, dataIndex:"SIDEFI", hidden: false},
//                    {header:"Nombre, Raz\u00f3n social del cliente", width: 225, dataIndex:"RAZ_SOC", hidden: false},
//                    {header:"RFC Cliente", width: 100, dataIndex:"RFC1", hidden: false},
//                    {header:"Servicios adicionales al dep\u00f3sito fiscal", width: 270, dataIndex:"VAL_SN", hidden: false}
//		];
	
                    me.callParent();
                    /**
                    * @function formatDate
                    * @description This method formats the field values Date
                    * @returns {value}
                    */
                }
	
});
