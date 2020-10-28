import { Subject, BehaviorSubject, Observable } from "rxjs";

export interface IDataSource {
  out$: BehaviorSubject<any>;
  input: any;
  output: any;
  options: any;
  run(data?: any): void;
  update(data?: any, options?: any): void;
  reset(): void;
}

export interface IEventHandler {
  innerEvents$: Subject<any>;
  outerEvents$: Observable<any>;
  out$: Subject<any>;
  hostId: string;
  dataSource?: IDataSource;
  listen(): void;
  debug(): void;
  emitInner(type: string, payload?: any): void;
  emitOuter(type: string, payload?: any): void;
  emitGlobal(type: string, payload?: any): void;
}

export interface IWidgetConfig {
  id: string;
  dataSource?: any;
  eventHandler?: any;
  options?: any;
  hasStaticData?: boolean;
}