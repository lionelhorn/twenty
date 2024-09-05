import { useTranslation } from 'react-i18next';
import {
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptySubTitle,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
  EMPTY_PLACEHOLDER_TRANSITION_PROPS,
} from '@/ui/layout/animated-placeholder/components/EmptyPlaceholderStyled';
import AnimatedPlaceholder from '@/ui/layout/animated-placeholder/components/AnimatedPlaceholder';
import { IconPlus } from 'twenty-ui';
import { Button } from '@/ui/input/button/components/Button';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import styled from '@emotion/styled';

const StyledEmptyFunctionsContainer = styled.div`
  height: 60vh;
`;

export const SettingsServerlessFunctionsTableEmpty = () => {
  const { t } = useTranslation();

  return (
    <StyledEmptyFunctionsContainer>
      <AnimatedPlaceholderEmptyContainer
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...EMPTY_PLACEHOLDER_TRANSITION_PROPS}
      >
        <AnimatedPlaceholder type="emptyFunctions" />
        <AnimatedPlaceholderEmptyTextContainer>
          <AnimatedPlaceholderEmptyTitle>
            {t('settingsServerlessFunctionsTableEmpty.add-your-first-function')}
          </AnimatedPlaceholderEmptyTitle>
          <AnimatedPlaceholderEmptySubTitle>
            {t(
              'settingsServerlessFunctionsTableEmpty.add-your-first-function-to-get-started',
            )}
          </AnimatedPlaceholderEmptySubTitle>
        </AnimatedPlaceholderEmptyTextContainer>
        <Button
          Icon={IconPlus}
          title={t('settingsServerlessFunctionsTableEmpty.new-function')}
          to={getSettingsPagePath(SettingsPath.NewServerlessFunction)}
        />
      </AnimatedPlaceholderEmptyContainer>
    </StyledEmptyFunctionsContainer>
  );
};
