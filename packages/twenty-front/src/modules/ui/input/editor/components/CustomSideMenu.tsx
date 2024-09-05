import { blockSchema } from '@/activities/blocks/schema';
import { CustomAddBlockItem } from '@/ui/input/editor/components/CustomAddBlockItem';
import { CustomSideMenuOptions } from '@/ui/input/editor/components/CustomSideMenuOptions';
import {
  BlockColorsItem,
  DragHandleButton,
  DragHandleMenu,
  RemoveBlockItem,
  SideMenu,
  SideMenuController,
} from '@blocknote/react';
import styled from '@emotion/styled';
import { IconColorSwatch, IconPlus, IconTrash } from 'twenty-ui';

type CustomSideMenuProps = {
  editor: typeof blockSchema.BlockNoteEditor;
};

const StyledDivToCreateGap = styled.div`
  width: ${({ theme }) => theme.spacing(2)};
`;

export const CustomSideMenu = ({ editor }: CustomSideMenuProps) => {
  return (
    <SideMenuController
      sideMenu={(props) => {
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <SideMenu {...props}>
            <DragHandleButton
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              dragHandleMenu={(props) => {
                return (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <DragHandleMenu {...props}>
                    <CustomAddBlockItem editor={editor}>
                      <CustomSideMenuOptions
                        LeftIcon={IconPlus}
                        text={'Add Block'}
                        Variant="normal"
                      />
                    </CustomAddBlockItem>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <BlockColorsItem {...props}>
                      <CustomSideMenuOptions
                        LeftIcon={IconColorSwatch}
                        text={'Change Color'}
                        Variant="normal"
                      />
                    </BlockColorsItem>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <RemoveBlockItem {...props}>
                      {' '}
                      <CustomSideMenuOptions
                        LeftIcon={IconTrash}
                        text={'Delete'}
                        Variant="danger"
                      />
                    </RemoveBlockItem>
                  </DragHandleMenu>
                );
              }}
            />
            <StyledDivToCreateGap />
          </SideMenu>
        );
      }}
    />
  );
};
