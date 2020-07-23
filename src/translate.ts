type LANG_CODE = string | null;
type TRANSLATIONS = {
  [key: string]: string;
};
type PLACEHOLDERS = {
  [key: string]: string | number;
};
type CONDITION_FUNC = (key: string, placeholders: PLACEHOLDERS) => string;

class Translate {
  private defaultLang: LANG_CODE = null;
  private currentLang: LANG_CODE = null;
  private translations: {
    [key: string]: TRANSLATIONS;
  } = {};

  public init({ defaultLang, translations }) {
    if (defaultLang) {
      this.setDefaultLang(defaultLang);
    }
    if (translations) {
      Object.keys(translations).forEach((code) => {
        this.setLangTranslations(code, translations[code]);
      });
    }
  }

  public setDefaultLang(code: string): void {
    this.defaultLang = code;
  }
  public setCurrentLang(code: string): void {
    this.currentLang = code;
  }
  public setLangTranslations(code: string, translations: TRANSLATIONS): void {
    if (this.translations[code]) {
      throw Error(`Translations for lang ${code} already exists`);
    }
    this.translations[code] = translations;
  }
  public setLangTranslation(code: string, key: string, translation: string): void {
    if (!this.translations[code]) {
      this.translations[code] = {};
    }
    this.translations[code][key] = translation;
  }
  public getDefaultLang(): LANG_CODE {
    return this.defaultLang;
  }
  public getCurrentLang(): LANG_CODE {
    return this.currentLang;
  }
  public getBrowserLang(): LANG_CODE {
    let lang: string;
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
  }
  public getTranslation(key: string, placeholders?: PLACEHOLDERS, condition?: CONDITION_FUNC) {
    const currentTranslations = this.translations[this.currentLang];
    const translationKey = condition ? condition(key, placeholders) : key;
    let translationString = currentTranslations ? currentTranslations[translationKey] : null;
    
    // no translation use default
    if (!translationString) {
      const defaultTranslations = this.translations[this.defaultLang];
      translationString = defaultTranslations[translationKey] || translationKey;
    }

    if (placeholders) {
      translationString = this.parsePlaceholders(translationString, placeholders);
    } 
    return translationString;
  }
  private parsePlaceholders(source: string, placeholders){
    return source.replace(/{\s*\w+\s*}/g, (match) => {
      const key = match.replace(/{|}/g, '').trim();
      return placeholders[key] || match;
    });
  }
}

// exports
export const translate = new Translate();
export const _t = translate.getTranslation.bind(translate);
