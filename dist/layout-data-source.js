/**
 * base abstract class for layout datasources
 *
 * implementation example:
 * ```
 * import { LayoutDataSource, ApiRequest } from '@dataviz/core';
 *
 * export class LayoutDS extends LayoutDataSource {
 *   private http: any;
 *
 *   // custom method
 *   // can be called/triggerd by layout's eventhandler
 *   onInit(payload){
 *     this.http = payload.http;
 *
 *     const request$ = new ApiRequest(
 *       <any>this.http.get("https://jsonplaceholder.typicode.com/posts")
 *     );
 *
 *     request$.out$.subscribe(v => this.one('test').update(v));
 *
 *     request$.run();
 *   }
 * }
 * ```
 *
 * @export
 * @abstract
 * @class LayoutDataSource
 */
var LayoutDataSource = /** @class */ (function () {
    function LayoutDataSource() {
    }
    /**
     * gets widget by id
     *
     * @private
     * @param {string} widgetId
     * @returns widget | null
     * @memberof LayoutDataSource
     */
    LayoutDataSource.prototype.getWidgetById = function (widgetId) {
        return this.widgets[widgetId] || null;
    };
    /**
     * sets one widget to widgets group
     *
     * @param {string} widgetId
     * @returns instance
     * @memberof LayoutDataSource
     */
    LayoutDataSource.prototype.one = function (widgetId) {
        this.selectedWidgets = [widgetId];
        return this;
    };
    /**
     * sets some widgets to widgets group
     *
     * @param {string[]} widgetsId
     * @returns instance
     * @memberof LayoutDataSource
     */
    LayoutDataSource.prototype.some = function (widgetsId) {
        this.selectedWidgets = widgetsId;
        return this;
    };
    /**
     * sets all widgets to widgets group
     *
     * @returns instance
     * @memberof LayoutDataSource
     */
    LayoutDataSource.prototype.all = function () {
        this.selectedWidgets = Object.keys(this.widgets);
        return this;
    };
    /**
     * sets all widgets to widgets group
     * excluding the ones on widgetsId
     *
     * @param {string[]} widgetsId widgets to exclude
     * @returns instance
     * @memberof LayoutDataSource
     */
    LayoutDataSource.prototype.exclude = function (widgetsId) {
        var allWidgets = Object.keys(this.widgets);
        this.selectedWidgets = allWidgets.filter(function (widgetId) { return widgetsId.indexOf(widgetId) === -1; });
        return this;
    };
    /**
     * sets widgets to widgets group
     * via custom filter function
     *
     * @param {*} func
     * @returns instance
     * @memberof LayoutDataSource
     */
    LayoutDataSource.prototype.filter = function (func) {
        var allWidgets = Object.keys(this.widgets);
        this.selectedWidgets = allWidgets.filter(func);
        return this;
    };
    /**
     * update datasource of the previous selected widgets
     *
     * example:
     * ```
     * layoutBuilder.dataSource
     *  .one('test') // selects widget first
     *  .update({value: 'hello world!'}) // update selected widget datasource
     *
     * layoutBuilder.dataSource
     *  .some(['test1', 'test2']) // selects widgets first
     *  .update({value: 'hello world!'}) // update selected widgets datasource
     * ```
     *
     * @param {*} data
     * @returns instance
     * @memberof LayoutDataSource
     */
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
    /**
     * update datasource "options" of the previous selected widgets
     *
     * example:
     * ```
     * layoutBuilder.dataSource
     *  .one('test') // selects widget first
     *  .updateOptions({ uppercase: true }) // update selected widget datasource options
     *
     * layoutBuilder.dataSource
     *  .some(['test1', 'test2']) // selects widgets first
     *  .updateOptions({ uppercase: true }) // update selected widgets datasource options
     * ```
     *
     * @param {*} options
     * @returns instance
     * @memberof LayoutDataSource
     */
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