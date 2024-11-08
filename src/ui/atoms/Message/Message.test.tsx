import { render, screen } from '@testing-library/react';
import { MessageProps } from '../../../types';
import Message from './Message';

describe('<Message />', () => {
  const userMessage: MessageProps = {
    role: 'user',
    content: "Hi it's me user!",
  };

  const geppettoMessage: MessageProps = {
    role: 'geppetto',
    content: 'Hi geppetto here!',
  };

  test('Render User message', () => {
    render(
      <Message
        isFetching={false}
        isLastMessage={false}
        role={userMessage.role}
        content={userMessage.content}
      />,
    );

    const message = screen.getByTestId('user-message-content').textContent;

    expect(message).toEqual(userMessage.content);
  });
  test('Render Geppetto message', () => {
    render(
      <Message
        isFetching={false}
        isLastMessage={true}
        role={geppettoMessage.role}
        content={geppettoMessage.content}
      />,
    );
    const header = screen.getByTestId('chat-message-header').lastChild
      ?.textContent;
    expect(header).toEqual('Geppetto');

    const message = screen.getByTestId('chat-message').lastChild?.textContent;
    expect(message).toEqual(geppettoMessage.content);
  });
});
