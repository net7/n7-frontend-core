import { BehaviorSubject } from "rxjs";
import { IDataSource } from "./interfaces";
/**
 * base abstract class for components datasources
 *
 * implementation example:
 * ```
 * import { DataSource } from '@dataviz/core';
 *
 * export class TestDS extends DataSource {
 *   protected transform(data) {
 *     return data.value;
 *   }
 * }
 * ```
 *
 * @abstract
 * @class DataSource
 * @implements {IDataSource}
 */
export declare abstract class DataSource implements IDataSource {
    out$: BehaviorSubject<any>;
    input: any;
    output: any;
    options: any;
    /**
     * Creates an instance of DataSource
     *
     * @param {*} [options] data source options
     * @memberof DataSource
     */
    constructor(options?: any);
    /**
     * transforms external input data to internal output
     * to be passed as data to component(s)
     *
     * @protected
     * @abstract
     * @param {*} input datasource "external" input
     * @param {*} [options] data source options
     * @returns {*} output data
     * @memberof DataSource
     */
    protected abstract transform(input: any, options?: any): any;
    /**
     * runs datasource
     *
     * @param {*} [inputData] external input data
     * @memberof DataSource
     */
    run(inputData?: any): void;
    /**
     * updates datasource
     *
     * @param {*} [newData] new/updated external input data
     * @param {*} [newOptions]
     * @memberof DataSource
     */
    update(newData?: any, newOptions?: any): void;
    /**
     * handles onError exception
     * used by run() method
     *
     * @protected
     * @param {*} error
     * @memberof DataSource
     */
    protected onError(error: any): void;
    /**
     * resets/clears datasource input/output
     *
     * @memberof DataSource
     */
    reset(): void;
}
