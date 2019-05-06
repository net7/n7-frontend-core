export declare abstract class LayoutDataSource {
    widgets: any[];
    private selectedWidgets;
    private getWidgetById;
    one(widgetId: any): this;
    some(widgetsId: any): this;
    all(): this;
    exclude(widgetsId: any): this;
    filter(func: any): this;
    update(data: any): void;
    updateOptions(options: any): void;
}
