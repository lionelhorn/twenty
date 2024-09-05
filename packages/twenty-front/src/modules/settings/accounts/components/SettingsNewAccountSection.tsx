import { useTranslation } from 'react-i18next';
import { H2Title } from 'twenty-ui';

import { SettingsAccountsListEmptyStateCard } from '@/settings/accounts/components/SettingsAccountsListEmptyStateCard';
import { Section } from '@/ui/layout/section/components/Section';

export const SettingsNewAccountSection = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <H2Title
        title={t('settingsNewAccountSection.new-account')}
        description={t(
          'settingsNewAccountSection.connect-a-new-account-to-your-workspace',
        )}
      />
      <SettingsAccountsListEmptyStateCard label="Connect a Google account" />
    </Section>
  );
};
