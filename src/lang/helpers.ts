// Solution copied from obsidian-excalidraw-plugin: https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/master/src/lang/helpers.ts
import { getLanguage } from 'obsidian';
import en from './locale/en';
import zhCN from './locale/zh-cn';

const localeMap: { [key: string]: Partial<typeof en> } = {
  en,
  zh: zhCN,
  'zh-cn': zhCN,
  'zh-tw': zhCN,
};

export function t(localizationId: keyof typeof en, ...inserts: (string | number)[]): string {
  const lang = getLanguage().toLowerCase();
  const userLocale = localeMap[lang || 'en'];
  let localeStr = userLocale?.[localizationId] ?? en[localizationId] ?? localizationId;

  // Simple parameter substitution for {0}, {1}, etc.
  if (inserts.length > 0) {
    inserts.forEach((arg, index) => {
      localeStr = localeStr.replace(
        new RegExp(`\\{${index}\\}`, 'g'),
        String(arg)
      ) as (typeof en)[typeof localizationId];
    });
  }

  return localeStr;
}

/*
import ar from "./locale/ar";
import cz from "./locale/cz";
import da from "./locale/da";
import de from "./locale/de";
import en from "./locale/en";
import enGB from "./locale/en-gb";
import es from "./locale/es";
import fr from "./locale/fr";
import hi from "./locale/hi";
import id from "./locale/id";
import it from "./locale/it";
import ja from "./locale/ja";
import ko from "./locale/ko";
import nl from "./locale/nl";
import no from "./locale/no";
import pl from "./locale/pl";
import pt from "./locale/pt";
import ptBR from "./locale/pt-br";
import ro from "./locale/ro";
import ru from "./locale/ru";
import tr from "./locale/tr";
import zhCN from "./locale/zh-cn";
import zhTW from "./locale/zh-tw";
import { LOCALE } from "src/constants/constants";

const localeMap: { [k: string]: Partial<typeof en> } = {
  ar,
  cs: cz,
  da,
  de,
  en,
  "en-gb": enGB,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  nl,
  nn: no,
  pl,
  pt,
  "pt-br": ptBR,
  ro,
  ru,
  tr,
  "zh-cn": zhCN,
  "zh-tw": zhTW,
};*/
