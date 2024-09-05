import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { H2Title } from 'twenty-ui';

import { SettingsIntegrationComponent } from '@/settings/integrations/components/SettingsIntegrationComponent';
import { SettingsIntegrationCategory } from '@/settings/integrations/types/SettingsIntegrationCategory';
import { Section } from '@/ui/layout/section/components/Section';

interface SettingsIntegrationGroupProps {
  integrationGroup: SettingsIntegrationCategory;
}

const StyledIntegrationGroupHeader = styled.div`
  align-items: start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledGroupLink = styled(Link)`
  align-items: start;
  display: flex;
  flex-direction: row;
  font-size: ${({ theme }) => theme.font.size.md};
  gap: ${({ theme }) => theme.spacing(1)};
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledIntegrationsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const SettingsIntegrationGroup = ({
  integrationGroup,
}: SettingsIntegrationGroupProps) => {
  const { t } = useTranslation();

  return (
    <Section>
      <StyledIntegrationGroupHeader>
        <H2Title title={integrationGroup.title} />
        {integrationGroup.hyperlink && (
          <StyledGroupLink
            target={'_blank'}
            to={integrationGroup.hyperlink ?? ''}
          >
            <div>{integrationGroup.hyperlinkText}</div>
            <div>{t('settingsIntegrationGroup.')}</div>
          </StyledGroupLink>
        )}
      </StyledIntegrationGroupHeader>
      <StyledIntegrationsSection>
        {integrationGroup.integrations.map((integration) => {
          return (
            <SettingsIntegrationComponent
              key={[
                integrationGroup.key,
                integration.from.key,
                integration.to?.key,
              ].join('-')}
              integration={integration}
            />
          );
        })}
      </StyledIntegrationsSection>
    </Section>
  );
};
