import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { H2Title, IconCode, IconPlus } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsApiKeysTable } from '@/settings/developers/components/SettingsApiKeysTable';
import { SettingsReadDocumentationButton } from '@/settings/developers/components/SettingsReadDocumentationButton';
import { SettingsWebhooksTable } from '@/settings/developers/components/SettingsWebhooksTable';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsDevelopers = () => {
  const { t } = useTranslation();

  return (
    <SubMenuTopBarContainer
      Icon={IconCode}
      title={t('settingsDevelopers.developers')}
      actionButton={<SettingsReadDocumentationButton />}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title
            title={t('settingsDevelopers.api-keys')}
            description={t(
              'settingsDevelopers.active-apis-keys-created-by-you-or-your-',
            )}
          />
          <SettingsApiKeysTable />
          <StyledButtonContainer>
            <Button
              Icon={IconPlus}
              title={t('settingsDevelopers.create-api-key')}
              size="small"
              variant="secondary"
              to={'/settings/developers/api-keys/new'}
            />
          </StyledButtonContainer>
        </Section>
        <Section>
          <H2Title
            title={t('settingsDevelopers.webhooks')}
            description={t(
              'settingsDevelopers.establish-webhook-endpoints-for-notifica',
            )}
          />
          <SettingsWebhooksTable />
          <StyledButtonContainer>
            <Button
              Icon={IconPlus}
              title={t('settingsDevelopers.create-webhook')}
              size="small"
              variant="secondary"
              to={'/settings/developers/webhooks/new'}
            />
          </StyledButtonContainer>
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
