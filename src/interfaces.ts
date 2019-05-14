import { Subject, Observable } from "rxjs";

export interface IDataSource {
  out$: Subject<any>;
  input: any;
  output: any;
  options: any;
  run(data?: any): any;
  reset(): any;
}

export interface IEventHandler {
  innerEvents$: Subject<any>;
  outerEvents$: Observable<any>;
  out$: Subject<any>;
  hostId: string;
  dataSource?: IDataSource;
  listen(): any;
  debug(): any;
  emitInner(type: string, payload?: any): any;
  emitOuter(type: string, payload?: any): any;
}

export interface IProvider {
  _output: any;
  _options?: any;
  out$: Subject<any>;
  run(): any;
  reset(): any;
}

export interface IWidgetConfig {
  id: string;
  dataSource?: any;
  eventHandler?: any;
  options?: any;
}