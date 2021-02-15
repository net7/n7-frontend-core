import { Subject } from "rxjs";
import { filter } from "rxjs/operators"
import { AnalyticsAction, IAnalyticsProvider, AnalyticsProviderConfig } from "../interfaces";

/**
 * class for analytics providers
 * 
 * used by Analytics
 * 
 * @class AnalyticsProvider
 */
export class AnalyticsProvider<T> implements IAnalyticsProvider<T> {
  config: AnalyticsProviderConfig<T>;

  /**
   * listens action triggers
   * 
   * @param {Observable} [action$] stream action updates
   * @memberof AnalyticsProvider
   */
  listen(action$: Subject<AnalyticsAction>) {
    // normalize actions to object { type, filter? }
    const providerActions = this.config.actions.map((action) => {
      if (typeof action !== 'string' && 'type' in action) {
        return action;
      }
      return { type: action }
    });
    // cache allowedActions for filtering
    const allowedActions = providerActions.map(({ type }) => type);

    action$.pipe(
      filter(({ type }) => allowedActions.includes(type as unknown as T)),
      filter(({ type, payload }) => {
        const actionConfig = providerActions
          .find( ({ type: eventType }) => eventType === (type as unknown as T));

        if (actionConfig.filter) {
          return actionConfig.filter(payload);
        }
        return true;
      })
    ).subscribe(({ type, payload }) => {
      // provider track
      this.config.track({ type, payload });
    });
  }
}