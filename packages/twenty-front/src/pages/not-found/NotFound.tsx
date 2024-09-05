import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

import { SignInBackgroundMockPage } from '@/sign-in-background-mock/components/SignInBackgroundMockPage';
import { AppPath } from '@/types/AppPath';
import { MainButton } from '@/ui/input/button/components/MainButton';
import AnimatedPlaceholder from '@/ui/layout/animated-placeholder/components/AnimatedPlaceholder';
import { AnimatedPlaceholderEmptyTextContainer } from '@/ui/layout/animated-placeholder/components/EmptyPlaceholderStyled';
import {
  AnimatedPlaceholderErrorContainer,
  AnimatedPlaceholderErrorSubTitle,
  AnimatedPlaceholderErrorTitle,
} from '@/ui/layout/animated-placeholder/components/ErrorPlaceholderStyled';
import { UndecoratedLink } from '@/ui/navigation/link/components/UndecoratedLink';
import { PageTitle } from '@/ui/utilities/page-title/PageTitle';

const StyledBackDrop = styled.div`
  align-items: center;
  backdrop-filter: ${({ theme }) => theme.blur.light};
  background: ${({ theme }) => theme.background.transparent.secondary};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
`;

const StyledButtonContainer = styled.div`
  width: 200px;
`;

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t('notFound.page-not-found-or-twenty')} />
      <StyledBackDrop>
        <AnimatedPlaceholderErrorContainer>
          <AnimatedPlaceholder type="error404" />
          <AnimatedPlaceholderEmptyTextContainer>
            <AnimatedPlaceholderErrorTitle>
              {t('notFound.off-the-beaten-path')}
            </AnimatedPlaceholderErrorTitle>
            <AnimatedPlaceholderErrorSubTitle>
              {t('notFound.the-page-youre-seeking-is-either-gone-or')}
            </AnimatedPlaceholderErrorSubTitle>
          </AnimatedPlaceholderEmptyTextContainer>
          <StyledButtonContainer>
            <UndecoratedLink to={AppPath.Index}>
              <MainButton title={t('notFound.back-to-content')} fullWidth />
            </UndecoratedLink>
          </StyledButtonContainer>
        </AnimatedPlaceholderErrorContainer>
      </StyledBackDrop>
      <SignInBackgroundMockPage />
    </>
  );
};
