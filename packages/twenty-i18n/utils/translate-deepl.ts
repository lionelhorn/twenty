import 'dotenv/config';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { deepKeys, getProperty, setProperty } from 'dot-prop';
import { resolve } from 'node:path';
import * as deepl from 'deepl-node';

const pathToInput = '../twenty-front/public/locales/en/common.json';
const pathToTranslatedDir = '../twenty-front/public/locales/fr/';
const pathToTranslatedFile = resolve(pathToTranslatedDir, 'common.json');

const sourceLang = 'en';
const targetLang = 'fr';

const authKey = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(authKey);

(async () => {
  const excludePredicates = [
    (key: string, value: string) => value === '',
    (key: string, value: string) => value.includes('__typename'),
    (key: string, value: string) => key.length === 0,
  ];

  const inputStr = await readFile(pathToInput, 'utf8');
  const inputJson = JSON.parse(inputStr);

  const outputJson: Record<string, any> = {}; // inputJson;

  const allInputKeys = deepKeys(inputJson)

  let idx = -1;

  const keysAndValues = allInputKeys.map(((key) => {
    const value = getProperty(inputJson, key, null);

    for (const predicate of excludePredicates) {
      if (predicate(key, value)) {
        return null;
      }
    }

    idx++;

    return {
      key,
      value: getProperty(inputJson, key, null),
      idx: idx
    };

  })).filter(Boolean);

  const translatedValues = await translator.translateText(keysAndValues.map(kv => kv.value), sourceLang, targetLang);

  // Simulate translation
  // const translatedValues = keysAndValues.map(({ value, key }) => ({text: value, key }));

  for (let i = 0; i < keysAndValues.length -1; i++) {
    const { key, value, idx } = keysAndValues[i];

    const translatedText = translatedValues[idx]?.text;

    if (translatedText) {
      setProperty(outputJson, key, translatedText);
    }
  }

  await mkdir(pathToTranslatedDir, { recursive: true });
  await writeFile(pathToTranslatedFile, JSON.stringify(outputJson, null, 2));
})();