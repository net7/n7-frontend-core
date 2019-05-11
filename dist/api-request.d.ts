import { Subject, Observable } from "rxjs";
import { IProvider } from './interfaces';
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
export declare class ApiRequest implements IProvider {
    out$: Subject<any>;
    output: any;
    options: any;
    private request$;
    private called;
    /**
     * Creates an instance of ApiRequest.
     * @param {Observable<any>} request
     * @param {*} [options] request options
     * @memberof ApiRequest
     */
    constructor(request: Observable<any>, options?: any);
    /**
     * runs request
     * @returns {void}
     * @memberof ApiRequest
     */
    run(): void;
    /**
     * resets / clear request output
     * @memberof ApiRequest
     */
    reset(): void;
}
