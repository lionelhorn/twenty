import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { Card } from '@/ui/layout/card/components/Card';
import { CardContent } from '@/ui/layout/card/components/CardContent';

type SettingsDataModelPreviewFormCardProps = {
  className?: string;
  preview: ReactNode;
  form?: ReactNode;
};

const StyledPreviewContainer = styled(CardContent)`
  background-color: ${({ theme }) => theme.background.transparent.lighter};
`;

const StyledTitle = styled.h3`
  color: ${({ theme }) => theme.font.color.extraLight};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledFormContainer = styled(CardContent)`
  padding: 0;
`;

export const SettingsDataModelPreviewFormCard = ({
  className,
  preview,
  form,
}: SettingsDataModelPreviewFormCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className={className} fullWidth>
      <StyledPreviewContainer divider={!!form}>
        <StyledTitle>
          {t('settingsDataModelPreviewFormCard.preview')}
        </StyledTitle>
        {preview}
      </StyledPreviewContainer>
      {!!form && <StyledFormContainer>{form}</StyledFormContainer>}
    </Card>
  );
};
