### Semi-auto transformation of twenty-front to add react-i18next

Start with no local changes or staged changes.

Open a terminal in `packages/twenty-i18n`
```shell
yarn codemod
git add -A
cd ../twenty-front
yarn format:staged
cd ../twenty-i18n
```

### Limitations
- Current version doesn't always properly add useTranslation at the correct spot. Sometimes it end in a useCallback (hooks can't be used in callbacks) ==> Maybe always use `import i18n from '~/utils/translation-utils';` with maybe a custom tspath. 

### Notes
Hooks in react component: 
Outside: https://github.com/i18next/react-i18next/issues/909

### TODO
- [ ] Constants in packages/twenty-front/src/modules/settings/integrations/constants/*
