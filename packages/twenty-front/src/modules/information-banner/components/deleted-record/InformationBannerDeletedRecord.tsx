import { useTranslation } from 'react-i18next';
import { InformationBanner } from '@/information-banner/components/InformationBanner';
import { useRestoreManyRecords } from '@/object-record/hooks/useRestoreManyRecords';
import styled from '@emotion/styled';
import { IconRefresh } from 'twenty-ui';

const StyledInformationBannerDeletedRecord = styled.div`
  height: 40px;
  position: relative;

  &:empty {
    height: 0;
  }
`;

export const InformationBannerDeletedRecord = ({
  recordId,
  objectNameSingular,
}: {
  recordId: string;
  objectNameSingular: string;
}) => {
  const { t } = useTranslation();

  const { restoreManyRecords } = useRestoreManyRecords({
    objectNameSingular,
  });

  return (
    <StyledInformationBannerDeletedRecord>
      <InformationBanner
        variant="danger"
        message={t(
          'informationBannerDeletedRecord.this-record-has-been-deleted',
          {},
        )}
        buttonTitle="Restore"
        buttonIcon={IconRefresh}
        buttonOnClick={() => restoreManyRecords([recordId])}
      />
    </StyledInformationBannerDeletedRecord>
  );
};
