/**
 * @file        THis fail contain the add classifications
 * File         AddClassificationsPanel.js
 * @class       EDespacho.modules.catalogs.classifications.view.AddClassificationsPanel.js
 * @classdesc   AddClassificationsPanel view class
 * @author      Yarely Guadalupe Lozada Pérez
 * @copyright  	Copyright (c) 2016 Sistemas CASA, S.A. de C.V. sistemascasa.com.mx
 * @licence     http://framework.zend.com/license   BSD License
 * @link        http://www.sistemacasas.com.mx/
 * @extends     Ext.window.Window
 * @requires    Ext.define
 * @since       1.0.0 First time this was introduced.
 * @version     e-Despacho 1.0.0
**/

Ext.define("Ext.ux.SistemasCasa.BaseClasses.FieldsetGrid", {
    extend: 'Ext.form.Panel',
    frame: false,
    bodyPadding: 5,
    autoScroll: false,
    width: '100%',
    minSize: '100%',
    maxSize: '100%',
    layout: 'column',
    alias: "widget.fieldsetgrid",
    border: false,
    id: 'fieldsetgrid',
    itemId: 'fieldsetgrid',
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 115,
        width: '100%',
        minSize: '100%',
        maxSize: '100%'
    },

    /**
    * @function    initComponent
    * @description this function gives the available tags which are shown in the searching grid
    * @returns     undefined
    **/
    initComponent: function () {

        
        this.items = [{
            columnWidth: 1,
            xtype: 'fieldset',
            id: 'idprueba',
            title: '<b><font size = 2, color="#7f7f7f">Prueba</font></b>',
            collapsible: true,
            width: '100%',
            height: 300,
            padding: 5,
            autoScroll: true,
            hidden: false,
            layout: {
                type: 'fit'
            },
            defaults: {
                width: '100%'
            },
            style: {
                borderWidth: '1px', 
            }
        }];
        
        this.callParent();
    }
});
