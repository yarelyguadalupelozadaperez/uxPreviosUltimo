/**
 * A GridPanel class with live search support.
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


Ext.define('Ext.ux.SistemasCasa.BaseClasses.LiveSearchGrid', {
    extend: 'Ext.grid.Panel',
    alternateClassName	: 'SistemasCasa.LiveSearchGrid',
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.ux.statusbar.StatusBar',
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
     * @private
     * search value initialization
     */
    searchValue: null,
    
    /**
     * @private
     * The matched positions from the most recent search
     */
    matches: [],
    
    /**
     * @private
     * The current index matched.
     */
    currentIndex: null,
    
    /**
     * @private
     * The generated regular expression used for searching.
     */
    searchRegExp: null,
    
    /**
     * @private
     * Case sensitive mode.
     */
    caseSensitive: false,
    
    /**
     * @private
     * Regular expression mode.
     */
    regExpMode: false,
    
    /**
     * @cfg {String} matchCls
     * The matched string css classe.
     */
    matchCls: 'x-livesearch-match',
    
    defaultStatusText: Ext.SistemasCasa.LiveSearchGrid.DEFAULT_STATUS_TEXT,
    
    // Component initialization override: adds the top and bottom toolbars and setup headers renderer.
    initComponent: function() {
        var me = this;
        
        if(this.editable){
			this.editing = Ext.create('Ext.grid.plugin.CellEditing');
			me.plugins = [this.editing];
		}
        
        me.tbar = [Ext.SistemasCasa.LiveSearchGrid.SEARCH, {
             xtype: 'textfield',
             name: 'searchField',
             enableKeyEvents: true,
             hideLabel: true,
             width: 200,
             listeners: {
            	 keydown: {
                     fn: me.onTextFieldChange,
                     scope: this,
                     buffer: 1000
                 }
             }
        }, {
            xtype: 'button',
            text: '&lt;',
            tooltip: Ext.SistemasCasa.LiveSearchGrid.PREVIOS_ROW,
            handler: me.onPreviousClick,
            scope: me
        },{
            xtype: 'button',
            text: '&gt;',
            tooltip: Ext.SistemasCasa.LiveSearchGrid.NEXT_ROW,
            handler: me.onNextClick,
            scope: me
        }];

        me.bbar = new Ext.ux.StatusBar({
            defaultText: me.defaultStatusText,
            name: 'searchStatusBar'
        });
        
        me.callParent(arguments);
    },
    
    // afterRender override: it adds textfield and statusbar reference and start monitoring keydown events in textfield input 
    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.textField = me.down('textfield[name=searchField]');
        me.statusBar = me.down('statusbar[name=searchStatusBar]');

        me.view.on('cellkeydown', me.focusTextField, me);
    },

    focusTextField: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (e.getKey() === e.S) {
            e.preventDefault();
            this.textField.focus();
        }
    },

    // detects html tag
    tagsRe: /<[^>]*>/gm,
    
    // DEL ASCII code
    tagsProtect: '\x0f',
    
    /**
     * In normal mode it returns the value with protected regexp characters.
     * In regular expression mode it returns the raw value except if the regexp is invalid.
     * @return {String} The value to process or null if the textfield value is blank or invalid.
     * @private
     */
    getSearchValue: function() {
        var me = this,
            value = me.textField.getValue();
            
        if (value === '') {
            return null;
        }
        if (!me.regExpMode) {
            value = Ext.String.escapeRegex(value);
        } else {
            try {
                new RegExp(value);
            } catch (error) {
                me.statusBar.setStatus({
                    text: error.message,
                    iconCls: 'x-status-error'
                });
                return null;
            }
            // this is stupid
            if (value === '^' || value === '$') {
                return null;
            }
        }

        return value;
    },
    
    /**
     * Finds all strings that matches the searched value in each grid cells.
     * @private
     */
     onTextFieldChange: function() {
         var me = this,
             count = 0,
             view = me.view,
             cellSelector = view.cellSelector,
             innerSelector = view.innerSelector,
             columns = me.visibleColumnManager.getColumns();

         // reset the statusbar
         me.statusBar.setStatus({
             text: me.defaultStatusText,
             iconCls: ''
         });

         me.searchValue = me.getSearchValue();
         me.matches = [];
         me.currentIndex = null;
         if (me.searchValue !== null) {
             me.store.each(function(record, idx) {
                var node = me.getView().getNode(record);
                if (node) {
                    Ext.Array.forEach(columns, function(column) {
                        var cell = Ext.fly(node).down(column.getCellInnerSelector(), true),
                            matches, cellHTML = null,
                            seen = false;

                        if (cell) {
                            matches = cell.innerHTML.match(me.tagsRe);
                            cellHTML = cell.innerHTML.replace(me.tagsRe, me.tagsProtect);
                            
                            me.searchRegExp = new RegExp(me.getSearchValue(), 'g' + (me.caseSensitive ? '' : 'i'));
                            // populate indexes array, set currentIndex, and replace wrap matched string in a span
                            cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                            	
                                ++count;
                                me.matches.push({
                                    record: record,
                                    column: column
                                });
                                return '<span class="' + me.matchCls + '">' + m + '</span>';
                            }, me);
                            
                            // update cell html
                            //cell.innerHTML = cellHTML;
                        }
                    });
                    
                    me.searchRegExp = null;
                }
             }, me);
             
             // results found
             if (count) {
                me.currentIndex = 0;
                me.gotoCurrent();
                me.statusBar.setStatus({
                    text: Ext.String.format('{0} resultado{1} encontrado{1}.', count, count === 1 ? '' : 's'),
                    iconCls: 'x-status-valid'
                });
             }
         }

         // no results found
         if (me.currentIndex === null) {
             me.getSelectionModel().deselectAll();
             me.textField.focus();
         }
     },
    
    /**
     * Selects the previous row containing a match.
     * @private
     */   
    onPreviousClick: function() {
        var me = this,
            matches = me.matches,
            len = matches.length,
            idx = me.currentIndex;

        if (len) {
            me.currentIndex = idx === 0 ? len - 1 : idx - 1;
            me.gotoCurrent();
        }
    },
    
    /**
     * Selects the next row containing a match.
     * @private
     */    
    onNextClick: function() {
        var me = this,
            matches = me.matches,
            len = matches.length,
            idx = me.currentIndex;

        if (len) {
            me.currentIndex = idx === len - 1 ? 0 : idx + 1;
            me.gotoCurrent();
        }
    },
    
    /**
     * Switch to case sensitive mode.
     * @private
     */    
    caseSensitiveToggle: function(checkbox, checked) {
        this.caseSensitive = checked;
        this.onTextFieldChange();
    },
    
    /**
     * Switch to regular expression mode
     * @private
     */
    regExpToggle: function(checkbox, checked) {
        this.regExpMode = checked;
        this.onTextFieldChange();
    },

    privates: {
        gotoCurrent: function() {
            var pos = this.matches[this.currentIndex];
            this.getNavigationModel().setPosition(pos.record, pos.column);
            this.getSelectionModel().select(pos.record);
        }
    }
});