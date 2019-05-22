import { Subject, Observable } from "rxjs";
import { IProvider } from './interfaces';
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
export declare class ApiRequest implements IProvider {
    /** Internal implementation detail, do not use directly. */
    _options: any;
    /** Internal implementation detail, do not use directly. */
    _output: any;
    out$: Subject<any>;
    private request$;
    private called;
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
    constructor(request: Observable<any>, options?: any);
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
    run(): void;
    /**
     * resets / clear request output
     *
     * useful for re-running the same request instance
     *
     * (to be tested/completed)
     * @beta
     */
    reset(): void;
}
