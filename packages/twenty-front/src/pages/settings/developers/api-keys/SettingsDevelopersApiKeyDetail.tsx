import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { isNonEmptyString } from '@sniptt/guards';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { H2Title, IconCode, IconRepeat, IconTrash } from 'twenty-ui';

import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { ApiKeyInput } from '@/settings/developers/components/ApiKeyInput';
import { ApiKeyNameInput } from '@/settings/developers/components/ApiKeyNameInput';
import { apiKeyTokenState } from '@/settings/developers/states/generatedApiKeyTokenState';
import { ApiKey } from '@/settings/developers/types/api-key/ApiKey';
import { computeNewExpirationDate } from '@/settings/developers/utils/compute-new-expiration-date';
import { formatExpiration } from '@/settings/developers/utils/format-expiration';
import { Button } from '@/ui/input/button/components/Button';
import { TextInput } from '@/ui/input/components/TextInput';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { useGenerateApiKeyTokenMutation } from '~/generated/graphql';

const StyledInfo = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.regular};
`;

const StyledInputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

export const SettingsDevelopersApiKeyDetail = () => {
  const { t } = useTranslation();

  const [isRegenerateKeyModalOpen, setIsRegenerateKeyModalOpen] =
    useState(false);
  const [isDeleteApiKeyModalOpen, setIsDeleteApiKeyModalOpen] = useState(false);

  const navigate = useNavigate();
  const { apiKeyId = '' } = useParams();

  const [apiKeyToken, setApiKeyToken] = useRecoilState(apiKeyTokenState);
  const [generateOneApiKeyToken] = useGenerateApiKeyTokenMutation();
  const { createOneRecord: createOneApiKey } = useCreateOneRecord<ApiKey>({
    objectNameSingular: CoreObjectNameSingular.ApiKey,
  });
  const { updateOneRecord: updateApiKey } = useUpdateOneRecord<ApiKey>({
    objectNameSingular: CoreObjectNameSingular.ApiKey,
  });

  const [apiKeyName, setApiKeyName] = useState('');

  const { record: apiKeyData, loading } = useFindOneRecord({
    objectNameSingular: CoreObjectNameSingular.ApiKey,
    objectRecordId: apiKeyId,
    onCompleted: (record) => {
      setApiKeyName(record.name);
    },
  });

  const deleteIntegration = async (redirect = true) => {
    await updateApiKey?.({
      idToUpdate: apiKeyId,
      updateOneRecordInput: { revokedAt: DateTime.now().toString() },
    });
    if (redirect) {
      navigate('/settings/developers');
    }
  };

  const createIntegration = async (
    name: string,
    newExpiresAt: string | null,
  ) => {
    const newApiKey = await createOneApiKey?.({
      name: name,
      expiresAt: newExpiresAt ?? '',
    });

    if (!newApiKey) {
      return;
    }

    const tokenData = await generateOneApiKeyToken({
      variables: {
        apiKeyId: newApiKey.id,
        expiresAt: newApiKey?.expiresAt,
      },
    });
    return {
      id: newApiKey.id,
      token: tokenData.data?.generateApiKeyToken.token,
    };
  };

  const regenerateApiKey = async () => {
    if (isNonEmptyString(apiKeyData?.name)) {
      const newExpiresAt = computeNewExpirationDate(
        apiKeyData?.expiresAt,
        apiKeyData?.createdAt,
      );
      const apiKey = await createIntegration(apiKeyData?.name, newExpiresAt);
      await deleteIntegration(false);

      if (isNonEmptyString(apiKey?.token)) {
        setApiKeyToken(apiKey.token);
        navigate(`/settings/developers/api-keys/${apiKey.id}`);
      }
    }
  };

  return (
    <>
      {apiKeyData?.name && (
        <SubMenuTopBarContainer
          Icon={IconCode}
          title={
            <Breadcrumb
              links={[
                { children: 'Developers', href: '/settings/developers' },
                { children: `${apiKeyName} API Key` },
              ]}
            />
          }
        >
          <SettingsPageContainer>
            <Section>
              {apiKeyToken ? (
                <>
                  <H2Title
                    title={t('settingsDevelopersApiKeyDetail.api-key')}
                    description={t(
                      'settingsDevelopersApiKeyDetail.copy-this-key-as-it-will-only-be-visible',
                    )}
                  />
                  <ApiKeyInput apiKey={apiKeyToken} />
                  <StyledInfo>
                    {formatExpiration(apiKeyData?.expiresAt || '', true, false)}
                  </StyledInfo>
                </>
              ) : (
                <>
                  <H2Title
                    title={t('settingsDevelopersApiKeyDetail.api-key')}
                    description={t(
                      'settingsDevelopersApiKeyDetail.regenerate-an-api-key',
                    )}
                  />
                  <StyledInputContainer>
                    <Button
                      title={t('settingsDevelopersApiKeyDetail.regenerate-key')}
                      Icon={IconRepeat}
                      onClick={() => setIsRegenerateKeyModalOpen(true)}
                    />
                    <StyledInfo>
                      {formatExpiration(
                        apiKeyData?.expiresAt || '',
                        true,
                        false,
                      )}
                    </StyledInfo>
                  </StyledInputContainer>
                </>
              )}
            </Section>
            <Section>
              <H2Title
                title={t('settingsDevelopersApiKeyDetail.name')}
                description={t(
                  'settingsDevelopersApiKeyDetail.name-of-your-api-key',
                )}
              />
              <ApiKeyNameInput
                apiKeyName={apiKeyName}
                apiKeyId={apiKeyData?.id}
                disabled={loading}
                onNameUpdate={setApiKeyName}
              />
            </Section>
            <Section>
              <H2Title
                title={t('settingsDevelopersApiKeyDetail.expiration')}
                description={t(
                  'settingsDevelopersApiKeyDetail.when-the-key-will-be-diasbled',
                )}
              />
              <TextInput
                placeholder="E.g. backoffice integration"
                value={formatExpiration(
                  apiKeyData?.expiresAt || '',
                  true,
                  false,
                )}
                disabled
                fullWidth
              />
            </Section>
            <Section>
              <H2Title
                title={t('settingsDevelopersApiKeyDetail.danger-zone')}
                description={t(
                  'settingsDevelopersApiKeyDetail.delete-this-integration',
                )}
              />
              <Button
                accent="danger"
                variant="secondary"
                title={t('settingsDevelopersApiKeyDetail.delete')}
                Icon={IconTrash}
                onClick={() => setIsDeleteApiKeyModalOpen(true)}
              />
            </Section>
          </SettingsPageContainer>
        </SubMenuTopBarContainer>
      )}
      <ConfirmationModal
        confirmationPlaceholder="yes"
        confirmationValue="yes"
        isOpen={isDeleteApiKeyModalOpen}
        setIsOpen={setIsDeleteApiKeyModalOpen}
        title={t('settingsDevelopersApiKeyDetail.delete-api-key')}
        subtitle={
          <>
            {t(
              'settingsDevelopersApiKeyDetail.please-type-yes-to-confirm-you-want-to-d',
            )}
          </>
        }
        onConfirmClick={deleteIntegration}
        deleteButtonText="Delete"
      />
      <ConfirmationModal
        confirmationPlaceholder="yes"
        confirmationValue="yes"
        isOpen={isRegenerateKeyModalOpen}
        setIsOpen={setIsRegenerateKeyModalOpen}
        title={t('settingsDevelopersApiKeyDetail.regenerate-an-api-key')}
        subtitle={
          <>
            {t(
              'settingsDevelopersApiKeyDetail.if-youve-lost-this-key-you-can-regenerat',
            )}
          </>
        }
        onConfirmClick={regenerateApiKey}
        deleteButtonText="Regenerate key"
      />
    </>
  );
};
