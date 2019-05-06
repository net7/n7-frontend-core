import { Subject, merge } from "rxjs";
var LayoutBuilder = /** @class */ (function () {
    function LayoutBuilder(layoutId) {
        this.widgets = {};
        this.on$ = new Subject();
        this.out$ = new Subject();
        this.ready$ = new Subject();
        this.id = layoutId;
    }
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
    LayoutBuilder.prototype.attachLayoutEvents = function () {
        var _this = this;
        var outs$ = Object.keys(this.widgets)
            .map(function (widgetId) { return _this.widgets[widgetId]; })
            .filter(function (widget) { return !!widget.eh; })
            .map(function (widget) { return widget.eh.out$; });
        this.eventHandler.outerEvents$ = merge.apply(void 0, outs$);
        this.eventHandler.listen();
    };
    LayoutBuilder.prototype.attachWidgetEvents = function (widgetEventHandler) {
        widgetEventHandler.outerEvents$ = this.eventHandler.out$;
        widgetEventHandler.listen();
    };
    LayoutBuilder.prototype.getWidgetId = function (widget) {
        return widget.id;
    };
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
    LayoutBuilder.prototype.getWidgetBaseClass = function (widgetId) {
        var _this = this;
        return widgetId.split('-').map(function (word) { return _this._ucFirst(word); }).join('');
    };
    LayoutBuilder.prototype._ucFirst = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
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