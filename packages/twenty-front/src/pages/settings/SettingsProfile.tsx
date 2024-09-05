import { useTranslation } from 'react-i18next';
import { H2Title, IconUserCircle } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { ChangePassword } from '@/settings/profile/components/ChangePassword';
import { DeleteAccount } from '@/settings/profile/components/DeleteAccount';
import { EmailField } from '@/settings/profile/components/EmailField';
import { NameFields } from '@/settings/profile/components/NameFields';
import { ProfilePictureUploader } from '@/settings/profile/components/ProfilePictureUploader';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';

export const SettingsProfile = () => {
  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer
      Icon={IconUserCircle}
      title={t('settingsProfile.profile')}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title title={t('settingsProfile.picture')} />
          <ProfilePictureUploader />
        </Section>
        <Section>
          <H2Title
            title={t('settingsProfile.name')}
            description={t('settingsProfile.your-name-as-it-will-be-displayed')}
          />
          <NameFields />
        </Section>
        <Section>
          <H2Title
            title={t('settingsProfile.email')}
            description={t(
              'settingsProfile.the-email-associated-to-your-account',
            )}
          />
          <EmailField />
        </Section>
        <Section>
          <ChangePassword />
        </Section>
        <Section>
          <DeleteAccount />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
