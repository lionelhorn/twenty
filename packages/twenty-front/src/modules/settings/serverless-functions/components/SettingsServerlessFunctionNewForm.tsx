import { useTranslation } from 'react-i18next';
import { H2Title } from 'twenty-ui';
import { Section } from '@/ui/layout/section/components/Section';
import { TextInput } from '@/ui/input/components/TextInput';
import { TextArea } from '@/ui/input/components/TextArea';
import styled from '@emotion/styled';
import { ServerlessFunctionNewFormValues } from '@/settings/serverless-functions/hooks/useServerlessFunctionUpdateFormState';

const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const SettingsServerlessFunctionNewForm = ({
  formValues,
  onChange,
}: {
  formValues: ServerlessFunctionNewFormValues;
  onChange: (key: string) => (value: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Section>
      <H2Title
        title={t('settingsServerlessFunctionNewForm.about')}
        description={t(
          'settingsServerlessFunctionNewForm.name-and-set-your-function',
        )}
      />
      <StyledInputsContainer>
        <TextInput
          placeholder="Name"
          fullWidth
          focused
          value={formValues.name}
          onChange={onChange('name')}
        />
        <TextArea
          placeholder="Description"
          minRows={4}
          value={formValues.description}
          onChange={onChange('description')}
        />
      </StyledInputsContainer>
    </Section>
  );
};
