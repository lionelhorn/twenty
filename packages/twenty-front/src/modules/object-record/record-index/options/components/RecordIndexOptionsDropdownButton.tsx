import { useTranslation } from 'react-i18next';
import { RECORD_INDEX_OPTIONS_DROPDOWN_ID } from '@/object-record/record-index/options/constants/RecordIndexOptionsDropdownId';
import { StyledHeaderDropdownButton } from '@/ui/layout/dropdown/components/StyledHeaderDropdownButton';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';

export const RecordIndexOptionsDropdownButton = () => {
  const { t } = useTranslation();

  const { isDropdownOpen, toggleDropdown } = useDropdown(
    RECORD_INDEX_OPTIONS_DROPDOWN_ID,
  );

  return (
    <StyledHeaderDropdownButton
      isUnfolded={isDropdownOpen}
      onClick={toggleDropdown}
    >
      {t('recordIndexOptionsDropdownButton.options')}
    </StyledHeaderDropdownButton>
  );
};
