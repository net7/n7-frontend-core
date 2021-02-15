import { filter } from "rxjs/operators";
/**
 * class for analytics providers
 *
 * used by Analytics
 *
 * @class AnalyticsProvider
 */
var AnalyticsProvider = /** @class */ (function () {
    function AnalyticsProvider() {
    }
    /**
     * listens action triggers
     *
     * @param {Observable} [action$] stream action updates
     * @memberof AnalyticsProvider
     */
    AnalyticsProvider.prototype.listen = function (action$) {
        var _this = this;
        // normalize actions to object { type, filter? }
        var providerActions = this.config.actions.map(function (action) {
            if (typeof action !== 'string' && 'type' in action) {
                return action;
            }
            return { type: action };
        });
        // cache allowedActions for filtering
        var allowedActions = providerActions.map(function (_a) {
            var type = _a.type;
            return type;
        });
        action$.pipe(filter(function (_a) {
            var type = _a.type;
            return allowedActions.includes(type);
        }), filter(function (_a) {
            var type = _a.type, payload = _a.payload;
            var actionConfig = providerActions
                .find(function (_a) {
                var eventType = _a.type;
                return eventType === type;
            });
            if (actionConfig.filter) {
                return actionConfig.filter(payload);
            }
            return true;
        })).subscribe(function (_a) {
            var type = _a.type, payload = _a.payload;
            // provider track
            _this.config.track({ type: type, payload: payload });
        });
    };
    return AnalyticsProvider;
}());
export { AnalyticsProvider };
