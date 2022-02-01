import { BehaviorSubject } from "rxjs";
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
var DataSource = /** @class */ (function () {
    /**
     * Creates an instance of DataSource
     *
     * @param {*} [options] data source options
     * @memberof DataSource
     */
    function DataSource(options) {
        this.out$ = new BehaviorSubject(null);
        this.input = null;
        this.output = null;
        this.options = null;
        this.options = options || {};
    }
    /**
     * runs datasource and updates `out$` stream
     *
     * @param {*} [inputData] external input data
     * @memberof DataSource
     */
    DataSource.prototype.run = function (inputData) {
        try {
            this.input = inputData;
            // processing...
            this.output = this.transform(this.input, this.options);
            // signal
            this.out$.next(this.output);
        }
        catch (error) {
            this.onError(error);
        }
    };
    /**
     * updates datasource with new data and/or new options
     *
     * @param {*} [newData] new/updated external input data
     * @param {*} [newOptions] new/updated options
     * @memberof DataSource
     */
    DataSource.prototype.update = function (newData, newOptions) {
        if (newOptions) {
            this.options = newOptions;
        }
        this.run(newData);
    };
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
    DataSource.prototype.onError = function (error) {
        var dataSource = this.constructor['name'];
        console.error("".concat(dataSource, " error:"), error);
    };
    /**
     * resets/clears datasource input/output
     *
     * @memberof DataSource
     */
    DataSource.prototype.reset = function () {
        this.input = null;
        this.output = null;
    };
    return DataSource;
}());
export { DataSource };
