import { Subject, merge } from "rxjs";
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
export class LayoutBuilder {
  public id: string;
  public widgets = {};
  public on$: Subject<any> = new Subject();
  public out$: Subject<any> = new Subject();
  public ready$: Subject<any> = new Subject();
  public dataSource: IDataSource;
  public eventHandler: IEventHandler;
  private widgetsDataSources: any;
  private widgetsEventHandlers: any;

  constructor(layoutId: string){
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
  init(
    {widgetsConfig, widgetsDataSources, widgetsEventHandlers, dataSource, eventHandler}: 
    // types
    {
      widgetsConfig: IWidgetConfig[], 
      widgetsDataSources: any, 
      widgetsEventHandlers: any, 
      dataSource?: any, 
      eventHandler?: IEventHandler
    }
  ) {
    // layout setup
    // ------------------------------------------------------------->
    this.eventHandler = eventHandler;
    this.dataSource = dataSource;

    // add host id
    this.eventHandler.hostId = this.id;

    // add datasource to eventhandler
    if(dataSource && eventHandler){
      this.eventHandler.dataSource = dataSource;
    }

    // widgets setup
    // ------------------------------------------------------------->
    this.widgetsDataSources = widgetsDataSources;
    this.widgetsEventHandlers = widgetsEventHandlers;

    widgetsConfig.forEach((widgetConfig: IWidgetConfig) => {
      const id = this.getWidgetId(widgetConfig),
        ds = this.getWidgetDataSource(widgetConfig),
        eh = this.getWidgetEventHandler(widgetConfig);
        
      let emit = null;

      if(eh) {
        // add host id
        eh.hostId = id;
        // attach events
        this.attachWidgetEvents(eh);
        // add datasource to eventhandler
        eh.dataSource = ds;
        emit = (type: string, payload: any) => eh.emitInner(type, payload);
      }

      this.widgets[id] = {id, ds, eh, emit};

      // if widget has static data trigger update
      if(widgetConfig.hasStaticData) {
        ds.update();
      } 
    });

    // attach events
    this.attachLayoutEvents();

    // add widgets config to layout datasource
    if(this.dataSource){
      this.dataSource['widgets'] = this.widgets;
    }

    // emit ready
    this.ready$.next();
  }

  /**
   * connect component/widget events to layout eventhandler 
   *
   * @private
   * @memberof LayoutBuilder
   */
  private attachLayoutEvents(){
    let outs$ = Object.keys(this.widgets)
      .map((widgetId) => this.widgets[widgetId])
      .filter(widget => !!widget.eh)
      .map(widget => widget.eh.out$);

    this.eventHandler.outerEvents$ = merge(...outs$);

    this.eventHandler.listen();
  }

  /**
   * connect layout events to component/widget eventhandler 
   *
   * @private
   * @param {*} widgetEventHandler
   * @memberof LayoutBuilder
   */
  private attachWidgetEvents(widgetEventHandler){
    widgetEventHandler.outerEvents$ = this.eventHandler.out$;
    widgetEventHandler.listen();
  }

  /**
   *  gets widget id
   *
   * @private
   * @param {*} widget widget config
   * @returns {string} widgetId
   * @memberof LayoutBuilder
   */
  private getWidgetId(widget): string{
    return widget.id;
  }

  /**
   * gets widget DataSource
   *
   * @private
   * @param {*} widget
   * @returns {IDataSource | null}
   * @memberof LayoutBuilder
   */
  private getWidgetDataSource(widget): IDataSource | null {
    let dataSource: IDataSource | null;

    if(widget.dataSource) {
      dataSource = new widget.dataSource(widget.options || {});
    } else {
      const widgetId = this.getWidgetId(widget),
      widgetClass = this.getWidgetBaseClass(widgetId),
      dataSourceClass = `${widgetClass}DS`;

      dataSource = this.widgetsDataSources[dataSourceClass] ? new this.widgetsDataSources[dataSourceClass]() : null;
    }

    return dataSource;
  }

  /**
   * gets widget EventHandler
   *
   * @private
   * @param {*} widget
   * @returns {IEventHandler | null}
   * @memberof LayoutBuilder
   */
  private getWidgetEventHandler(widget): IEventHandler | null{
    let eventHandler: any;

    if(widget.eventHandler) {
      eventHandler = new widget.eventHandler();
    } else {
      const widgetId = this.getWidgetId(widget),
      widgetClass = this.getWidgetBaseClass(widgetId),
      eventHandlerClass = `${widgetClass}EH`;

      eventHandler = this.widgetsEventHandlers[eventHandlerClass] ? new this.widgetsEventHandlers[eventHandlerClass]() : null;
    }

    return eventHandler;
  }

  /**
   * gets widget class name
   *
   * @private
   * @param {*} widgetId
   * @returns {string} widget class name
   * @memberof LayoutBuilder
   */
  private getWidgetBaseClass(widgetId){
    return widgetId.split('-').map(word => this._ucFirst(word)).join('');
  }

  /**
   * uppercase first char internal utility
   *
   * @private
   * @param {string} str
   * @returns {string}
   * @memberof LayoutBuilder
   */
  private _ucFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
