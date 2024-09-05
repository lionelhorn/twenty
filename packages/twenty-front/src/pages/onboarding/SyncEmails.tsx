import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { Key } from 'ts-key-enum';
import { IconGoogle } from 'twenty-ui';

import { SubTitle } from '@/auth/components/SubTitle';
import { Title } from '@/auth/components/Title';
import { currentUserState } from '@/auth/states/currentUserState';
import { OnboardingSyncEmailsSettingsCard } from '@/onboarding/components/OnboardingSyncEmailsSettingsCard';
import { useSetNextOnboardingStatus } from '@/onboarding/hooks/useSetNextOnboardingStatus';
import { useTriggerGoogleApisOAuth } from '@/settings/accounts/hooks/useTriggerGoogleApisOAuth';
import { AppPath } from '@/types/AppPath';
import { PageHotkeyScope } from '@/types/PageHotkeyScope';
import { MainButton } from '@/ui/input/button/components/MainButton';
import { ActionLink } from '@/ui/navigation/link/components/ActionLink';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import {
  CalendarChannelVisibility,
  MessageChannelVisibility,
  OnboardingStatus,
  useSkipSyncEmailOnboardingStepMutation,
} from '~/generated/graphql';

const StyledSyncEmailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: ${({ theme }) => theme.spacing(8)} 0;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledActionLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${({ theme }) => theme.spacing(3)} 0 0;
`;

export const SyncEmails = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const { triggerGoogleApisOAuth } = useTriggerGoogleApisOAuth();
  const setNextOnboardingStatus = useSetNextOnboardingStatus();
  const currentUser = useRecoilValue(currentUserState);
  const [visibility, setVisibility] = useState<MessageChannelVisibility>(
    MessageChannelVisibility.ShareEverything,
  );
  const [skipSyncEmailOnboardingStatusMutation] =
    useSkipSyncEmailOnboardingStepMutation();

  const handleButtonClick = async () => {
    const calendarChannelVisibility =
      visibility === MessageChannelVisibility.ShareEverything
        ? CalendarChannelVisibility.ShareEverything
        : CalendarChannelVisibility.Metadata;

    await triggerGoogleApisOAuth(
      AppPath.Index,
      visibility,
      calendarChannelVisibility,
    );
  };

  const continueWithoutSync = async () => {
    await skipSyncEmailOnboardingStatusMutation();
    setNextOnboardingStatus();
  };

  useScopedHotkeys(
    [Key.Enter],
    async () => {
      await continueWithoutSync();
    },
    PageHotkeyScope.SyncEmail,
    [continueWithoutSync],
  );

  if (currentUser?.onboardingStatus !== OnboardingStatus.SyncEmail) {
    return <></>;
  }

  return (
    <>
      <Title noMarginTop>{t('syncEmails.emails-and-calendar')}</Title>
      <SubTitle>
        {t('syncEmails.sync-your-emails-and-calendar-with-twent')}
      </SubTitle>
      <StyledSyncEmailsContainer>
        <OnboardingSyncEmailsSettingsCard
          value={visibility}
          onChange={setVisibility}
        />
      </StyledSyncEmailsContainer>
      <MainButton
        title={t('syncEmails.sync-with-google')}
        onClick={handleButtonClick}
        width={200}
        Icon={() => {
          return <IconGoogle size={theme.icon.size.sm} />;
        }}
      />
      <StyledActionLinkContainer>
        <ActionLink onClick={continueWithoutSync}>
          {t('syncEmails.continue-without-sync')}
        </ActionLink>
      </StyledActionLinkContainer>
    </>
  );
};
