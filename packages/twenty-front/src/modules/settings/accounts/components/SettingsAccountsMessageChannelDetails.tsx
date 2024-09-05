import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { H2Title } from 'twenty-ui';

import {
  MessageChannel,
  MessageChannelContactAutoCreationPolicy,
} from '@/accounts/types/MessageChannel';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SettingsAccountsMessageAutoCreationCard } from '@/settings/accounts/components/SettingsAccountsMessageAutoCreationCard';
import { SettingsAccountsMessageVisibilityCard } from '@/settings/accounts/components/SettingsAccountsMessageVisibilityCard';
import { SettingsAccountsToggleSettingCard } from '@/settings/accounts/components/SettingsAccountsToggleSettingCard';
import { Section } from '@/ui/layout/section/components/Section';
import { MessageChannelVisibility } from '~/generated-metadata/graphql';

type SettingsAccountsMessageChannelDetailsProps = {
  messageChannel: Pick<
    MessageChannel,
    | 'id'
    | 'visibility'
    | 'contactAutoCreationPolicy'
    | 'excludeNonProfessionalEmails'
    | 'excludeGroupEmails'
    | 'isSyncEnabled'
  >;
};

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

export const SettingsAccountsMessageChannelDetails = ({
  messageChannel,
}: SettingsAccountsMessageChannelDetailsProps) => {
  const { t } = useTranslation();

  const { updateOneRecord } = useUpdateOneRecord<MessageChannel>({
    objectNameSingular: CoreObjectNameSingular.MessageChannel,
  });

  const handleVisibilityChange = (value: MessageChannelVisibility) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        visibility: value,
      },
    });
  };

  const handleContactAutoCreationChange = (
    value: MessageChannelContactAutoCreationPolicy,
  ) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        contactAutoCreationPolicy: value,
      },
    });
  };

  const handleIsGroupEmailExcludedToggle = (value: boolean) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        excludeGroupEmails: value,
      },
    });
  };

  const handleIsNonProfessionalEmailExcludedToggle = (value: boolean) => {
    updateOneRecord({
      idToUpdate: messageChannel.id,
      updateOneRecordInput: {
        excludeNonProfessionalEmails: value,
      },
    });
  };

  return (
    <StyledDetailsContainer>
      <Section>
        <H2Title
          title={t('settingsAccountsMessageChannelDetails.visibility')}
          description={t(
            'settingsAccountsMessageChannelDetails.define-what-will-be-visible-to-other-use',
          )}
        />
        <SettingsAccountsMessageVisibilityCard
          value={messageChannel.visibility}
          onChange={handleVisibilityChange}
        />
      </Section>
      <Section>
        <H2Title
          title={t(
            'settingsAccountsMessageChannelDetails.contact-auto-creation',
          )}
          description={t(
            'settingsAccountsMessageChannelDetails.automatically-create-people-records-when',
          )}
        />
        <SettingsAccountsMessageAutoCreationCard
          value={messageChannel.contactAutoCreationPolicy}
          onChange={handleContactAutoCreationChange}
        />
      </Section>
      <Section>
        <SettingsAccountsToggleSettingCard
          parameters={[
            {
              title: 'Exclude non-professional emails',
              description: 'Don’t sync emails from/to Gmail, Outlook...',
              value: !!messageChannel.excludeNonProfessionalEmails,
              onToggle: handleIsNonProfessionalEmailExcludedToggle,
            },
            {
              title: 'Exclude group emails',
              description: 'Don’t sync emails from team@ support@ noreply@...',
              value: !!messageChannel.excludeGroupEmails,
              onToggle: handleIsGroupEmailExcludedToggle,
            },
          ]}
        />
      </Section>
    </StyledDetailsContainer>
  );
};
