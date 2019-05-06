import { BehaviorSubject } from "rxjs";
var DataSource = /** @class */ (function () {
    function DataSource(options) {
        this.out$ = new BehaviorSubject(null);
        this.input = null;
        this.output = null;
        this.options = null;
        this.options = options || {};
    }
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
    DataSource.prototype.update = function (newData, newOptions) {
        if (newOptions) {
            this.options = newOptions;
        }
        this.run(newData);
    };
    DataSource.prototype.onError = function (error) {
        var dataSource = this.constructor.name;
        console.error(dataSource + " error:", error);
    };
    DataSource.prototype.reset = function () {
        this.input = null;
        this.output = null;
    };
    return DataSource;
}());
export { DataSource };
//# sourceMappingURL=data-source.js.map