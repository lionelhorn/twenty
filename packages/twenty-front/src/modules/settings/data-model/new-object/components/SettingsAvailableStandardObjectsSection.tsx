import { useTranslation } from 'react-i18next';
import { H2Title } from 'twenty-ui';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { Section } from '@/ui/layout/section/components/Section';
import { Table } from '@/ui/layout/table/components/Table';
import { TableBody } from '@/ui/layout/table/components/TableBody';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';

import {
  SettingsAvailableStandardObjectItemTableRow,
  StyledAvailableStandardObjectTableRow,
} from './SettingsAvailableStandardObjectItemTableRow';

type SettingsAvailableStandardObjectsSectionProps = {
  objectItems: ObjectMetadataItem[];
  onChange: (selectedIds: Record<string, boolean>) => void;
  selectedIds: Record<string, boolean>;
};

export const SettingsAvailableStandardObjectsSection = ({
  objectItems,
  onChange,
  selectedIds,
}: SettingsAvailableStandardObjectsSectionProps) => {
  const { t } = useTranslation();

  return (
    <Section>
      <H2Title
        title={t('settingsAvailableStandardObjectsSection.available')}
        description={t(
          'settingsAvailableStandardObjectsSection.select-one-or-several-standard-objects-t',
        )}
      />
      <Table>
        <StyledAvailableStandardObjectTableRow>
          <TableHeader></TableHeader>
          <TableHeader>
            {t('settingsAvailableStandardObjectsSection.name')}
          </TableHeader>
          <TableHeader>
            {t('settingsAvailableStandardObjectsSection.description')}
          </TableHeader>
          <TableHeader align="right">
            {t('settingsAvailableStandardObjectsSection.fields')}
          </TableHeader>
        </StyledAvailableStandardObjectTableRow>
        <TableBody>
          {objectItems.map((objectItem) => {
            return (
              <SettingsAvailableStandardObjectItemTableRow
                key={objectItem.id}
                isSelected={selectedIds[objectItem.id]}
                objectItem={objectItem}
                onClick={() =>
                  onChange({
                    ...selectedIds,
                    [objectItem.id]: !selectedIds[objectItem.id],
                  })
                }
              />
            );
          })}
        </TableBody>
      </Table>
    </Section>
  );
};
