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

Ext.define('Ext.ux.SistemasCasa.BaseClasses.MessageBox',{
	extend 				: 'Ext.window.MessageBox',
	alternateClassName	: 'SistemasCasa.Msg',
	
	/**
	 * This method creates a alert message box
	 */
	alert	: function(message){
		this.show({
			title	: Ext.SistemasCasa.Msg.ALERT_TITLE,
			modal	: true,
			icon	: Ext.Msg.WARNING,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	/**
	 * This method creates a info message box
	 */
	info	: function(message){
		this.show({
			title	: Ext.SistemasCasa.Msg.INFO_TITLE,
			modal	: true,
			icon	: Ext.Msg.INFO,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	/**
	 * This method creates a error message box
	 */
	error	: function(message){
		this.show({
			title	: Ext.SistemasCasa.Msg.ERROR_TITLE,
			modal	: true,
			icon	: Ext.Msg.ERROR,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	/**
	 * This method creates a warning message box
	 */
	warning	: function(message){
		this.show({
			title	: Ext.SistemasCasa.Msg.WARNING_TITLE,
			modal	: true,
			icon	: Ext.Msg.WARNING,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	/**
	 * This method creates a confirm message box
	 */
	confirm	: function(message,callback,scope){
		this.show({
			title	: Ext.SistemasCasa.Msg.CONFIRM_TITLE,
			modal	: true,
			icon	: Ext.Msg.QUESTION,
			buttons	: Ext.Msg.YESNO,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	}
	
});