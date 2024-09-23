/**
 * @file This file contains some methods that provides functionality to abstract Controller 
 * File Controller.js
 * @class AdminWeb.abstract.Controller
 * @classdesc Basic controller, this class set the handlers to the default buttons in
 * the topbar of each class that extends from AdminWeb.abstract.Viewport, this class
 * also override the "control" method to add the "id" of the window.
 * @extends Ext.app.Controller
 * @author      Team Tuxs
 * @copyright  	Copyright (c) 2005-2013 Sistemas CASA, S.A. de C.V. sistemascasa.com.mx
 * @license     http://framework.zend.com/license   BSD License
 * @link        http://www.sistemacasas.com.mx/
 * @since       1.0.0 First time this was introduced.
 * @version     administrator 1.0.0
 */

Ext.define("Ext.ux.SistemasCasa.sicereports.controller.Controller",{
	extend		: "Ext.app.Controller",
        
/**
 * @function    init
 * @description This method starts the events class
 * @returns     undefined
**/
    init: function() {
        this.control({
            'principalmenu': {
                itemclick: this.addTab
            }
        });
    },
    /**
     * @function    addTab
     * @description This method adds a new tab with Secundary Menu
     * @param       object t, record, array item, integer index
     * @returns     undefined
    **/ 
    excel: function(){
        
    },
    
    /**
     * @function    addTab
     * @description This method adds a new tab with Secundary Menu
     * @param       object t, record, array item, integer index
     * @returns     undefined
    **/ 
    pdf: function(){
        console.log("Estoy en el boton pdf usuario");
    },
          /**
     * @function    addTab
     * @description This method adds a new tab with Secundary Menu
     * @param       object t, record, array item, integer index
     * @returns     undefined
    **/ 
    addTab: function(t, record, item, index) {
        
    }
    
    });