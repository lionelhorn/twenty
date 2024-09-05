import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { isLoadingTokensFromExtensionState } from '@/chrome-extension-sidecar/states/isLoadingTokensFromExtensionState';
import { chromeExtensionIdState } from '@/client-config/states/chromeExtensionIdState';
import { isDefined } from '~/utils/isDefined';
import { isInFrame } from '~/utils/isInIframe';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

const AppInaccessible = ({ message }: { message: string }) => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <img
        src="/images/integrations/twenty-logo.svg"
        alt={t('appInaccessible.twenty-icon')}
        height={40}
        width={40}
      />
      <h3>{message}</h3>
    </StyledContainer>
  );
};

export const ChromeExtensionSidecarProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const { t } = useTranslation();

  const isLoadingTokensFromExtension = useRecoilValue(
    isLoadingTokensFromExtensionState,
  );
  const chromeExtensionId = useRecoilValue(chromeExtensionIdState);

  if (!isInFrame()) return <>{children}</>;

  if (!isDefined(chromeExtensionId))
    return (
      <AppInaccessible
        message={t(
          'chromeExtensionSidecarProvider.twenty-is-not-accessible-inside-an-ifram',
          {},
        )}
      />
    );

  if (isDefined(isLoadingTokensFromExtension) && !isLoadingTokensFromExtension)
    return (
      <AppInaccessible
        message={t(
          'chromeExtensionSidecarProvider.unauthorized-access-from-iframe-origin-i',
          {},
        )}
      />
    );

  return isLoadingTokensFromExtension && <>{children}</>;
};
