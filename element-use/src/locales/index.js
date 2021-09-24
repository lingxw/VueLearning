import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale';
import zh from './langs/zh'
import en from './langs/en.json'
import jp from './langs/ja.cson'
import myJp from './langs/my_ja.cson'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const locales = {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale),
    ja: Object.assign(jp, jaLocale)
}

const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    messages: locales
})

i18n.mergeLocaleMessage('ja', myJp)

locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export const setup = lang => {
    if (!lang) {
        lang = window.localStorage.getItem(LOCALE_KEY)
        if (!locales[lang]) {
            if (navigator && locales[navigator.language]) {
                lang = navigator.language
            } else {
                lang = DEFAULT_LANG
            }
        }
    }
    window.localStorage.setItem(LOCALE_KEY, lang)
    Object.keys(locales).forEach(lang => {
        document.body.classList.remove(`lang-${lang}`)
    })
    document.body.classList.add(`lang-${lang}`)
    document.body.setAttribute('lang', lang)
    Vue.config.lang = lang
    i18n.locale = lang
}

setup()
// window.$i18n = i18n

export default i18n