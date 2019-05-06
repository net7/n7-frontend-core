import { Subject } from "rxjs";
import { IWidgetConfig, IDataSource, IEventHandler } from "./interfaces";
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
    init({ widgetsConfig, widgetsDataSources, widgetsEventHandlers, dataSource, eventHandler }: {
        widgetsConfig: IWidgetConfig[];
        widgetsDataSources: any;
        widgetsEventHandlers: any;
        dataSource?: any;
        eventHandler?: IEventHandler;
    }): void;
    private attachLayoutEvents;
    private attachWidgetEvents;
    private getWidgetId;
    private getWidgetDataSource;
    private getWidgetEventHandler;
    private getWidgetBaseClass;
    private _ucFirst;
    private _onReady;
}
