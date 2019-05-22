import { Subject } from "rxjs";
import { IWidgetConfig, IDataSource, IEventHandler } from "./interfaces";
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
export declare class LayoutBuilder {
    id: string;
    widgets: {};
    on$: Subject<any>;
    out$: Subject<any>;
    ready$: Subject<any>;
    dataSource: IDataSource;
    eventHandler: IEventHandler;
    private widgetsDataSources;
    private widgetsEventHandlers;
    constructor(layoutId: string);
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
    init({ widgetsConfig, widgetsDataSources, widgetsEventHandlers, dataSource, eventHandler }: {
        widgetsConfig: IWidgetConfig[];
        widgetsDataSources: any;
        widgetsEventHandlers: any;
        dataSource?: any;
        eventHandler?: IEventHandler;
    }): void;
    /**
     * connect component/widget events to layout eventhandler
     *
     * @private
     * @memberof LayoutBuilder
     */
    private attachLayoutEvents;
    /**
     * connect layout events to component/widget eventhandler
     *
     * @private
     * @param {*} widgetEventHandler
     * @memberof LayoutBuilder
     */
    private attachWidgetEvents;
    /**
     *  gets widget id
     *
     * @private
     * @param {*} widget widget config
     * @returns {string} widgetId
     * @memberof LayoutBuilder
     */
    private getWidgetId;
    /**
     * gets widget DataSource
     *
     * @private
     * @param {*} widget
     * @returns {IDataSource | null}
     * @memberof LayoutBuilder
     */
    private getWidgetDataSource;
    /**
     * gets widget EventHandler
     *
     * @private
     * @param {*} widget
     * @returns {IEventHandler | null}
     * @memberof LayoutBuilder
     */
    private getWidgetEventHandler;
    /**
     * gets widget class name
     *
     * @private
     * @param {*} widgetId
     * @returns {string} widget class name
     * @memberof LayoutBuilder
     */
    private getWidgetBaseClass;
    /**
     * uppercase first char internal utility
     *
     * @private
     * @param {string} str
     * @returns {string}
     * @memberof LayoutBuilder
     */
    private _ucFirst;
    /**
     * triggered on ready$
     * for internal functionality
     *
     * @private
     * @memberof LayoutBuilder
     */
    private _onReady;
}
