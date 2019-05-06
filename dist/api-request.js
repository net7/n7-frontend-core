import { Subject, empty } from "rxjs";
import { catchError } from "rxjs/operators";
var ApiRequest = /** @class */ (function () {
    function ApiRequest(request, options) {
        this.out$ = new Subject();
        this.output = null;
        this.called = false;
        this.request$ = request;
        this.options = options;
    }
    ApiRequest.prototype.run = function () {
        var _this = this;
        if (this.called) {
            return;
        }
        this.called = true;
        // TODO: some options retry, timeout, etc...
        this.request$
            .pipe(catchError(function (err) {
            // signal
            _this.out$.error(err);
            _this.out$.complete();
            return empty();
        }))
            .subscribe(function (response) {
            try {
                _this.output = response;
            }
            catch (err) {
                console.log(err);
                _this.out$.error(err);
            }
            // signal
            _this.out$.next(_this.output);
            _this.out$.complete();
        });
    };
    ApiRequest.prototype.reset = function () {
        this.called = false;
        this.output = null;
    };
    return ApiRequest;
}());
export { ApiRequest };
//# sourceMappingURL=api-request.js.map