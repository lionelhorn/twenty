import { formatNumber } from '~/utils/format/number';

import { EllipsisDisplay } from './EllipsisDisplay';

type NumberDisplayProps = {
  value: string | number | null | undefined;
};

export const NumberDisplay = ({ value }: NumberDisplayProps) => {
  return (
    <EllipsisDisplay>{value && formatNumber(Number(value))}</EllipsisDisplay>
  );
};
