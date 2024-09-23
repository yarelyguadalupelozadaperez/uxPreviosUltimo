/**
 * @file This file does configs to  Users Grid class
 * @class Administrator.modules.catalogs.ctarnetusers.view.UsersGrid
 * @author      Tux's Team
 * @copyright  	Copyright (c) 2005-2013 Sistemas CASA, S.A. de C.V. sistemascasa.com.mx
 * @license     http://framework.zend.com/license   BSD License
 * @link        http://www.sistemacasas.com.mx/
 * @extends     Ext.ux.LiveSearchGridPanel
 * @alias       widget.usersgrid
 * @requires    Administrator.modules.catalogs.ctarnetusers.model.User
 * @requires    Administrator.modules.catalogs.ctarnetusers.store.Users
 * @alias       widget.modulesgrid
 * @since       1.0.0 First time this was introduced.
 * @version     administrator 1.0.0
 */


/**
 * Overriding the Ext.ZIndexManager class
 */
Ext.override(Ext.grid.Scroller, {
    
    onAdded: function() {
        this.callParent(arguments);
        var me = this;
        if (me.scrollEl) {
            me.mun(me.scrollEl, 'scroll', me.onElScroll, me);
            me.mon(me.scrollEl, 'scroll', me.onElScroll, me);
        }
    }
});

Ext.define("Ext.ux.SistemasCasa.grid.EditableNormsGrid", {
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
        'Ext.ux.CheckColumn',
        'Ext.grid.property.Grid',
        'Ext.form.field.ComboBox'
    ],
    actionsUrl: null,
    schema: 0,
    table: 0,
    editable: true,
    layout: 'fit',
    stateful: false,
    loadingMask: true,
    border: false,
    
    /**
     * @function initComponent
     * @description This function does a Component Startup
     * @returns undefined
     */
    
    initComponent: function () {
        var me = this;
        var columns = me.columns;
        var data = Array ();
        var fields = [];
        var text = "";
        
        Ext.each(columns,function(column, index){
            var dataField = Object ();
            if(!column.hidden) {
                dataField["text"] = column.header;
                dataField["field"] = column.dataIndex;
                data.push(dataField);
            }
        });
        
        var store = null;
        
        store = Ext.create('Ext.data.Store', {
            fields: ['text', 'field'],
            data : data
        });
        
        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                id: "pagingtoolbar" + me.alias,
                store: this.store,
                dock: 'bottom',
                displayInfo: true
            },{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        xtype: 'tbspacer'
                    },{
                        xtype: 'label',
                        text: 'Columnas: '
                    },{
                        xtype: 'tbspacer',
                        width: 9
                    },{
                        xtype: 'combo',
                        store: store,
                        queryMode: 'local',
                        displayField: 'text',
                        valueField: 'field',
                        multiSelect : true,
                        emptyText: 'Selecciona los campos',
                        width: 200,
                        forceSelection: true
                    },{
                        xtype: 'tbspacer'
                    },{
                        xtype: 'label',
                        text: 'Texto: '
                    },{
                        xtype: 'textfield',
                        width: 200
                    },{
                        xtype: 'tbspacer'
                    },{
                        xtype: 'button',
                        action: 'filter',
                        tooltip: 'Realizar b&uacute;squeda',
                        cls: 'search-mini-icon-16'
                    },{
                        xtype: 'button',
                        action: 'clean',
                        tooltip: 'Limpiar campos',
                        cls: 'reloader-mini-icon-16'
                    }
                ]},
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Actualizaci\u00f3n:'
                        },{
                            xtype: 'combo',
                            store: store,
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'field',
                            emptyText: 'Selecciona los campos',
                            width: 200,
                            forceSelection: true
                        },{
                            xtype: 'tbspacer'
                        },{
                            xtype: 'label',
                            text: 'Texto: '
                        },{
                            xtype: 'textfield',
                            width: 200
                        }
                ]}
            
        ];
        
        me.callParent();
        
        me.getStore().getProxy().url = me.actionsUrl + 'getdataview';
        me.getStore().getProxy().extraParams.schema = me.schema;
        me.getStore().getProxy().extraParams.table = me.table;
     
        me.getStore().load();
    }
        
});


