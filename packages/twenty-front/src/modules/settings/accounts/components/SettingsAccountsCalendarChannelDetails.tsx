import { useTranslation } from 'react-i18next';
import { CalendarChannel } from '@/accounts/types/CalendarChannel';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SettingsAccountsEventVisibilitySettingsCard } from '@/settings/accounts/components/SettingsAccountsCalendarVisibilitySettingsCard';
import { SettingsAccountsToggleSettingCard } from '@/settings/accounts/components/SettingsAccountsToggleSettingCard';
import styled from '@emotion/styled';
import { Section } from '@react-email/components';
import { H2Title } from 'twenty-ui';
import { CalendarChannelVisibility } from '~/generated-metadata/graphql';

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

type SettingsAccountsCalendarChannelDetailsProps = {
  calendarChannel: Pick<
    CalendarChannel,
    'id' | 'visibility' | 'isContactAutoCreationEnabled' | 'isSyncEnabled'
  >;
};

export const SettingsAccountsCalendarChannelDetails = ({
  calendarChannel,
}: SettingsAccountsCalendarChannelDetailsProps) => {
  const { t } = useTranslation();

  const { updateOneRecord } = useUpdateOneRecord<CalendarChannel>({
    objectNameSingular: CoreObjectNameSingular.CalendarChannel,
  });

  const handleVisibilityChange = (value: CalendarChannelVisibility) => {
    updateOneRecord({
      idToUpdate: calendarChannel.id,
      updateOneRecordInput: {
        visibility: value,
      },
    });
  };

  const handleContactAutoCreationToggle = (value: boolean) => {
    updateOneRecord({
      idToUpdate: calendarChannel.id,
      updateOneRecordInput: {
        isContactAutoCreationEnabled: value,
      },
    });
  };

  return (
    <StyledDetailsContainer>
      <Section>
        <H2Title
          title={t('settingsAccountsCalendarChannelDetails.event-visibility')}
          description={t(
            'settingsAccountsCalendarChannelDetails.define-what-will-be-visible-to-other-use',
          )}
        />
        <SettingsAccountsEventVisibilitySettingsCard
          value={calendarChannel.visibility}
          onChange={handleVisibilityChange}
        />
      </Section>
      <Section>
        <H2Title
          title={t(
            'settingsAccountsCalendarChannelDetails.contact-auto-creation',
          )}
          description={t(
            'settingsAccountsCalendarChannelDetails.automatically-create-contacts-for-people',
          )}
        />
        <SettingsAccountsToggleSettingCard
          parameters={[
            {
              value: !!calendarChannel.isContactAutoCreationEnabled,
              title: 'Auto-creation',
              description: 'Automatically create contacts for people.',
              onToggle: handleContactAutoCreationToggle,
            },
          ]}
        />
      </Section>
    </StyledDetailsContainer>
  );
};
