import { useTranslation } from 'react-i18next';
import { H2Title, IconSettings } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { DeleteWorkspace } from '@/settings/profile/components/DeleteWorkspace';
import { NameField } from '@/settings/workspace/components/NameField';
import { ToggleImpersonate } from '@/settings/workspace/components/ToggleImpersonate';
import { WorkspaceLogoUploader } from '@/settings/workspace/components/WorkspaceLogoUploader';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';

export const SettingsWorkspace = () => {
  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer
      Icon={IconSettings}
      title={t('settingsWorkspace.general')}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title title={t('settingsWorkspace.picture')} />
          <WorkspaceLogoUploader />
        </Section>
        <Section>
          <H2Title
            title={t('settingsWorkspace.name')}
            description={t('settingsWorkspace.name-of-your-workspace')}
          />
          <NameField />
        </Section>
        <Section>
          <H2Title
            title={t('settingsWorkspace.support')}
            addornment={<ToggleImpersonate />}
            description={t(
              'settingsWorkspace.grant-twenty-support-temporary-access-to',
            )}
          />
        </Section>
        <Section>
          <DeleteWorkspace />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
