import { useTranslation } from 'react-i18next';
import { H2Title, IconColorSwatch } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { ColorSchemePicker } from '@/ui/input/color-scheme/components/ColorSchemePicker';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { useColorScheme } from '@/ui/theme/hooks/useColorScheme';
import { DateTimeSettings } from '~/pages/settings/profile/appearance/components/DateTimeSettings';

export const SettingsAppearance = () => {
  const { t } = useTranslation();

  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <SubMenuTopBarContainer
      Icon={IconColorSwatch}
      title={t('settingsAppearance.appearance')}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title title={t('settingsAppearance.theme')} />
          <ColorSchemePicker value={colorScheme} onChange={setColorScheme} />
        </Section>
        <Section>
          <H2Title
            title={t('settingsAppearance.date-and-time')}
            description={t(
              'settingsAppearance.configure-how-dates-are-displayed-across',
            )}
          />
          <DateTimeSettings />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
