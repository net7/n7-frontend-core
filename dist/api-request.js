import { Subject, empty } from "rxjs";
import { catchError } from "rxjs/operators";
/**
 * base class for making API requests
 *
 * example:
 * ```ts
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
     *
     * receives an http request as parameter, see more on:
     * [angular http](https://angular.io/guide/http)
     * ```ts
     * new ApiRequest(
     *  this.http.get("https://jsonplaceholder.typicode.com/posts")
     * );
     * ```
     *
     * @param {Observable<any>} request Observable
     * @param {*} [options] aditional request options
     * @memberof ApiRequest
     */
    function ApiRequest(request, options) {
        /** Internal implementation detail, do not use directly. */
        this._output = null;
        this.out$ = new Subject();
        this.called = false;
        this.request$ = request;
        this._options = options;
    }
    /**
     * runs request updating the `out$` stream
     *
     * ```ts
     * // ...
     * request$.out$.subscribe(response => console.log(response)); // listen to out$ changes
     * request$.run(); // runs request
     * ```
     *
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
                _this._output = response;
            }
            catch (err) {
                console.log(err);
                _this.out$.error(err);
            }
            // signal
            _this.out$.next(_this._output);
            _this.out$.complete();
        });
    };
    /**
     * resets / clear request output
     *
     * useful for re-running the same request instance
     *
     * (to be tested/completed)
     * @beta
     */
    ApiRequest.prototype.reset = function () {
        this.called = false;
        this._output = null;
    };
    return ApiRequest;
}());
export { ApiRequest };
