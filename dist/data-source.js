import { BehaviorSubject } from "rxjs";
/**
 * base abstract class for components datasources
 *
 * implementation example:
 * ```
 * import { DataSource } from '@n7-frontend/core';
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
     * runs datasource
     *
     * @param {*} [inputData] external input data
     * @memberof DataSource
     */
    DataSource.prototype.run = function (inputData) {
        try {
            this.input = Array.isArray(inputData) && inputData.length === 1 ? inputData[0] : inputData;
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
     * updates datasource
     *
     * @param {*} [newData] new/updated external input data
     * @param {*} [newOptions]
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
     * @protected
     * @param {*} error
     * @memberof DataSource
     */
    DataSource.prototype.onError = function (error) {
        var dataSource = this.constructor.name;
        console.error(dataSource + " error:", error);
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
//# sourceMappingURL=data-source.js.map