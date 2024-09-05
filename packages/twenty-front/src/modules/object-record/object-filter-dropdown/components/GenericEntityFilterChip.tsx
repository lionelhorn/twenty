import { AvatarChip, IconComponent } from 'twenty-ui';

import { Filter } from '../types/Filter';

type GenericEntityFilterChipProps = {
  filter: Filter;
  Icon?: IconComponent;
};

export const GenericEntityFilterChip = ({
  filter,
  Icon,
}: GenericEntityFilterChipProps) => {
  return (
    <AvatarChip
      placeholderColorSeed={filter.value}
      name={filter.displayValue}
      avatarType="rounded"
      avatarUrl={filter.displayAvatarUrl}
      LeftIcon={Icon}
    />
  );
};
