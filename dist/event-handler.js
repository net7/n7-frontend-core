import { Subject } from "rxjs";
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.innerEvents$ = new Subject();
        this.out$ = new Subject();
    }
    EventHandler.prototype.emitInner = function (type, payload) {
        this.emit(this.innerEvents$, type, payload);
    };
    EventHandler.prototype.emitOuter = function (type, payload) {
        this.emit(this.out$, type, payload);
    };
    EventHandler.prototype.emit = function (context$, type, payload) {
        // emit signal
        context$.next({
            type: this.hostId + "." + type,
            payload: payload
        });
    };
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
    EventHandler.prototype.log = function (context, type, payload) {
        console.log("%c" + context + ": %c" + type, 'color: silver; text-transform: uppercase;', 'color: blue; font-style: italic;', 'payload:', payload);
    };
    return EventHandler;
}());
export { EventHandler };
//# sourceMappingURL=event-handler.js.map