/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen } from '@testing-library/react';
import ResetChat from './ResetChat';
import { SetStateAction } from 'react';
import { MessageProps } from '../../../types';

describe('<ResetChat />', () => {
  localStorage.setItem(
    'chatHistory',
    JSON.stringify([{ role: 'user', content: 'Hi' }]),
  );

  test('Reset chat history on click', () => {
    render(
      <ResetChat
        setMessages={function (value: SetStateAction<MessageProps[]>): void {
          console.log(value);
        }}
      />,
    );
    const chatHistoryBeforeClick = localStorage.getItem('chatHistory');
    const button = screen.getByTestId('reset-chat');
    fireEvent.click(button);
    const chatHistoryAfterClick = localStorage.getItem('chatHistory');

    expect(!!chatHistoryAfterClick).toEqual(!chatHistoryBeforeClick);
  });
});
