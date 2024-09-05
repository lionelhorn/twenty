import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { H2Title } from 'twenty-ui';

import { currentUserState } from '@/auth/states/currentUserState';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { Button } from '@/ui/input/button/components/Button';
import { useEmailPasswordResetLinkMutation } from '~/generated/graphql';

export const ChangePassword = () => {
  const { t } = useTranslation();

  const { enqueueSnackBar } = useSnackBar();

  const currentUser = useRecoilValue(currentUserState);

  const [emailPasswordResetLink] = useEmailPasswordResetLinkMutation();

  const handlePasswordResetClick = async () => {
    if (!currentUser?.email) {
      enqueueSnackBar('Invalid email', {
        variant: SnackBarVariant.Error,
      });
      return;
    }

    try {
      const { data } = await emailPasswordResetLink({
        variables: {
          email: currentUser.email,
        },
      });
      if (data?.emailPasswordResetLink?.success === true) {
        enqueueSnackBar('Password reset link has been sent to the email', {
          variant: SnackBarVariant.Success,
        });
      } else {
        enqueueSnackBar('There was some issue', {
          variant: SnackBarVariant.Error,
        });
      }
    } catch (error) {
      enqueueSnackBar((error as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    <>
      <H2Title
        title={t('changePassword.change-password')}
        description={t(
          'changePassword.receive-an-email-containing-password-upd',
        )}
      />
      <Button
        onClick={handlePasswordResetClick}
        variant="secondary"
        title={t('changePassword.change-password')}
      />
    </>
  );
};
