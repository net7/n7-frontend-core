import { Subject, empty } from "rxjs";
import { catchError } from "rxjs/operators";
/**
 * base class for making API requests
 *
 * example:
 * ```
 *  const request$ = new ApiRequest(
 *     this.http.get("https://jsonplaceholder.typicode.com/posts")
 *  );
 *  request$.out$.subscribe(response => console.log(response));
 *  request$.run();
 * ```
 *
 * @class ApiRequest
 * @implements {IProvider}
 */
var ApiRequest = /** @class */ (function () {
    /**
     * Creates an instance of ApiRequest.
     * @param {Observable<any>} request
     * @param {*} [options] request options
     * @memberof ApiRequest
     */
    function ApiRequest(request, options) {
        this.out$ = new Subject();
        this.output = null;
        this.called = false;
        this.request$ = request;
        this.options = options;
    }
    /**
     * runs request
     * @returns {void}
     * @memberof ApiRequest
     */
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
    /**
     * resets / clear request output
     * @memberof ApiRequest
     */
    ApiRequest.prototype.reset = function () {
        this.called = false;
        this.output = null;
    };
    return ApiRequest;
}());
export { ApiRequest };
//# sourceMappingURL=api-request.js.map