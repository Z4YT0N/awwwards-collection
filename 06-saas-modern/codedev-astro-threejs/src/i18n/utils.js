import { ui, defaultLang, showDefaultLang, languages } from './ui';

export function getLangFromUrl (url) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang;
	return defaultLang;
}

export function useTranslations (lang) {
	return function t (key) {
		return ui[lang][key] || ui[defaultLang][key];
	}
}

export function useTranslatedPath (lang) {
	return function translatePath (path, l = lang) {
		const validLanguages = Object.keys(languages);
		const currentLangPattern = new RegExp(`^/(${validLanguages.join('|')})(/|$)`);

		if (currentLangPattern.test(path)) path = path.replace(currentLangPattern, '/');
		if (!showDefaultLang && l === defaultLang) return path;

		return `/${l}${path}`;
	}
}