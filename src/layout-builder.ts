import { Subject, merge } from "rxjs";
import { IWidgetConfig, IDataSource, IEventHandler } from "./interfaces";

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
    });

    // attach events
    this.attachLayoutEvents();

    // add widgets config to layout datasource
    if(this.dataSource){
      this.dataSource['widgets'] = this.widgets;
    }

    // on ready
    this.ready$.subscribe(() => this._onReady());

    // emit ready
    this.ready$.next();
  }

  private attachLayoutEvents(){
    let outs$ = Object.keys(this.widgets)
      .map((widgetId) => this.widgets[widgetId])
      .filter(widget => !!widget.eh)
      .map(widget => widget.eh.out$);

    this.eventHandler.outerEvents$ = merge(...outs$);

    this.eventHandler.listen();
  }

  private attachWidgetEvents(widgetEventHandler){
    widgetEventHandler.outerEvents$ = this.eventHandler.out$;
    widgetEventHandler.listen();
  }

  private getWidgetId(widget){
    return widget.id;
  }

  private getWidgetDataSource(widget){
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

  private getWidgetEventHandler(widget){
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

  private getWidgetBaseClass(widgetId){
    return widgetId.split('-').map(word => this._ucFirst(word)).join('');
  }

  private _ucFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private _onReady(){
    // trigger update for widgets
    // w/initial data
    Object.keys(this.widgets).forEach(id => this.widgets[id].ds.update());
  }
}
