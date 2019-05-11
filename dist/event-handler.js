import { Subject } from "rxjs";
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
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.innerEvents$ = new Subject();
        this.out$ = new Subject();
    }
    /**
     * emits inner events
     *
     * @param {string} type
     * @param {*} payload
     * @memberof EventHandler
     */
    EventHandler.prototype.emitInner = function (type, payload) {
        this.emit(this.innerEvents$, type, payload);
    };
    /**
     * emits outer events
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
     * @param {Subject<any>} context$
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
     * @memberof EventHandler
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
     * @private
     * @param {string} context inner/outer
     * @param {string} type event type
     * @param {*} payload event payload
     * @memberof EventHandler
     * @beta
     */
    EventHandler.prototype.log = function (context, type, payload) {
        console.log("%c" + context + ": %c" + type, 'color: silver; text-transform: uppercase;', 'color: blue; font-style: italic;', 'payload:', payload);
    };
    return EventHandler;
}());
export { EventHandler };
//# sourceMappingURL=event-handler.js.map