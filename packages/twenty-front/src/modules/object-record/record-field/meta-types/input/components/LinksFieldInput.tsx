import { useLinksField } from '@/object-record/record-field/meta-types/hooks/useLinksField';
import { LinksFieldMenuItem } from '@/object-record/record-field/meta-types/input/components/LinksFieldMenuItem';
import { useMemo } from 'react';
import { isDefined } from 'twenty-ui';
import { absoluteUrlSchema } from '~/utils/validation-schemas/absoluteUrlSchema';
import { MultiItemFieldInput } from './MultiItemFieldInput';

type LinksFieldInputProps = {
  onCancel?: () => void;
};

export const LinksFieldInput = ({ onCancel }: LinksFieldInputProps) => {
  const { persistLinksField, hotkeyScope, fieldValue } = useLinksField();

  const links = useMemo<{ url: string; label: string }[]>(
    () =>
      [
        fieldValue.primaryLinkUrl
          ? {
              url: fieldValue.primaryLinkUrl,
              label: fieldValue.primaryLinkLabel,
            }
          : null,
        ...(fieldValue.secondaryLinks ?? []),
      ].filter(isDefined),
    [
      fieldValue.primaryLinkLabel,
      fieldValue.primaryLinkUrl,
      fieldValue.secondaryLinks,
    ],
  );

  const handlePersistLinks = (
    updatedLinks: { url: string; label: string }[],
  ) => {
    const [nextPrimaryLink, ...nextSecondaryLinks] = updatedLinks;
    persistLinksField({
      primaryLinkUrl: nextPrimaryLink?.url ?? '',
      primaryLinkLabel: nextPrimaryLink?.label ?? '',
      secondaryLinks: nextSecondaryLinks,
    });
  };

  return (
    <MultiItemFieldInput
      items={links}
      onPersist={handlePersistLinks}
      onCancel={onCancel}
      placeholder="URL"
      validateInput={(input) => absoluteUrlSchema.safeParse(input).success}
      formatInput={(input) => ({ url: input, label: '' })}
      renderItem={({
        value: link,
        index,
        handleEdit,
        handleSetPrimary,
        handleDelete,
      }) => {
        return (
          <LinksFieldMenuItem
            key={index}
            dropdownId={`${hotkeyScope}-links-${index}`}
            isPrimary={index === 0}
            label={link.label}
            onEdit={handleEdit}
            onSetAsPrimary={handleSetPrimary}
            onDelete={handleDelete}
            url={link.url}
          />
        );
      }}
      hotkeyScope={hotkeyScope}
    />
  );
};
