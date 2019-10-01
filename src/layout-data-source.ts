/**
 * base abstract class for layout datasources 
 * 
 * implementation example:
 * ```ts
 * import { LayoutDataSource } from '@n7-frontend/core';
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
export abstract class LayoutDataSource {
  widgets: any[];
  private selectedWidgets: string[] | null;

  /**
   * gets widget by id
   *
   * @private
   * @param {string} widgetId
   * @returns widget | null
   * @memberof LayoutDataSource
   */
  private getWidgetById(widgetId: string){
    return this.widgets[widgetId] || null;
  }
  /**
   * gets widget DataSource
   *
   * @param {string} widgetId
   * @returns datasource | null
   * @memberof LayoutDataSource
   */
  public getWidgetDataSource(widgetId: string){
    const widget = this.getWidgetById(widgetId);
    if(widget && widget.ds){
      return widget.ds;
    }

    return null;
  }
  /**
   * gets widget EventHandler
   *
   * @param {string} widgetId
   * @returns eventhandler | null
   * @memberof LayoutDataSource
   */
  public getWidgetEventHandler(widgetId: string){
    const widget = this.getWidgetById(widgetId);
    if(widget && widget.eh){
      return widget.eh;
    }

    return null;
  }
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
  public one(widgetId: string){
    this.selectedWidgets = [widgetId];
    return this;
  }
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
  public some(widgetsId: string[]){
    this.selectedWidgets = widgetsId;
    return this;
  }
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
  public all(){
    this.selectedWidgets = Object.keys(this.widgets);
    return this;
  }
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
  public exclude(widgetsId: string[]){
    const allWidgets = Object.keys(this.widgets);
    this.selectedWidgets = allWidgets.filter(widgetId => widgetsId.indexOf(widgetId) === -1);
    return this;
  }
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
  public filter(func){
    const allWidgets = Object.keys(this.widgets);
    this.selectedWidgets = allWidgets.filter(func);
    return this;
  }
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