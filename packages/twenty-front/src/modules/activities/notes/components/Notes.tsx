import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { IconPlus } from 'twenty-ui';

import { SkeletonLoader } from '@/activities/components/SkeletonLoader';
import { useOpenCreateActivityDrawer } from '@/activities/hooks/useOpenCreateActivityDrawer';
import { NoteList } from '@/activities/notes/components/NoteList';
import { useNotes } from '@/activities/notes/hooks/useNotes';
import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { Button } from '@/ui/input/button/components/Button';
import AnimatedPlaceholder from '@/ui/layout/animated-placeholder/components/AnimatedPlaceholder';
import {
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptySubTitle,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
  EMPTY_PLACEHOLDER_TRANSITION_PROPS,
} from '@/ui/layout/animated-placeholder/components/EmptyPlaceholderStyled';

const StyledNotesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const Notes = ({
  targetableObject,
}: {
  targetableObject: ActivityTargetableObject;
}) => {
  const { t } = useTranslation();

  const { notes, loading } = useNotes(targetableObject);

  const openCreateActivity = useOpenCreateActivityDrawer({
    activityObjectNameSingular: CoreObjectNameSingular.Note,
  });

  const isNotesEmpty = !notes || notes.length === 0;

  if (loading && isNotesEmpty) {
    return <SkeletonLoader />;
  }

  if (isNotesEmpty) {
    return (
      <AnimatedPlaceholderEmptyContainer
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...EMPTY_PLACEHOLDER_TRANSITION_PROPS}
      >
        <AnimatedPlaceholder type="noNote" />
        <AnimatedPlaceholderEmptyTextContainer>
          <AnimatedPlaceholderEmptyTitle>
            {t('notes.no-notes')}
          </AnimatedPlaceholderEmptyTitle>
          <AnimatedPlaceholderEmptySubTitle>
            {t('notes.there-are-no-associated-notes-with-this-')}
          </AnimatedPlaceholderEmptySubTitle>
        </AnimatedPlaceholderEmptyTextContainer>
        <Button
          Icon={IconPlus}
          title={t('notes.new-note')}
          variant="secondary"
          onClick={() =>
            openCreateActivity({
              targetableObjects: [targetableObject],
            })
          }
        />
      </AnimatedPlaceholderEmptyContainer>
    );
  }

  return (
    <StyledNotesContainer>
      <NoteList
        title={t('notes.all')}
        notes={notes}
        button={
          <Button
            Icon={IconPlus}
            size="small"
            variant="secondary"
            title={t('notes.add-note')}
            onClick={() =>
              openCreateActivity({
                targetableObjects: [targetableObject],
              })
            }
          ></Button>
        }
      />
    </StyledNotesContainer>
  );
};
