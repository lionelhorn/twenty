import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Radio } from '@/ui/input/components/Radio';
import { Card } from '@/ui/layout/card/components/Card';
import { CardContent } from '@/ui/layout/card/components/CardContent';

type SettingsAccountsRadioSettingsCardProps<Option extends { value: string }> =
  {
    onChange: (nextValue: Option['value']) => void;
    options: Option[];
    value: Option['value'];
    name: string;
  };

const StyledCardContent = styled(CardContent)`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.background.transparent.lighter};
  }
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledRadio = styled(Radio)`
  margin-left: auto;
`;

export const SettingsAccountsRadioSettingsCard = ({
  onChange,
  options,
  value,
  name,
}: SettingsAccountsRadioSettingsCardProps<Option>) => {
  return (
    <Card rounded>
      {options.map((option, index) => {
        return (
          <StyledCardContent
            key={option.value}
            divider={index < options.length - 1}
            onClick={() => onChange(option.value)}
          >
            {option.cardMedia}
            <div>
              <StyledTitle>{option.title}</StyledTitle>
              <StyledDescription>{option.description}</StyledDescription>
            </div>
            <StyledRadio
              name={name}
              value={option.value}
              onCheckedChange={() => onChange(option.value)}
              checked={value === option.value}
            />
          </StyledCardContent>
        );
      })}
    </Card>
  );
};
