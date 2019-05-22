/**
 * base abstract class for layout datasources
 *
 * implementation example:
 * ```ts
 * import { LayoutDataSource, ApiRequest } from '@n7-frontend/core';
 *
 * export class LayoutDS extends LayoutDataSource {
 *   private http: any;
 *
 *   // custom method
 *   // can be called/triggered by layout's eventhandler
 *   onInit(payload){
 *     //...
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
     * use example:
     *
     * ```ts
     * this.one('test').update({value: 'hello world!'});
     * ```
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
     * use example:
     *
     * ```ts
     * this.some(['test1', 'test2']).update({value: 'hello world!'});
     * ```
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
     * use example:
     *
     * ```ts
     * this.all().update({value: 'hello world!'});
     * ```
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
     * excluding the ones on `widgetsId` array param
     *
     * use example:
     *
     * ```ts
     * // updates all except test3 & test4
     * this.exclude(['test3', 'test4']).update({value: 'hello world!'});
     * ```
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
     * via custom array filter function
     *
     * use example:
     *
     * ```ts
     * // updates all widgets that contains the string "test"
     * // in the widgetId string
     * this.filter((widgetId) => widgetId.indexOf('test') !== -1).update({value: 'hello world!'});
     * ```
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
     * update each DataSource of the previous selected widgets
     *
     * for more info see:
     * - {@link LayoutDataSource.one}
     * - {@link LayoutDataSource.some}
     * - {@link LayoutDataSource.all}
     * - {@link LayoutDataSource.exclude}
     * - {@link LayoutDataSource.filter}
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
     * update each DataSource "options" of the previous selected widgets
     *
     * for more info see:
     * - {@link LayoutDataSource.one}
     * - {@link LayoutDataSource.some}
     * - {@link LayoutDataSource.all}
     * - {@link LayoutDataSource.exclude}
     * - {@link LayoutDataSource.filter}
     *
     * use example:
     *
     * ```ts
     * this.one('test').updateOptions({ uppercase: true });
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