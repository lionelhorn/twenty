import { Decorator } from '@storybook/react';

import { RelationPickerScope } from '@/object-record/relation-picker/scopes/RelationPickerScope';

export const RelationPickerDecorator: Decorator = (Story) => {
  return (
    <RelationPickerScope relationPickerScopeId="relation-picker">
      <Story />
    </RelationPickerScope>
  );
};
