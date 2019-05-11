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
     * sets one widget to widgets group
     *
     * @param {string} widgetId
     * @returns instance
     * @memberof LayoutDataSource
     */
    one(widgetId: string): this;
    /**
     * sets some widgets to widgets group
     *
     * @param {string[]} widgetsId
     * @returns instance
     * @memberof LayoutDataSource
     */
    some(widgetsId: string[]): this;
    /**
     * sets all widgets to widgets group
     *
     * @returns instance
     * @memberof LayoutDataSource
     */
    all(): this;
    /**
     * sets all widgets to widgets group
     * excluding the ones on widgetsId
     *
     * @param {string[]} widgetsId widgets to exclude
     * @returns instance
     * @memberof LayoutDataSource
     */
    exclude(widgetsId: string[]): this;
    /**
     * sets widgets to widgets group
     * via custom filter function
     *
     * @param {*} func
     * @returns instance
     * @memberof LayoutDataSource
     */
    filter(func: any): this;
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
    update(data: any): void;
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
    updateOptions(options: any): void;
}
