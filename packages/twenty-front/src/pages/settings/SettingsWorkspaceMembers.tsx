import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { H2Title, IconTrash, IconUsers } from 'twenty-ui';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { IconButton } from '@/ui/input/button/components/IconButton';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';
import { WorkspaceInviteLink } from '@/workspace/components/WorkspaceInviteLink';
import { WorkspaceInviteTeam } from '@/workspace/components/WorkspaceInviteTeam';
import { WorkspaceMemberCard } from '@/workspace/components/WorkspaceMemberCard';

const StyledButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-left: ${({ theme }) => theme.spacing(3)};
`;

export const SettingsWorkspaceMembers = () => {
  const { t } = useTranslation();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [workspaceMemberToDelete, setWorkspaceMemberToDelete] = useState<
    string | undefined
  >();

  const { records: workspaceMembers } = useFindManyRecords<WorkspaceMember>({
    objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
  });
  const { deleteOneRecord: deleteOneWorkspaceMember } = useDeleteOneRecord({
    objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
  });
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);

  const handleRemoveWorkspaceMember = async (workspaceMemberId: string) => {
    await deleteOneWorkspaceMember?.(workspaceMemberId);
    setIsConfirmationModalOpen(false);
  };

  return (
    <SubMenuTopBarContainer
      Icon={IconUsers}
      title={t('settingsWorkspaceMembers.members')}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title
            title={t('settingsWorkspaceMembers.invite-by-email')}
            description={t(
              'settingsWorkspaceMembers.send-an-invite-email-to-your-team',
            )}
          />
          <WorkspaceInviteTeam />
        </Section>
        {currentWorkspace?.inviteHash && (
          <Section>
            <H2Title
              title={t('settingsWorkspaceMembers.or-send-an-invite-link')}
              description={t(
                'settingsWorkspaceMembers.copy-and-send-an-invite-link-directly',
              )}
            />
            <WorkspaceInviteLink
              inviteLink={`${window.location.origin}/invite/${currentWorkspace?.inviteHash}`}
            />
          </Section>
        )}
        <Section>
          <H2Title
            title={t('settingsWorkspaceMembers.members')}
            description={t(
              'settingsWorkspaceMembers.manage-the-members-of-your-space-here',
            )}
          />
          {workspaceMembers?.map((member) => {
            return (
              <WorkspaceMemberCard
                key={member.id}
                workspaceMember={member as WorkspaceMember}
                accessory={
                  currentWorkspaceMember?.id !== member.id && (
                    <StyledButtonContainer>
                      <IconButton
                        onClick={() => {
                          setIsConfirmationModalOpen(true);
                          setWorkspaceMemberToDelete(member.id);
                        }}
                        variant="tertiary"
                        size="medium"
                        Icon={IconTrash}
                      />
                    </StyledButtonContainer>
                  )
                }
              />
            );
          })}
        </Section>
      </SettingsPageContainer>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        title={t('settingsWorkspaceMembers.account-deletion')}
        subtitle={
          <>
            {t(
              'settingsWorkspaceMembers.this-action-cannot-be-undone-this-will-p',
            )}
          </>
        }
        onConfirmClick={() =>
          workspaceMemberToDelete &&
          handleRemoveWorkspaceMember(workspaceMemberToDelete)
        }
        deleteButtonText="Delete account"
      />
    </SubMenuTopBarContainer>
  );
};
