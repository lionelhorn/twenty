import { useTranslation } from 'react-i18next';
import { RecordChip } from '@/object-record/components/RecordChip';
import { useFindDuplicateRecords } from '@/object-record/hooks/useFindDuplicateRecords';
import { RecordDetailRecordsList } from '@/object-record/record-show/record-detail-section/components/RecordDetailRecordsList';
import { RecordDetailRecordsListItem } from '@/object-record/record-show/record-detail-section/components/RecordDetailRecordsListItem';
import { RecordDetailSection } from '@/object-record/record-show/record-detail-section/components/RecordDetailSection';
import { RecordDetailSectionHeader } from '@/object-record/record-show/record-detail-section/components/RecordDetailSectionHeader';

export const RecordDetailDuplicatesSection = ({
  objectRecordId,
  objectNameSingular,
}: {
  objectRecordId: string;
  objectNameSingular: string;
}) => {
  const { t } = useTranslation();

  const { results: queryResults } = useFindDuplicateRecords({
    objectRecordIds: [objectRecordId],
    objectNameSingular,
  });

  if (!queryResults || !queryResults[0] || queryResults[0].length === 0)
    return null;

  return (
    <RecordDetailSection>
      <RecordDetailSectionHeader
        title={t('recordDetailDuplicatesSection.duplicates')}
      />
      <RecordDetailRecordsList>
        {queryResults[0].slice(0, 5).map((duplicateRecord) => {
          return (
            <RecordDetailRecordsListItem key={duplicateRecord.id}>
              <RecordChip
                record={duplicateRecord}
                objectNameSingular={objectNameSingular}
              />
            </RecordDetailRecordsListItem>
          );
        })}
      </RecordDetailRecordsList>
    </RecordDetailSection>
  );
};
