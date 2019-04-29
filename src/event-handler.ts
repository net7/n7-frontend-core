import { Subject, Observable } from "rxjs";
import { IEventHandler } from "./interfaces";

export abstract class EventHandler implements IEventHandler {
  innerEvents$: Subject<any> = new Subject();
  outerEvents$: Observable<any>;
  out$: Subject<any> = new Subject();
  dataSource: any;
  hostId: string;

  public abstract listen(): any;

  public emitInner(type: string, payload: any){
    this.emit(this.innerEvents$, type, payload);
  }
  public emitOuter(type: string, payload: any){
    this.emit(this.out$, type, payload);
  }
  private emit(context$: Subject<any>, type: string, payload: any){
    // emit signal
    context$.next({
      type: `${this.hostId}.${type}`,
      payload
    });
  }

  public debug(){
    this.innerEvents$.subscribe(({ type, payload }) => this.log('inner', type, payload));
    this.outerEvents$.subscribe(({ type, payload }) => this.log('outer', type, payload));
  }

  private log(context: string, type: string, payload: any){
    console.log(
      `%c${context}: %c${type}`, 'color: silver; text-transform: uppercase;', 'color: blue; font-style: italic;',
      'payload:', payload
    );
  }
}
