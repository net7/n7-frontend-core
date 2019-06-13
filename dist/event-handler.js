import { Subject } from "rxjs";
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
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.innerEvents$ = new Subject();
        this.out$ = new Subject();
    }
    /**
     * emits inner events, targeting inner listener
     *
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    EventHandler.prototype.emitInner = function (type, payload) {
        this.emit(this.innerEvents$, type, payload);
    };
    /**
     * emits outer events, targeting outer listener(s)
     *
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    EventHandler.prototype.emitOuter = function (type, payload) {
        this.emit(this.out$, type, payload);
    };
    /**
     * generic emitter
     *
     * @private
     * @param {Subject<any>} context$ inner or outer
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    EventHandler.prototype.emit = function (context$, type, payload) {
        // emit signal
        context$.next({
            type: this.hostId + "." + type,
            payload: payload
        });
    };
    /**
     * to debug events
     *
     * (to be tested/completed)
     * @beta
     */
    EventHandler.prototype.debug = function () {
        var _this = this;
        this.innerEvents$.subscribe(function (_a) {
            var type = _a.type, payload = _a.payload;
            return _this.log('inner', type, payload);
        });
        this.outerEvents$.subscribe(function (_a) {
            var type = _a.type, payload = _a.payload;
            return _this.log('outer', type, payload);
        });
    };
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
    EventHandler.prototype.log = function (context, type, payload) {
        console.log("%c" + context + ": %c" + type, 'color: silver; text-transform: uppercase;', 'color: blue; font-style: italic;', 'payload:', payload);
    };
    return EventHandler;
}());
export { EventHandler };
