import { Subject, Observable } from "rxjs";
import { IProvider } from './interfaces';
export declare class ApiRequest implements IProvider {
    out$: Subject<any>;
    output: any;
    options: any;
    private request$;
    private called;
    constructor(request: Observable<any>, options?: any);
    run(): void;
    reset(): void;
}
