export abstract class LayoutDataSource {
  widgets: any[];
  private selectedWidgets: string[] | null;

  private getWidgetById(widgetId){
    return this.widgets[widgetId] || null;
  }
  public one(widgetId){
    this.selectedWidgets = [widgetId];
    return this;
  }
  public some(widgetsId){
    this.selectedWidgets = widgetsId;
    return this;
  }
  public all(){
    this.selectedWidgets = Object.keys(this.widgets);
    return this;
  }
  public exclude(widgetsId){
    const allWidgets = Object.keys(this.widgets);
    this.selectedWidgets = allWidgets.filter(widgetId => widgetsId.indexOf(widgetId) === -1);
    return this;
  }
  public filter(func){
    const allWidgets = Object.keys(this.widgets);
    this.selectedWidgets = allWidgets.filter(func);
    return this;
  }
  public update(data){
    if(!this.selectedWidgets){
      throw Error('no widgets selected');
    }
    this.selectedWidgets.forEach(widgetId => {
      const widget = this.getWidgetById(widgetId);
      if(widget) widget.ds.update(data);
    });

    // reset selected
    this.selectedWidgets = null;
  }

  public updateOptions(options){
    if(!this.selectedWidgets){
      throw Error('no widgets selected');
    }
    this.selectedWidgets.forEach(widgetId => {
      const widget = this.getWidgetById(widgetId);
      if(widget) widget.ds.options = options;
    });

    // reset selected
    this.selectedWidgets = null;
  }
  
}