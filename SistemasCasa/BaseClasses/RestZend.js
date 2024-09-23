/**
 * Zend Rest Proxy for Extjs 5.1
 * Based on :
 * @see: http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.proxy.Rest
 */
Ext.define('Ext.ux.SistemasCasa.BaseClasses.RestZend', {
    extend: 'Ext.data.proxy.Ajax',
    alias : 'proxy.zest',

    /**
     * @cfg {Boolean} appendId True to automatically append the ID of a Model instance when performing a request based
     * on that single instance. See RestProxy intro docs for more details. Defaults to true.
     */
    appendId: true,
    
    /**
     * @cfg {Boolean} batchActions True to batch actions of a particular type when synchronizing the store.
     * Defaults to <tt>false</tt>.
     */
    batchActions: false,
    
    config: {
    	actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'PUT',
            destroy: 'DELETE'
        }
    },
  
    /**
     */
    buildUrl: function(request) {
        var me        = this,
            operation = request.config.operation,
            records   = operation.config.records || [],
            record    = records[0],
            format    = me.format,
            reqParams = request.params,
            url       = me.getUrl(request),
            id        = record ? record.getId() : operation.id;
            
        if (me.appendId && id) {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            
            url += 'id/' + id;
        }
        
        if (format) {
            reqParams['format'] = format;
        }

        request.url = url;
        
        return me.callParent(arguments);
    }
        
}, function() {
    Ext.apply(this.prototype, {
        /**
         * Mapping of action name to HTTP request method. These default to RESTful conventions for the 'create', 'read',
         * 'update' and 'destroy' actions (which map to 'POST', 'GET', 'PUT' and 'DELETE' respectively). This object should
         * not be changed except globally via {@link Ext#override Ext.override} - the {@link #getMethod} function can be overridden instead.
         * @property actionMethods
         * @type Object
         */
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'PUT',
            destroy: 'DELETE'
        }
    });
});