import { render, screen, waitFor } from '@testing-library/react';
import { MessageProps } from '../../types';
import ChatMessages from './ChatMessages';
import React from 'react';

describe('<ChatMessages />', () => {
  const scrollRef = React.createRef<HTMLDivElement>();

  const messages: MessageProps[] = [
    { role: 'user', content: 'Hi' },
    { role: 'geppetto', content: 'Hey there' },
  ];

  test('Renders array of messages', async () => {
    render(
      <ChatMessages
        messages={messages}
        isFetching={false}
        scrollContentRef={scrollRef}
      />,
    );

    waitFor(() => {
      const chat = screen.getByTestId('chat-messages');
      expect(chat).toHaveLength(2);
    });
  });
});
