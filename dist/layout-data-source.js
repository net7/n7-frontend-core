var LayoutDataSource = /** @class */ (function () {
    function LayoutDataSource() {
    }
    LayoutDataSource.prototype.getWidgetById = function (widgetId) {
        return this.widgets[widgetId] || null;
    };
    LayoutDataSource.prototype.one = function (widgetId) {
        this.selectedWidgets = [widgetId];
        return this;
    };
    LayoutDataSource.prototype.some = function (widgetsId) {
        this.selectedWidgets = widgetsId;
        return this;
    };
    LayoutDataSource.prototype.all = function () {
        this.selectedWidgets = Object.keys(this.widgets);
        return this;
    };
    LayoutDataSource.prototype.exclude = function (widgetsId) {
        var allWidgets = Object.keys(this.widgets);
        this.selectedWidgets = allWidgets.filter(function (widgetId) { return widgetsId.indexOf(widgetId) === -1; });
        return this;
    };
    LayoutDataSource.prototype.filter = function (func) {
        var allWidgets = Object.keys(this.widgets);
        this.selectedWidgets = allWidgets.filter(func);
        return this;
    };
    LayoutDataSource.prototype.update = function (data) {
        var _this = this;
        if (!this.selectedWidgets) {
            throw Error('no widgets selected');
        }
        this.selectedWidgets.forEach(function (widgetId) {
            var widget = _this.getWidgetById(widgetId);
            if (widget)
                widget.ds.update(data);
        });
        // reset selected
        this.selectedWidgets = null;
    };
    LayoutDataSource.prototype.updateOptions = function (options) {
        var _this = this;
        if (!this.selectedWidgets) {
            throw Error('no widgets selected');
        }
        this.selectedWidgets.forEach(function (widgetId) {
            var widget = _this.getWidgetById(widgetId);
            if (widget)
                widget.ds.options = options;
        });
        // reset selected
        this.selectedWidgets = null;
    };
    return LayoutDataSource;
}());
export { LayoutDataSource };
//# sourceMappingURL=layout-data-source.js.map