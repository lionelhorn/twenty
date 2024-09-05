import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { H2Title, IconCode, IconTrash } from 'twenty-ui';

import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { Webhook } from '@/settings/developers/types/webhook/Webhook';
import { Button } from '@/ui/input/button/components/Button';
import { Select } from '@/ui/input/components/Select';
import { TextArea } from '@/ui/input/components/TextArea';
import { TextInput } from '@/ui/input/components/TextInput';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';

const StyledFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsDevelopersWebhooksDetail = () => {
  const { t } = useTranslation();

  const { objectMetadataItems } = useObjectMetadataItems();
  const navigate = useNavigate();
  const { webhookId = '' } = useParams();

  const [isDeleteWebhookModalOpen, setIsDeleteWebhookModalOpen] =
    useState(false);

  const [description, setDescription] = useState<string>('');
  const [operationObjectSingularName, setOperationObjectSingularName] =
    useState<string>('');
  const [operationAction, setOperationAction] = useState('');
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { record: webhookData } = useFindOneRecord({
    objectNameSingular: CoreObjectNameSingular.Webhook,
    objectRecordId: webhookId,
    onCompleted: (data) => {
      setDescription(data?.description ?? '');
      setOperationObjectSingularName(data?.operation.split('.')[0] ?? '');
      setOperationAction(data?.operation.split('.')[1] ?? '');
      setIsDirty(false);
    },
  });

  const { deleteOneRecord: deleteOneWebhook } = useDeleteOneRecord({
    objectNameSingular: CoreObjectNameSingular.Webhook,
  });

  const deleteWebhook = () => {
    deleteOneWebhook(webhookId);
    navigate('/settings/developers');
  };

  const fieldTypeOptions = [
    { value: '*', label: 'All Objects' },
    ...objectMetadataItems.map((item) => ({
      value: item.nameSingular,
      label: item.labelSingular,
    })),
  ];

  const { updateOneRecord } = useUpdateOneRecord<Webhook>({
    objectNameSingular: CoreObjectNameSingular.Webhook,
  });

  const handleSave = async () => {
    setIsDirty(false);
    await updateOneRecord({
      idToUpdate: webhookId,
      updateOneRecordInput: {
        operation: `${operationObjectSingularName}.${operationAction}`,
        description: description,
      },
    });
    navigate('/settings/developers');
  };

  return (
    <>
      {webhookData?.targetUrl && (
        <SubMenuTopBarContainer
          Icon={IconCode}
          title={
            <Breadcrumb
              links={[
                { children: 'Developers', href: '/settings/developers' },
                { children: 'Webhook' },
              ]}
            />
          }
          actionButton={
            <SaveAndCancelButtons
              isSaveDisabled={!isDirty}
              onCancel={() => {
                navigate('/settings/developers');
              }}
              onSave={handleSave}
            />
          }
        >
          <SettingsPageContainer>
            <Section>
              <H2Title
                title={t('settingsDevelopersWebhooksDetail.endpoint-url')}
                description={t(
                  'settingsDevelopersWebhooksDetail.we-will-send-post-requests-to-this-endpo',
                )}
              />
              <TextInput
                placeholder="URL"
                value={webhookData.targetUrl}
                disabled
                fullWidth
              />
            </Section>
            <Section>
              <H2Title
                title={t('settingsDevelopersWebhooksDetail.description')}
                description={t(
                  'settingsDevelopersWebhooksDetail.an-optional-description',
                )}
              />
              <TextArea
                placeholder="Write a description"
                minRows={4}
                value={description}
                onChange={(description) => {
                  setDescription(description);
                  setIsDirty(true);
                }}
              />
            </Section>
            <Section>
              <H2Title
                title={t('settingsDevelopersWebhooksDetail.filters')}
                description={t(
                  'settingsDevelopersWebhooksDetail.select-the-event-you-wish-to-send-to-thi',
                )}
              />
              <StyledFilterRow>
                <Select
                  fullWidth
                  dropdownId="object-webhook-type-select"
                  value={operationObjectSingularName}
                  onChange={(objectSingularName) => {
                    setIsDirty(true);
                    setOperationObjectSingularName(objectSingularName);
                  }}
                  options={fieldTypeOptions}
                />
                <Select
                  fullWidth
                  dropdownId="operation-webhook-type-select"
                  value={operationAction}
                  onChange={(operationAction) => {
                    setIsDirty(true);
                    setOperationAction(operationAction);
                  }}
                  options={[
                    { value: '*', label: 'All Actions' },
                    { value: 'create', label: 'Create' },
                    { value: 'update', label: 'Update' },
                    { value: 'delete', label: 'Delete' },
                  ]}
                />
              </StyledFilterRow>
            </Section>
            <Section>
              <H2Title
                title={t('settingsDevelopersWebhooksDetail.danger-zone')}
                description={t(
                  'settingsDevelopersWebhooksDetail.delete-this-integration',
                )}
              />
              <Button
                accent="danger"
                variant="secondary"
                title={t('settingsDevelopersWebhooksDetail.delete')}
                Icon={IconTrash}
                onClick={() => setIsDeleteWebhookModalOpen(true)}
              />
              <ConfirmationModal
                confirmationPlaceholder="yes"
                confirmationValue="yes"
                isOpen={isDeleteWebhookModalOpen}
                setIsOpen={setIsDeleteWebhookModalOpen}
                title={t('settingsDevelopersWebhooksDetail.delete-webhook')}
                subtitle={
                  <>
                    {t(
                      'settingsDevelopersWebhooksDetail.please-type-yes-to-confirm-you-want-to-d',
                    )}
                  </>
                }
                onConfirmClick={deleteWebhook}
                deleteButtonText="Delete webhook"
              />
            </Section>
          </SettingsPageContainer>
        </SubMenuTopBarContainer>
      )}
    </>
  );
};
