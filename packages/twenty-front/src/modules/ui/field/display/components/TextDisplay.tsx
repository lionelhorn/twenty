import { OverflowingTextWithTooltip } from 'twenty-ui';

type TextDisplayProps = {
  text: string;
};

export const TextDisplay = ({ text }: TextDisplayProps) => {
  return <OverflowingTextWithTooltip text={text} />;
};
