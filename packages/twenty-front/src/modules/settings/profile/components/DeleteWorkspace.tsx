import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { H2Title, IconTrash } from 'twenty-ui';

import { useAuth } from '@/auth/hooks/useAuth';
import { currentUserState } from '@/auth/states/currentUserState';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useDeleteCurrentWorkspaceMutation } from '~/generated/graphql';
import { Button } from '@/ui/input/button/components/Button';
export const DeleteWorkspace = () => {
  const { t } = useTranslation();

  const [isDeleteWorkSpaceModalOpen, setIsDeleteWorkSpaceModalOpen] =
    useState(false);

  const [deleteCurrentWorkspace] = useDeleteCurrentWorkspaceMutation();
  const currentUser = useRecoilValue(currentUserState);
  const userEmail = currentUser?.email;

  const { signOut } = useAuth();

  const deleteWorkspace = async () => {
    await deleteCurrentWorkspace();
    await signOut();
  };

  return (
    <>
      <H2Title
        title={t('deleteWorkspace.danger-zone')}
        description={t('deleteWorkspace.delete-your-whole-workspace')}
      />
      <Button
        accent="danger"
        variant="secondary"
        title={t('deleteWorkspace.delete-workspace')}
        Icon={IconTrash}
        onClick={() => setIsDeleteWorkSpaceModalOpen(true)}
      />
      <ConfirmationModal
        confirmationPlaceholder={userEmail}
        confirmationValue={userEmail}
        isOpen={isDeleteWorkSpaceModalOpen}
        setIsOpen={setIsDeleteWorkSpaceModalOpen}
        title={t('deleteWorkspace.workspace-deletion')}
        subtitle={
          <>
            {t('deleteWorkspace.this-action-cannot-be-undone-this-will-p')}{' '}
            <br /> {t('deleteWorkspace.please-type-in-your-email-to-confirm')}
          </>
        }
        onConfirmClick={deleteWorkspace}
        deleteButtonText="Delete workspace"
      />
    </>
  );
};
