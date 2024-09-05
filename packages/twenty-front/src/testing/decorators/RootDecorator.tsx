import { ApolloProvider } from '@apollo/client';
import { Decorator } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import { ApolloMetadataClientMockedProvider } from '@/object-metadata/hooks/__mocks__/ApolloMetadataClientProvider';

import { InitializeHotkeyStorybookHookEffect } from '../InitializeHotkeyStorybookHook';
import { mockedApolloClient } from '../mockedApolloClient';

export const RootDecorator: Decorator = (Story) => {
  return (
    <RecoilRoot>
      <ApolloProvider client={mockedApolloClient}>
        <ApolloMetadataClientMockedProvider>
          <InitializeHotkeyStorybookHookEffect />
          <Story />
        </ApolloMetadataClientMockedProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
};
