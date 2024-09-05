import { useTranslation } from 'react-i18next';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsIntegrationGroup } from '@/settings/integrations/components/SettingsIntegrationGroup';
import { useSettingsIntegrationCategories } from '@/settings/integrations/hooks/useSettingsIntegrationCategories';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { IconApps } from 'twenty-ui';

export const SettingsIntegrations = () => {
  const { t } = useTranslation();

  const integrationCategories = useSettingsIntegrationCategories();

  return (
    <SubMenuTopBarContainer
      Icon={IconApps}
      title={t('settingsIntegrations.integrations')}
    >
      <SettingsPageContainer>
        {integrationCategories.map((group) => {
          return (
            <SettingsIntegrationGroup
              key={group.key}
              integrationGroup={group}
            />
          );
        })}
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
