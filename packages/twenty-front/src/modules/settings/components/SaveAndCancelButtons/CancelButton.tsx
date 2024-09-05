import { useTranslation } from 'react-i18next';
import { LightButton } from '@/ui/input/button/components/LightButton';

type CancelButtonProps = {
  onCancel?: () => void;
  disabled?: boolean;
};

export const CancelButton = ({
  onCancel,
  disabled = false,
}: CancelButtonProps) => {
  const { t } = useTranslation();

  return (
    <LightButton
      title={t('cancelButton.cancel')}
      accent="tertiary"
      onClick={onCancel}
      disabled={disabled}
    />
  );
};
