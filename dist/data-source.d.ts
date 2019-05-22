import { BehaviorSubject } from "rxjs";
import { IDataSource } from "./interfaces";
/**
 * base abstract class for components datasources
 *
 * Datasources have the logic to transform external data
 * in components/widgets input data.
 *
 * class implementation example:
 * ```ts
 * import { DataSource } from '@n7-frontend/core';
 *
 * export class TestDS extends DataSource {
 *   protected transform(data) {
 *     return data.value;
 *   }
 * }
 * ```
 *
 * An angular layout example:
 *
 * - `lb` is the layout's LayoutBuilder
 * - `ds` is the widget's DataSource
 * - `out$` is the Datasource async output
 *
 * ```html
 * <test-component [data]="lb.widgets['test'].ds.out$ | async"></test-component>
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
     * transforms external input data in internal output,
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
     * runs datasource and updates `out$` stream
     *
     * @param {*} [inputData] external input data
     * @memberof DataSource
     */
    run(inputData?: any): void;
    /**
     * updates datasource with new data and/or new options
     *
     * @param {*} [newData] new/updated external input data
     * @param {*} [newOptions] new/updated options
     * @memberof DataSource
     */
    update(newData?: any, newOptions?: any): void;
    /**
     * handles onError exception
     * used by run() method
     *
     * see: {@link DataSource.run}
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
