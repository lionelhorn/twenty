import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconArrowUpRight, IconBolt, IconPlus, Pill } from 'twenty-ui';

import { SettingsIntegration } from '@/settings/integrations/types/SettingsIntegration';
import { Status } from '@/ui/display/status/components/Status';
import { Button } from '@/ui/input/button/components/Button';
import { isDefined } from '~/utils/isDefined';

interface SettingsIntegrationComponentProps {
  integration: SettingsIntegration;
}

const StyledContainer = styled.div<{ to?: string }>`
  align-items: center;
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  font-size: ${({ theme }) => theme.font.size.md};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  text-decoration: none;
  color: ${({ theme }) => theme.font.color.primary};

  ${({ to }) =>
    isDefined(to) &&
    css`
      cursor: pointer;
    `}
`;

const StyledSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledIntegrationLogo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.border.color.strong};
`;

const StyledSoonPill = styled(Pill)`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

const StyledLogo = styled.img`
  height: 24px;
  width: 24px;
`;

export const SettingsIntegrationComponent = ({
  integration,
}: SettingsIntegrationComponentProps) => {
  const { t } = useTranslation();

  return (
    <StyledContainer
      to={integration.type === 'Active' ? integration.link : undefined}
      as={integration.type === 'Active' ? Link : 'div'}
    >
      <StyledSection>
        <StyledIntegrationLogo>
          <StyledLogo src={integration.from.image} alt={integration.from.key} />
          {isDefined(integration.to) && (
            <>
              <div>{t('settingsIntegrationComponent.')}</div>
              <StyledLogo src={integration.to.image} alt={integration.to.key} />
            </>
          )}
        </StyledIntegrationLogo>
        {integration.text}
      </StyledSection>
      {integration.type === 'Soon' ? (
        <StyledSoonPill label="Soon" />
      ) : integration.type === 'Active' ? (
        <Status color="green" text="Active" />
      ) : integration.type === 'Add' ? (
        <Button
          to={integration.link}
          Icon={IconPlus}
          title={t('settingsIntegrationComponent.add')}
          size="small"
        />
      ) : integration.type === 'Use' ? (
        <Button
          to={integration.link}
          target="_blank"
          Icon={IconBolt}
          title={t('settingsIntegrationComponent.use')}
          size="small"
        />
      ) : (
        <Button
          to={integration.link}
          target="_blank"
          Icon={IconArrowUpRight}
          title={integration.linkText}
          size="small"
        />
      )}
    </StyledContainer>
  );
};
