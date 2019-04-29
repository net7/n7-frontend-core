import { BehaviorSubject } from "rxjs";
import { IDataSource } from "./interfaces";

export abstract class DataSource implements IDataSource {
  out$: BehaviorSubject<any> = new BehaviorSubject(null);
  input: any = null;
  output: any = null;
  options: any = null;

  constructor(options?) {
    this.options = options || {};
  }

  protected abstract transform(input, options?): any;

  run(inputData?: any) {
    try {
      this.input = Array.isArray(inputData) && inputData.length === 1 ? inputData[0] : inputData;
      // processing...
      this.output = this.transform(this.input, this.options);
      // signal
      this.out$.next(this.output);
    } catch (error) {
      this.onError(error);
    }
  }

  update(newData?, newOptions?) {
    if (newOptions) {
      this.options = newOptions;
    }
    this.run(newData);
  }

  protected onError(error){
    const dataSource = this.constructor.name;
    console.error(`${dataSource} error:`, error);
  }

  reset() {
    this.input = null;
    this.output = null;
  }
}
