import { Subject, Observable } from "rxjs";
import { IEventHandler } from "./interfaces";

/**
 * base abstract class for components eventhandlers
 * 
 * implementation example:
 * ```
 * export class TestEH extends EventHandler {
 *   public listen() {
 *     // listen to inner (widget) events
 *     this.innerEvents$.subscribe(event => {
 *       switch(event.type){
 *         case 'test.click': 
 *           console.log(event);
 *           break;
 *         default: 
 *           break;
 *       }
 *     });
 *  
 *     // listen to outer (layout) events
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
  innerEvents$: Subject<any> = new Subject();
  outerEvents$: Observable<any>;
  out$: Subject<any> = new Subject();
  dataSource: any;
  hostId: string;


  /**
   * events listeners trigger
   *
   * @abstract
   * @memberof EventHandler
   */
  public abstract listen(): void;

  /**
   * emits inner events
   *
   * @param {string} type
   * @param {*} payload
   * @memberof EventHandler
   */
  public emitInner(type: string, payload: any){
    this.emit(this.innerEvents$, type, payload);
  }

  /**
   * emits outer events
   *
   * @param {string} type
   * @param {*} payload
   * @memberof EventHandler
   */
  public emitOuter(type: string, payload: any){
    this.emit(this.out$, type, payload);
  }

  /**
   * generic emitter
   *
   * @private
   * @param {Subject<any>} context$
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
   * @memberof EventHandler
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
   * @private
   * @param {string} context inner/outer
   * @param {string} type event type
   * @param {*} payload event payload
   * @memberof EventHandler
   * @beta
   */
  private log(context: string, type: string, payload: any){
    console.log(
      `%c${context}: %c${type}`, 'color: silver; text-transform: uppercase;', 'color: blue; font-style: italic;',
      'payload:', payload
    );
  }
}
