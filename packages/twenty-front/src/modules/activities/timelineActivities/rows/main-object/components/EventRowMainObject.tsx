import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

import {
  EventRowDynamicComponentProps,
  StyledEventRowItemAction,
  StyledEventRowItemColumn,
} from '@/activities/timelineActivities/rows/components/EventRowDynamicComponent';
import { EventRowMainObjectUpdated } from '@/activities/timelineActivities/rows/main-object/components/EventRowMainObjectUpdated';

type EventRowMainObjectProps = EventRowDynamicComponentProps;

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const EventRowMainObject = ({
  authorFullName,
  labelIdentifierValue,
  event,
  mainObjectMetadataItem,
}: EventRowMainObjectProps) => {
  const { t } = useTranslation();

  const [, eventAction] = event.name.split('.');

  switch (eventAction) {
    case 'created': {
      return (
        <StyledMainContainer>
          <StyledEventRowItemColumn>
            {labelIdentifierValue}
          </StyledEventRowItemColumn>
          <StyledEventRowItemAction>
            {t('eventRowMainObject.was-created-by')}
          </StyledEventRowItemAction>
          <StyledEventRowItemColumn>{authorFullName}</StyledEventRowItemColumn>
        </StyledMainContainer>
      );
    }
    case 'updated': {
      return (
        <EventRowMainObjectUpdated
          authorFullName={authorFullName}
          labelIdentifierValue={labelIdentifierValue}
          event={event}
          mainObjectMetadataItem={mainObjectMetadataItem}
        />
      );
    }
    case 'deleted': {
      return (
        <StyledMainContainer>
          <StyledEventRowItemColumn>
            {labelIdentifierValue}
          </StyledEventRowItemColumn>
          <StyledEventRowItemAction>
            {t('eventRowMainObject.was-deleted-by')}
          </StyledEventRowItemAction>
          <StyledEventRowItemColumn>{authorFullName}</StyledEventRowItemColumn>
        </StyledMainContainer>
      );
    }
    default:
      return null;
  }
};
