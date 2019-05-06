import { BehaviorSubject } from "rxjs";
import { IDataSource } from "./interfaces";
export declare abstract class DataSource implements IDataSource {
    out$: BehaviorSubject<any>;
    input: any;
    output: any;
    options: any;
    constructor(options?: any);
    protected abstract transform(input: any, options?: any): any;
    run(inputData?: any): void;
    update(newData?: any, newOptions?: any): void;
    protected onError(error: any): void;
    reset(): void;
}
