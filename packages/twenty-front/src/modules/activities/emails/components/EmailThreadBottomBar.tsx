import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { IconArrowBackUp, IconUserCircle } from 'twenty-ui';

import { Button } from '@/ui/input/button/components/Button';

const StyledThreadBottomBar = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(6)};
  padding-right: ${({ theme }) => theme.spacing(6)};
  padding-top: ${({ theme }) => theme.spacing(4)};
`;

export const ThreadBottomBar = () => {
  const { t } = useTranslation();

  return (
    <StyledThreadBottomBar>
      <Button
        Icon={IconArrowBackUp}
        title={t('threadBottomBar.reply')}
        variant="secondary"
        accent="default"
      />
      <Button
        Icon={IconArrowBackUp}
        title={t('threadBottomBar.reply-to-all')}
        variant="secondary"
        accent="default"
      />
      <Button
        Icon={IconUserCircle}
        title={t('threadBottomBar.share')}
        variant="secondary"
        accent="default"
      />
    </StyledThreadBottomBar>
  );
};
