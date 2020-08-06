/**
 * class for translations
 *
 * class implementation example:
 * ```ts
 * import { translate, _t } from '@n7-frontend/core';
 *
 * ...
 * translate.init({
 *   defaultLang: 'it',
 *   translations: {
 *     it: {
 *       hello: 'mondo',
 *       say: 'ciao {name}'
 *     },
 *     en: {
 *       hello: 'world',
 *       say: 'hi {name}'
 *     },
 *     es: {
 *       hello: 'mundo',
 *       say: 'hola {name}'
 *     }
 *   }
 * })
 * ...
 *
 * console.log(_t('hello'));
 * console.log(_t('say', { name: 'John Doe' }));
 * ```
 *
 * @class Translate
 */
var Translate = /** @class */ (function () {
    function Translate() {
        this.defaultLang = null;
        this.currentLang = null;
        this.translations = {};
    }
    /**
     * Loads initial configuration
     *
     * @param {*} [options] configuration options
     * @memberof Translate
     */
    Translate.prototype.init = function (_a) {
        var _this = this;
        var defaultLang = _a.defaultLang, translations = _a.translations;
        if (defaultLang) {
            this.setDefaultLang(defaultLang);
        }
        if (translations) {
            Object.keys(translations).forEach(function (code) {
                _this.setLangTranslations(code, translations[code]);
            });
        }
    };
    /**
     * Set default language code
     *
     * @param {string} [code] language code
     * @memberof Translate
     */
    Translate.prototype.setDefaultLang = function (code) {
        this.defaultLang = code;
    };
    /**
     * Set current language code
     *
     * @param {string} [code] language code
     * @memberof Translate
     */
    Translate.prototype.setCurrentLang = function (code) {
        this.currentLang = code;
    };
    /**
     * Set language translations
     *
     * @param {string} [code] language code
     * @param {*} [translations] translations object
     * @memberof Translate
     */
    Translate.prototype.setLangTranslations = function (code, translations) {
        if (this.translations[code]) {
            throw Error("Translations for lang " + code + " already exists");
        }
        this.translations[code] = translations;
    };
    /**
     * Set language translations
     *
     * @param {string} [code] language code
     * @param {string} [key] translation key
     * @param {string} [translation] translation label
     * @memberof Translate
     */
    Translate.prototype.setLangTranslation = function (code, key, translation) {
        if (!this.translations[code]) {
            this.translations[code] = {};
        }
        this.translations[code][key] = translation;
    };
    /**
     * Get default language code
     *
     * @returns {string} language code
     * @memberof Translate
     */
    Translate.prototype.getDefaultLang = function () {
        return this.defaultLang;
    };
    /**
     * Get current language code
     *
     * @returns {string} language code
     * @memberof Translate
     */
    Translate.prototype.getCurrentLang = function () {
        return this.currentLang;
    };
    /**
     * Get browser language code
     *
     * @returns {string | null} language code
     * @memberof Translate
     */
    Translate.prototype.getBrowserLang = function () {
        var lang;
        if (typeof navigator !== 'undefined') {
            if (navigator.languages) {
                lang = navigator.languages[0];
            }
            if (navigator['userLanguage']) {
                lang = navigator['userLanguage'];
            }
            if (navigator.language) {
                lang = navigator.language;
            }
        }
        return lang || null;
    };
    /**
     * Get translation
     *
     * @param {string} [key] translation key
     * @returns {string} translation label
     * @memberof Translate
     */
    Translate.prototype.getTranslation = function (key, placeholders, condition) {
        var currentTranslations = this.translations[this.currentLang];
        var translationKey = condition ? condition(key, placeholders) : key;
        var translationString = currentTranslations ? currentTranslations[translationKey] : null;
        // no translation use default
        if (!translationString) {
            var defaultTranslations = this.translations[this.defaultLang];
            translationString = defaultTranslations[translationKey] || translationKey;
        }
        if (placeholders) {
            translationString = this.parsePlaceholders(translationString, placeholders);
        }
        return translationString;
    };
    /**
     * Parse translation label placeholders
     *
     * @param {string} [source] translation label
     * @param {*} [placeholders] placeholders object
     * @returns {string} parsed translation label
     * @memberof Translate
     */
    Translate.prototype.parsePlaceholders = function (source, placeholders) {
        return source.replace(/{\s*\w+\s*}/g, function (match) {
            var key = match.replace(/{|}/g, '').trim();
            return placeholders[key] || match;
        });
    };
    return Translate;
}());
// exports
export var translate = new Translate();
export var _t = translate.getTranslation.bind(translate);
