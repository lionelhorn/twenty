import { useTranslation } from 'react-i18next';
import { IconBook2 } from 'twenty-ui';

import { Button } from '@/ui/input/button/components/Button';

export const SettingsReadDocumentationButton = () => {
  const { t } = useTranslation();

  return (
    <Button
      title={t('settingsReadDocumentationButton.read-documentation')}
      variant="primary"
      accent="default"
      size="small"
      Icon={IconBook2}
      to={'https://docs.twenty.com'}
      target="_blank"
    ></Button>
  );
};
