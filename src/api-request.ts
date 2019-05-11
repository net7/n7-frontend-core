import { Subject, Observable, empty } from "rxjs";
import { catchError } from "rxjs/operators";

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
export class ApiRequest implements IProvider {
  out$: Subject<any> = new Subject();
  output: any = null;
  options: any;

  private request$: Observable<any>;
  private called: boolean = false;

  /**
   * Creates an instance of ApiRequest.
   * @param {Observable<any>} request
   * @param {*} [options] request options
   * @memberof ApiRequest
   */
  constructor(request: Observable<any>, options?){
    this.request$ = request;
    this.options = options;
  }

  /**
   * runs request
   * @returns {void}
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
          this.output = response;
        } catch(err){
          console.log(err);
          this.out$.error(err);
        }
        // signal
        this.out$.next(this.output);
        this.out$.complete();
      });
  }

  /**
   * resets / clear request output
   * @memberof ApiRequest
   */
  reset(): void {
    this.called = false;
    this.output = null;
  }
}
