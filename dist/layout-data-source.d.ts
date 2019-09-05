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
export declare abstract class LayoutDataSource {
    widgets: any[];
    private selectedWidgets;
    /**
     * gets widget by id
     *
     * @private
     * @param {string} widgetId
     * @returns widget | null
     * @memberof LayoutDataSource
     */
    private getWidgetById;
    /**
     * gets widget DataSource
     *
     * @param {string} widgetId
     * @returns datasource | null
     * @memberof LayoutDataSource
     */
    getWidgetDataSource(widgetId: string): any;
    /**
     * gets widget EventHandler
     *
     * @param {string} widgetId
     * @returns eventhandler | null
     * @memberof LayoutDataSource
     */
    getWidgetEventHandler(widgetId: string): any;
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
    one(widgetId: string): this;
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
    some(widgetsId: string[]): this;
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
    all(): this;
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
    exclude(widgetsId: string[]): this;
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
    filter(func: any): this;
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
    update(data: any): void;
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
    updateOptions(options: any): void;
}
