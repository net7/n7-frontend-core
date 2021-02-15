import { Subject } from "rxjs";
import { AnalyticsAction, AnalyticsConfig } from "../interfaces";
import { AnalyticsProvider } from "./analytics-provider";

/**
 * class for analytics tracking
 * 
 * class implementation example:
 * ```ts
 * import { analytics, _a } from '@n7-frontend/core';
 * 
 * enum AnalyticsActions {
 *   ROUTERCHANGE = 'routerchange',
 *   BUTTONCLICK = 'buttonclick'
 * }
 *
 * const config: AnalyticsConfig<AnalyticsActions> = [
 *   // google analytics example
 *   {
 *     track({ type, payload }) {
 *       if (type === AnalyticsActions.ROUTERCHANGE) {
 *         gtag('event', 'page_view', payload);
 *       } else {
 *         gtag('event', type, payload);
 *       }
 *     },
 *     actions: [
 *       AnalyticsActions.BUTTONCLICK,
 *       {
 *         type: AnalyticsActions.ROUTERCHANGE,
 *         filter(payload) {
 *           if (payload.page_path === '/home') {
 *             return false;  
 *           }
 *           return true;
 *         }
 *       }
 *     ]
 *   }
 * ];
 * 
 * ...
 * 
 * // triggering actions
 * analytics.trigger(AnalyticsActions.ROUTERCHANGE, {
 *   page_title: 'Homepage',
 *   page_location: 'http://example.com',
 *   page_path: '/home'
 * })
 * 
 * analytics.trigger(AnalyticsActions.BUTTONCLICK, {
 *   item: '<item-id> 
 * })
 * ```
 * 
 * @class Analytics
 */
class Analytics {
  private action$: Subject<AnalyticsAction> = new Subject();
  
  /**
   * Loads initial configuration
   * 
   * @param {*} [config] AnalyticsConfig
   * @memberof Analytics
   */
  init<T>(config: AnalyticsConfig<T>) {
    config.forEach((providerConfig) => {
      const provider = new AnalyticsProvider();
      provider.config = providerConfig;
      provider.listen(this.action$);
    })
  }

  /**
   * Triggers an action
   * 
   * @param {string} [type] action type
   * @param {*} [payload] action payload
   * @memberof Analytics
   */
  trigger(type: string, payload: any) {
    this.action$.next({ type, payload });
  }
}

// exports
export const analytics = new Analytics();