/**
 * @file This file configs titles class store
 * @class Administrator.modules.catalogs.articles.store.Titles
 * @classdesc   This class stores the data of the Titles from database
 * @author      Tuxs Team
 * @copyright  	Copyright (c) 2005-2013 Sistemas CASA, S.A. de C.V. sistemascasa.com.mx
 * @license     http://framework.zend.com/license   BSD License
 * @link        http://www.sistemacasas.com.mx/
 * @extends     Ext.data.Store
 * @since       1.0.0 First time this was introduced.
 * @version     administrator 1.0.0
 */
Ext.define("Ext.ux.SistemasCasa.store.Store",{
    extend: "Ext.data.Store",
    autoLoad	: false,
    
    proxy: {
        type: 'ajax',
        reader: {
            type: "json",
            root: "data",
            sucessProperty: 'success',
            totalProperty: 'total'
        }
    }  
	
});