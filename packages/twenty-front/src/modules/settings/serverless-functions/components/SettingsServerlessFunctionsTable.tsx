import { useTranslation } from 'react-i18next';
import { SettingsServerlessFunctionsFieldItemTableRow } from '@/settings/serverless-functions/components/SettingsServerlessFunctionsFieldItemTableRow';
import { SettingsServerlessFunctionsTableEmpty } from '@/settings/serverless-functions/components/SettingsServerlessFunctionsTableEmpty';
import { useGetManyServerlessFunctions } from '@/settings/serverless-functions/hooks/useGetManyServerlessFunctions';
import { SettingsServerlessFunctionHotkeyScope } from '@/settings/serverless-functions/types/SettingsServerlessFunctionHotKeyScope';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { Table } from '@/ui/layout/table/components/Table';
import { TableBody } from '@/ui/layout/table/components/TableBody';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Key } from 'ts-key-enum';
import { ServerlessFunction } from '~/generated-metadata/graphql';
import { useHotkeyScopeOnMount } from '~/hooks/useHotkeyScopeOnMount';

const StyledTableRow = styled(TableRow)`
  grid-template-columns: 312px 132px 68px;
`;

const StyledTableBody = styled(TableBody)`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
`;

export const SettingsServerlessFunctionsTable = () => {
  const { t } = useTranslation();

  const { serverlessFunctions } = useGetManyServerlessFunctions();
  const navigate = useNavigate();

  useHotkeyScopeOnMount(
    SettingsServerlessFunctionHotkeyScope.ServerlessFunction,
  );

  useScopedHotkeys(
    [Key.Enter],
    () => {
      navigate(getSettingsPagePath(SettingsPath.NewServerlessFunction));
    },
    SettingsServerlessFunctionHotkeyScope.ServerlessFunction,
  );
  return (
    <>
      {serverlessFunctions.length ? (
        <Table>
          <StyledTableRow>
            <TableHeader>
              {t('settingsServerlessFunctionsTable.name')}
            </TableHeader>
            <TableHeader>
              {t('settingsServerlessFunctionsTable.runtime')}
            </TableHeader>
            <TableHeader></TableHeader>
          </StyledTableRow>
          <StyledTableBody>
            {serverlessFunctions.map(
              (serverlessFunction: ServerlessFunction) => {
                return (
                  <SettingsServerlessFunctionsFieldItemTableRow
                    key={serverlessFunction.id}
                    serverlessFunction={serverlessFunction}
                    to={getSettingsPagePath(SettingsPath.ServerlessFunctions, {
                      id: serverlessFunction.id,
                    })}
                  />
                );
              },
            )}
          </StyledTableBody>
        </Table>
      ) : (
        <SettingsServerlessFunctionsTableEmpty />
      )}
    </>
  );
};
