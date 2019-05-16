import { Subject, Observable, empty } from "rxjs";
import { catchError } from "rxjs/operators";

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
export class ApiRequest implements IProvider {
  /** Internal implementation detail, do not use directly. */
  _options: any;
  /** Internal implementation detail, do not use directly. */
  _output: any = null;
  out$: Subject<any> = new Subject();

  private request$: Observable<any>;
  private called: boolean = false;

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
  constructor(request: Observable<any>, options?){
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
  run(): void {
    if (this.called) {
      return;
    }
    this.called = true;

    // TODO: some options retry, timeout, etc...
    this.request$
      .pipe(
        catchError((err) => {
          // signal
          this.out$.error(err);
          this.out$.complete();
          return empty();
        })
      )
      .subscribe((response) => {
        try{
          this._output = response;
        } catch(err){
          console.log(err);
          this.out$.error(err);
        }
        // signal
        this.out$.next(this._output);
        this.out$.complete();
      });
  }

  /**
   * resets / clear request output
   * 
   * useful for re-running the same request instance
   * 
   * (to be tested/completed)
   * @beta
   */
  reset(): void {
    this.called = false;
    this._output = null;
  }
}
