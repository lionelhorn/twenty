import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useIcons } from 'twenty-ui';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';

type RecordDetailRelationRecordsListEmptyStateProps = {
  relationObjectMetadataItem: ObjectMetadataItem;
};

const StyledRelationRecordsListEmptyState = styled.div`
  color: ${({ theme }) => theme.font.color.light};
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  display: flex;
  height: ${({ theme }) => theme.spacing(10)};
  text-transform: capitalize;
`;

export const RecordDetailRelationRecordsListEmptyState = ({
  relationObjectMetadataItem,
}: RecordDetailRelationRecordsListEmptyStateProps) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const { getIcon } = useIcons();
  const Icon = getIcon(relationObjectMetadataItem.icon);

  return (
    <StyledRelationRecordsListEmptyState>
      <Icon size={theme.icon.size.sm} />
      <div>
        {t('recordDetailRelationRecordsListEmptyState.no')}{' '}
        {relationObjectMetadataItem.labelSingular}
      </div>
    </StyledRelationRecordsListEmptyState>
  );
};
