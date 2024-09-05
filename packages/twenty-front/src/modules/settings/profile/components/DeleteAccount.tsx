import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { H2Title } from 'twenty-ui';

import { useAuth } from '@/auth/hooks/useAuth';
import { currentUserState } from '@/auth/states/currentUserState';
import { Button } from '@/ui/input/button/components/Button';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useDeleteUserAccountMutation } from '~/generated/graphql';

export const DeleteAccount = () => {
  const { t } = useTranslation();

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const currentUser = useRecoilValue(currentUserState);
  const userEmail = currentUser?.email;
  const { signOut } = useAuth();

  const deleteAccount = async () => {
    await deleteUserAccount();
    await signOut();
  };

  return (
    <>
      <H2Title
        title={t('deleteAccount.danger-zone')}
        description={t(
          'deleteAccount.delete-account-and-all-the-associated-da',
        )}
      />
      <Button
        accent="danger"
        onClick={() => setIsDeleteAccountModalOpen(true)}
        variant="secondary"
        title={t('deleteAccount.delete-account')}
      />
      <ConfirmationModal
        confirmationValue={userEmail}
        confirmationPlaceholder={userEmail ?? ''}
        isOpen={isDeleteAccountModalOpen}
        setIsOpen={setIsDeleteAccountModalOpen}
        title={t('deleteAccount.account-deletion')}
        subtitle={
          <>
            {t('deleteAccount.this-action-cannot-be-undone-this-will-p')} <br />{' '}
            {t('deleteAccount.please-type-in-your-email-to-confirm')}
          </>
        }
        onConfirmClick={deleteAccount}
        deleteButtonText="Delete account"
      />
    </>
  );
};
