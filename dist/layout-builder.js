import { Subject, merge } from "rxjs";
/**
 * base class to build components datasource/eventhandlers connections
 * on app layouts
 *
 * example:
 * ```ts
 * export class LayoutComponent implements OnInit {
 *   public lb = new LayoutBuilder('layout-id');
 *   private widgets = [
 *     { id: 'test1' },
 *     { id: 'test2' },
 *   ];
 *
 *   constructor(){}
 *
 *   ngOnInit(){
 *     // on ready
 *     this.lb.ready$.subscribe(() => {
 *       // on ready can emit inner events
 *       // useful for passing aditional layout parameters
 *       // to layout EventHandler / DataSource
 *       this.lb.eventHandler.emitInner('init', {'hello': 'world'});
 *     });
 *
 *     this.lb.init({
 *       widgetsConfig: this.widgets,
 *       widgetsDataSources: DS, // components datasource classes
 *       widgetsEventHandlers: EH, // components eventhandler classes
 *       dataSource: new LayoutDS(), // layout datasource
 *       eventHandler: new LayoutEH(), // layout eventhandler
 *     });
 *   }
 * }
 * ```
 *
 * @export
 * @class LayoutBuilder
 */
var LayoutBuilder = /** @class */ (function () {
    function LayoutBuilder(layoutId) {
        this.widgets = {};
        this.on$ = new Subject();
        this.out$ = new Subject();
        this.ready$ = new Subject();
        this.id = layoutId;
    }
    /**
     * inits connection build on:
     *
     * - each component/widget with EventHandler/DataSource
     * - layout internal EventHandler/DataSource
     *
     * @param {// types
     *     {
     *       widgetsConfig: IWidgetConfig[],
     *       widgetsDataSources: any,
     *       widgetsEventHandlers: any,
     *       dataSource?: any,
     *       eventHandler?: IEventHandler
     *     }} {widgetsConfig, widgetsDataSources, widgetsEventHandlers, dataSource, eventHandler}
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.init = function (_a) {
        var _this = this;
        var widgetsConfig = _a.widgetsConfig, widgetsDataSources = _a.widgetsDataSources, widgetsEventHandlers = _a.widgetsEventHandlers, dataSource = _a.dataSource, eventHandler = _a.eventHandler;
        // layout setup
        // ------------------------------------------------------------->
        this.eventHandler = eventHandler;
        this.dataSource = dataSource;
        // add host id
        this.eventHandler.hostId = this.id;
        // add datasource to eventhandler
        if (dataSource && eventHandler) {
            this.eventHandler.dataSource = dataSource;
        }
        // widgets setup
        // ------------------------------------------------------------->
        this.widgetsDataSources = widgetsDataSources;
        this.widgetsEventHandlers = widgetsEventHandlers;
        widgetsConfig.forEach(function (widgetConfig) {
            var id = _this.getWidgetId(widgetConfig), ds = _this.getWidgetDataSource(widgetConfig), eh = _this.getWidgetEventHandler(widgetConfig);
            var emit = null;
            if (eh) {
                // add host id
                eh.hostId = id;
                // attach events
                _this.attachWidgetEvents(eh);
                // add datasource to eventhandler
                eh.dataSource = ds;
                emit = function (type, payload) { return eh.emitInner(type, payload); };
            }
            _this.widgets[id] = { id: id, ds: ds, eh: eh, emit: emit };
        });
        // attach events
        this.attachLayoutEvents();
        // add widgets config to layout datasource
        if (this.dataSource) {
            this.dataSource['widgets'] = this.widgets;
        }
        // on ready
        this.ready$.subscribe(function () { return _this._onReady(); });
        // emit ready
        this.ready$.next();
    };
    /**
     * connect component/widget events to layout eventhandler
     *
     * @private
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.attachLayoutEvents = function () {
        var _this = this;
        var outs$ = Object.keys(this.widgets)
            .map(function (widgetId) { return _this.widgets[widgetId]; })
            .filter(function (widget) { return !!widget.eh; })
            .map(function (widget) { return widget.eh.out$; });
        this.eventHandler.outerEvents$ = merge.apply(void 0, outs$);
        this.eventHandler.listen();
    };
    /**
     * connect layout events to component/widget eventhandler
     *
     * @private
     * @param {*} widgetEventHandler
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.attachWidgetEvents = function (widgetEventHandler) {
        widgetEventHandler.outerEvents$ = this.eventHandler.out$;
        widgetEventHandler.listen();
    };
    /**
     *  gets widget id
     *
     * @private
     * @param {*} widget widget config
     * @returns {string} widgetId
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.getWidgetId = function (widget) {
        return widget.id;
    };
    /**
     * gets widget DataSource
     *
     * @private
     * @param {*} widget
     * @returns {IDataSource | null}
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.getWidgetDataSource = function (widget) {
        var dataSource;
        if (widget.dataSource) {
            dataSource = new widget.dataSource(widget.options || {});
        }
        else {
            var widgetId = this.getWidgetId(widget), widgetClass = this.getWidgetBaseClass(widgetId), dataSourceClass = widgetClass + "DS";
            dataSource = this.widgetsDataSources[dataSourceClass] ? new this.widgetsDataSources[dataSourceClass]() : null;
        }
        return dataSource;
    };
    /**
     * gets widget EventHandler
     *
     * @private
     * @param {*} widget
     * @returns {IEventHandler | null}
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.getWidgetEventHandler = function (widget) {
        var eventHandler;
        if (widget.eventHandler) {
            eventHandler = new widget.eventHandler();
        }
        else {
            var widgetId = this.getWidgetId(widget), widgetClass = this.getWidgetBaseClass(widgetId), eventHandlerClass = widgetClass + "EH";
            eventHandler = this.widgetsEventHandlers[eventHandlerClass] ? new this.widgetsEventHandlers[eventHandlerClass]() : null;
        }
        return eventHandler;
    };
    /**
     * gets widget class name
     *
     * @private
     * @param {*} widgetId
     * @returns {string} widget class name
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype.getWidgetBaseClass = function (widgetId) {
        var _this = this;
        return widgetId.split('-').map(function (word) { return _this._ucFirst(word); }).join('');
    };
    /**
     * uppercase first char internal utility
     *
     * @private
     * @param {string} str
     * @returns {string}
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype._ucFirst = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    /**
     * triggered on ready$
     * for internal functionality
     *
     * @private
     * @memberof LayoutBuilder
     */
    LayoutBuilder.prototype._onReady = function () {
        var _this = this;
        // trigger update for widgets
        // w/initial data
        Object.keys(this.widgets).forEach(function (id) { return _this.widgets[id].ds.update(); });
    };
    return LayoutBuilder;
}());
export { LayoutBuilder };
//# sourceMappingURL=layout-builder.js.map