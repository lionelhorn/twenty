import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { IconCheckbox, IconNotes, IconPaperclip } from 'twenty-ui';

import { Button } from '@/ui/input/button/components/Button';
import { ButtonGroup } from '@/ui/input/button/components/ButtonGroup';
import { TAB_LIST_COMPONENT_ID } from '@/ui/layout/show-page/components/ShowPageRightContainer';
import { useTabList } from '@/ui/layout/tab/hooks/useTabList';

export const TimelineCreateButtonGroup = ({
  isInRightDrawer = false,
}: {
  isInRightDrawer?: boolean;
}) => {
  const { t } = useTranslation();

  const { activeTabIdState } = useTabList(
    `${TAB_LIST_COMPONENT_ID}-${isInRightDrawer}`,
  );
  const setActiveTabId = useSetRecoilState(activeTabIdState);

  return (
    <ButtonGroup variant={'secondary'}>
      <Button
        Icon={IconNotes}
        title={t('timelineCreateButtonGroup.note')}
        onClick={() => {
          setActiveTabId('notes');
        }}
      />
      <Button
        Icon={IconCheckbox}
        title={t('timelineCreateButtonGroup.task')}
        onClick={() => {
          setActiveTabId('tasks');
        }}
      />
      <Button
        Icon={IconPaperclip}
        title={t('timelineCreateButtonGroup.file')}
        onClick={() => setActiveTabId('files')}
      />
    </ButtonGroup>
  );
};
