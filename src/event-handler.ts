import { Subject, Observable } from "rxjs";
import { IEventHandler } from "./interfaces";

/**
 * base abstract class for components eventhandlers
 * 
 * EventHandlers "handle" the components / layouts 
 * custom events and native events (click, scroll, mouseenter, etc...)
 * 
 * An EventHandler is connected with the components / layouts DataSource
 * and can trigger the DataSource public methods
 * 
 * EventHandlers can emit outer events (targeting outer listeners) 
 * 
 * implementation example:
 * ```ts
 * export class TestEH extends EventHandler {
 *   public listen() {
 *     // listen to inner events
 *     this.innerEvents$.subscribe(event => {
 *       switch(event.type){
 *         case 'test.click': 
 *           // can trigger DataSource public methods
 *           this.dataSource.onClick(event); 
 *           // can emit outer events (to outer)
 *           this.emitOuter('test.click', event.payload); 
 *           break;
 *         default: 
 *           break;
 *       }
 *     });
 *  
 *     // listen to outer events
 *     this.outerEvents$.subscribe(event => {
 *       switch(event.type){
 *         case 'layout.click': 
 *           console.log(event);
 *           break;
 *         default: 
 *           break;
 *       }
 *     });
 *   }
 * }
 * ``` 
 *
 * @export
 * @abstract
 * @class EventHandler
 * @implements {IEventHandler}
 */
export abstract class EventHandler implements IEventHandler {
  static globalEvents$: Subject<any> = new Subject();
  innerEvents$: Subject<any> = new Subject();
  outerEvents$: Observable<any>;
  out$: Subject<any> = new Subject();
  dataSource: any;
  hostId: string;


  /**
   * listeners trigger, an implementation example:
   * 
   * ```ts
   * public listen() {
   *   // listen to inner events
   *   this.innerEvents$.subscribe(event => {
   *     // ...
   *   });
   *
   *   // listen to outer events
   *   this.outerEvents$.subscribe(event => {
   *      // ...
   *   });
   * }
   * ```
   *
   * @abstract
   * @memberof EventHandler
   */
  public abstract listen(): void;

  /**
   * emits inner events, targeting inner listener
   *
   * @param {string} type
   * @param {*} payload
   * @memberof EventHandler
   */
  public emitInner(type: string, payload: any){
    this.emit(this.innerEvents$, type, payload);
  }

  /**
   * emits outer events, targeting outer listener(s)
   *
   * @param {string} type
   * @param {*} payload
   * @memberof EventHandler
   */
  public emitOuter(type: string, payload: any){
    this.emit(this.out$, type, payload);
  }

  /**
   * emits global events, targeting app/any listener(s)
   *
   * @param {string} type
   * @param {*} payload
   * @memberof EventHandler
   */
  public emitGlobal(type: string, payload?: any){
    EventHandler.globalEvents$.next({ type: `global.${type}`, payload });
  }

  /**
   * generic emitter
   *
   * @private
   * @param {Subject<any>} context$ inner or outer
   * @param {string} type
   * @param {*} payload
   * @memberof EventHandler
   */
  private emit(context$: Subject<any>, type: string, payload: any){
    // emit signal
    context$.next({
      type: `${this.hostId}.${type}`,
      payload
    });
  }

  /**
   * to debug events 
   *
   * (to be tested/completed)
   * @beta
   */
  public debug(){
    this.innerEvents$.subscribe(({ type, payload }) => this.log('inner', type, payload));
    this.outerEvents$.subscribe(({ type, payload }) => this.log('outer', type, payload));
  }

  /**
   * console log internal utility
   * used by debug()
   * 
   * see: {@link EventHandler.debug}
   *
   * @private
   * @param {string} context inner/outer
   * @param {string} type event type
   * @param {*} payload event payload
   * 
   * (to be tested/completed)
   * @beta
   */
  private log(context: string, type: string, payload: any){
    console.log(
      `%c${context}: %c${type}`, 'color: silver; text-transform: uppercase;', 'color: blue; font-style: italic;',
      'payload:', payload
    );
  }
}
