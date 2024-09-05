import { useTranslation } from 'react-i18next';
import { SettingsServerlessFunctionNewForm } from '@/settings/serverless-functions/components/SettingsServerlessFunctionNewForm';
import { useDeleteOneServerlessFunction } from '@/settings/serverless-functions/hooks/useDeleteOneServerlessFunction';
import { ServerlessFunctionFormValues } from '@/settings/serverless-functions/hooks/useServerlessFunctionUpdateFormState';
import { SettingsServerlessFunctionHotkeyScope } from '@/settings/serverless-functions/types/SettingsServerlessFunctionHotKeyScope';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { Button } from '@/ui/input/button/components/Button';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { Section } from '@/ui/layout/section/components/Section';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key } from 'ts-key-enum';
import { H2Title } from 'twenty-ui';
import { useHotkeyScopeOnMount } from '~/hooks/useHotkeyScopeOnMount';

export const SettingsServerlessFunctionSettingsTab = ({
  formValues,
  serverlessFunctionId,
  onChange,
}: {
  formValues: ServerlessFunctionFormValues;
  serverlessFunctionId: string;
  onChange: (key: string) => (value: string) => void;
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [isDeleteFunctionModalOpen, setIsDeleteFunctionModalOpen] =
    useState(false);
  const { deleteOneServerlessFunction } = useDeleteOneServerlessFunction();

  const deleteFunction = async () => {
    await deleteOneServerlessFunction({ id: serverlessFunctionId });
    navigate('/settings/functions');
  };

  useHotkeyScopeOnMount(
    SettingsServerlessFunctionHotkeyScope.ServerlessFunctionSettingsTab,
  );

  useScopedHotkeys(
    [Key.Delete],
    () => {
      setIsDeleteFunctionModalOpen(true);
    },
    SettingsServerlessFunctionHotkeyScope.ServerlessFunctionSettingsTab,
  );

  useScopedHotkeys(
    [Key.Escape],
    () => {
      navigate(getSettingsPagePath(SettingsPath.ServerlessFunctions));
    },
    SettingsServerlessFunctionHotkeyScope.ServerlessFunctionSettingsTab,
  );
  return (
    <>
      <SettingsServerlessFunctionNewForm
        formValues={formValues}
        onChange={onChange}
      />
      <Section>
        <H2Title
          title={t('settingsServerlessFunctionSettingsTab.danger-zone')}
          description={t(
            'settingsServerlessFunctionSettingsTab.delete-this-function',
          )}
        />
        <Button
          accent="danger"
          onClick={() => setIsDeleteFunctionModalOpen(true)}
          variant="secondary"
          size="small"
          title={t('settingsServerlessFunctionSettingsTab.delete-function')}
        />
      </Section>
      <ConfirmationModal
        confirmationValue={formValues.name}
        confirmationPlaceholder={formValues.name}
        isOpen={isDeleteFunctionModalOpen}
        setIsOpen={setIsDeleteFunctionModalOpen}
        title={t('settingsServerlessFunctionSettingsTab.function-deletion')}
        subtitle={
          <>
            {t(
              'settingsServerlessFunctionSettingsTab.this-action-cannot-be-undone-this-will-p',
            )}{' '}
            <br />{' '}
            {t(
              'settingsServerlessFunctionSettingsTab.please-type-in-the-function-name-to-conf',
            )}
          </>
        }
        onConfirmClick={deleteFunction}
        deleteButtonText="Delete function"
      />
    </>
  );
};
