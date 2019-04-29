import { Subject, Observable, empty } from "rxjs";
import { catchError } from "rxjs/operators";

import { IProvider } from './interfaces';

export class ApiRequest implements IProvider {
  out$: Subject<any> = new Subject();
  output: any = null;
  options: any;

  private request$: Observable<any>;
  private called: boolean = false;

  constructor(request: Observable<any>, options?){
    this.request$ = request;
    this.options = options;
  }

  run() {
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

  reset() {
    this.called = false;
    this.output = null;
  }
}
