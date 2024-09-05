import { useTranslation } from 'react-i18next';
import { IconX } from 'twenty-ui';

import { IconButton } from '@/ui/input/button/components/IconButton';

import {
  StyledContainer,
  StyledDialog,
  StyledHeading,
} from './KeyboardShortcutMenuStyles';

type KeyboardMenuDialogProps = {
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
};

export const KeyboardMenuDialog = ({
  onClose,
  children,
}: KeyboardMenuDialogProps) => {
  const { t } = useTranslation();

  return (
    <StyledDialog>
      <StyledHeading>
        {t('keyboardMenuDialog.keyboard-shortcuts')}
        <IconButton variant="tertiary" Icon={IconX} onClick={onClose} />
      </StyledHeading>
      <StyledContainer>{children}</StyledContainer>
    </StyledDialog>
  );
};
