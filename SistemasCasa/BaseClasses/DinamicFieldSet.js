/**
 * @class Ext.ux.SistemasCasa.BaseClasses.MessageBox
 * @extends Ext.Msg
 * @autor Crysfel Villa
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Base class for MessageBox
 *
 *
 **/

Ext.define('Ext.ux.SistemasCasa.BaseClasses.DinamicFieldSet',{
	extend 				: 'Ext.form.FieldSet',
	alternateClassName	: 'SistemasCasa.DinamicFieldSet',
	alias				: 'widget.dinamicfieldset',
	requires: [
	           "Ext.ux.SistemasCasa.BaseClasses.GridFieldSet"
    ],
    title: null,
    newTitle: null,
    originalTitle: null,
    collapsible: true,
    width: '100%',
    height: 300,
    padding: "0 0 0 0",
    autoScroll: true,
    hidden: false,
    layout: 'fit',
    itemId : 'dinamicfieldset',
    grids: [],
    configGrid: {},
    
    initComponent	: function() {
        var me = this;
        me.originalTitle = me.title;
        me.newTitle = '<b><font size = 2, color="#054059"> ' + me.title + ' </font></b>';
        
        var grid = Ext.create('Ext.ux.SistemasCasa.BaseClasses.GridFieldSet', me.configGrid);
        
        me.items = [grid];
        
		me.callParent();
    },

	
});
