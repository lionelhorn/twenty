import { useTranslation } from 'react-i18next';
import { IconSettings } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsIntegrationDatabaseConnectionShowContainer } from '@/settings/integrations/database-connection/components/SettingsIntegrationDatabaseConnectionShowContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';

export const SettingsIntegrationShowDatabaseConnection = () => {
  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer
      Icon={IconSettings}
      title={t('settingsIntegrationShowDatabaseConnection.settings')}
    >
      <SettingsPageContainer>
        <SettingsIntegrationDatabaseConnectionShowContainer />
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
