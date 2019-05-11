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
export declare abstract class EventHandler implements IEventHandler {
    innerEvents$: Subject<any>;
    outerEvents$: Observable<any>;
    out$: Subject<any>;
    dataSource: any;
    hostId: string;
    /**
     * events listeners trigger
     *
     * @abstract
     * @memberof EventHandler
     */
    abstract listen(): void;
    /**
     * emits inner events
     *
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    emitInner(type: string, payload: any): void;
    /**
     * emits outer events
     *
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    emitOuter(type: string, payload: any): void;
    /**
     * generic emitter
     *
     * @private
     * @param {Subject<any>} context$
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    private emit;
    /**
     * to debug events
     *
     * @memberof EventHandler
     * @beta
     */
    debug(): void;
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
    private log;
}
