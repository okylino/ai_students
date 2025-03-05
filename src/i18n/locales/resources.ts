import { LANGUAGE } from '@/enums/language';

// The legacy i18n for fishing_cat resides in the translation file.
const nameSpaceList = ['translation', 'common', 'lesson', 'myClass', 'assignment'];

export const languageList = [LANGUAGE.EN, LANGUAGE.ZH];

const resources = await languageList.reduce(async (accResource, lang) => {
  const langData = await Promise.all(
    nameSpaceList.map((nameSpace) =>
      import(`@/i18n/locales/${lang}/${nameSpace}.json`)
        .then((module) => module.default)
        .catch((error) => {
          console.log('%c missing resource', 'color:red', error);
          return {};
        }),
    ),
  );

  const langResource = langData.reduce(
    (acc, nameSpaceData, index) => ({ ...acc, [nameSpaceList[index]]: nameSpaceData || {} }),
    {},
  );
  const acc = await accResource;
  return {
    ...acc,
    [lang]: langResource,
  };
}, Promise.resolve({}));

export default resources;
