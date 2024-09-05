import { useTranslation } from 'react-i18next';
import { SettingsNewAccountSection } from '@/settings/accounts/components/SettingsNewAccountSection';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { IconAt } from 'twenty-ui';

export const SettingsNewAccount = () => {
  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer
      Icon={IconAt}
      title={
        <Breadcrumb
          links={[
            { children: 'Accounts', href: '/settings/accounts' },
            { children: t('settingsNewAccount.new', {}) },
          ]}
        />
      }
    >
      <SettingsPageContainer>
        <SettingsNewAccountSection />
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
