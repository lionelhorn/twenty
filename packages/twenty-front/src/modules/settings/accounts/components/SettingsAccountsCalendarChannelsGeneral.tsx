import { useTranslation } from 'react-i18next';
import { CalendarMonthCard } from '@/activities/calendar/components/CalendarMonthCard';
import { CalendarContext } from '@/activities/calendar/contexts/CalendarContext';
import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { SettingsAccountsCalendarDisplaySettings } from '@/settings/accounts/components/SettingsAccountsCalendarDisplaySettings';
import styled from '@emotion/styled';
import { Section } from '@react-email/components';
import { addMinutes, endOfDay, min, startOfDay } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { H2Title } from 'twenty-ui';
import {
  CalendarChannelVisibility,
  TimelineCalendarEvent,
} from '~/generated/graphql';

const StyledGeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  padding-top: ${({ theme }) => theme.spacing(6)};
`;

export const SettingsAccountsCalendarChannelsGeneral = () => {
  const { t } = useTranslation();

  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);

  const exampleStartDate = new Date();
  const exampleEndDate = min([
    addMinutes(exampleStartDate, 30),
    endOfDay(exampleStartDate),
  ]);
  const exampleDayTime = startOfDay(exampleStartDate).getTime();
  const exampleCalendarEvent: TimelineCalendarEvent = {
    id: '',
    participants: [
      {
        firstName: currentWorkspaceMember?.name.firstName || '',
        lastName: currentWorkspaceMember?.name.lastName || '',
        displayName: currentWorkspaceMember
          ? [
              currentWorkspaceMember.name.firstName,
              currentWorkspaceMember.name.lastName,
            ].join(' ')
          : '',
        avatarUrl: currentWorkspaceMember?.avatarUrl || '',
        handle: '',
        personId: '',
        workspaceMemberId: currentWorkspaceMember?.id || '',
      },
    ],
    endsAt: exampleEndDate.toISOString(),
    isFullDay: false,
    startsAt: exampleStartDate.toISOString(),
    conferenceSolution: '',
    conferenceLink: {
      primaryLinkLabel: '',
      primaryLinkUrl: '',
    },
    description: '',
    isCanceled: false,
    location: '',
    title: 'Onboarding call',
    visibility: CalendarChannelVisibility.ShareEverything,
  };

  return (
    <StyledGeneralContainer>
      <Section>
        <H2Title
          title={t('settingsAccountsCalendarChannelsGeneral.display')}
          description={t(
            'settingsAccountsCalendarChannelsGeneral.configure-how-we-should-display-your-eve',
          )}
        />
        <SettingsAccountsCalendarDisplaySettings />
      </Section>
      <Section>
        <H2Title
          title={t('settingsAccountsCalendarChannelsGeneral.color-code')}
          description={t(
            'settingsAccountsCalendarChannelsGeneral.events-you-participated-in-are-displayed',
          )}
        />
        <CalendarContext.Provider
          value={{
            currentCalendarEvent: exampleCalendarEvent,
            calendarEventsByDayTime: {
              [exampleDayTime]: [exampleCalendarEvent],
            },
            getNextCalendarEvent: () => undefined,
            updateCurrentCalendarEvent: () => {},
          }}
        >
          <CalendarMonthCard dayTimes={[exampleDayTime]} />
        </CalendarContext.Provider>
      </Section>
    </StyledGeneralContainer>
  );
};
