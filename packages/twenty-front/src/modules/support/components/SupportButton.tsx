import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { IconHelpCircle } from 'twenty-ui';

import { SupportButtonSkeletonLoader } from '@/support/components/SupportButtonSkeletonLoader';
import { useSupportChat } from '@/support/hooks/useSupportChat';
import { Button } from '@/ui/input/button/components/Button';

const StyledButtonContainer = styled.div`
  display: flex;
`;

export const SupportButton = () => {
  const { t } = useTranslation();

  const { loading, isFrontChatLoaded } = useSupportChat();

  if (loading) {
    return <SupportButtonSkeletonLoader />;
  }

  return isFrontChatLoaded ? (
    <StyledButtonContainer>
      <Button
        variant="tertiary"
        size="small"
        title={t('supportButton.support')}
        Icon={IconHelpCircle}
      />
    </StyledButtonContainer>
  ) : null;
};
