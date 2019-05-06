import { Subject, Observable } from "rxjs";
import { IEventHandler } from "./interfaces";
export declare abstract class EventHandler implements IEventHandler {
    innerEvents$: Subject<any>;
    outerEvents$: Observable<any>;
    out$: Subject<any>;
    dataSource: any;
    hostId: string;
    abstract listen(): any;
    emitInner(type: string, payload: any): void;
    emitOuter(type: string, payload: any): void;
    private emit;
    debug(): void;
    private log;
}
