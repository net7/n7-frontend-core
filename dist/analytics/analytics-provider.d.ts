import { Subject } from "rxjs";
import { AnalyticsAction, IAnalyticsProvider, AnalyticsProviderConfig } from "../interfaces";
/**
 * class for analytics providers
 *
 * used by Analytics
 *
 * @class AnalyticsProvider
 */
export declare class AnalyticsProvider<T> implements IAnalyticsProvider<T> {
    config: AnalyticsProviderConfig<T>;
    /**
     * listens action triggers
     *
     * @param {Observable} [action$] stream action updates
     * @memberof AnalyticsProvider
     */
    listen(action$: Subject<AnalyticsAction>): void;
}
