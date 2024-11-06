import { MessageProps } from '../../types';
import { Message, WelcomeMessage } from '../atoms';
import { useEffect, useRef } from 'react';

interface ChatMessagesProps {
  messages: MessageProps[];
  isFetching: boolean;
}

function ChatMessages({ messages, isFetching }: ChatMessagesProps) {
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollTop =
        scrollContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-5 px-2" ref={scrollContentRef}>
      <div
        className="w-full md:w-5/6 mx-auto xl:w-1/2"
        data-testid="chat-messages"
      >
        {messages.length == 0 ? (
          <WelcomeMessage />
        ) : (
          <h1 className="pb-4 text-center" data-testid="chat-heading-message">
            Chat with <span className="text-purple-400 italic">Geppetto!</span>
          </h1>
        )}

        {messages.map(({ role, content }, index) => {
          const isLastMessage = messages.length == index + 1;

          return (
            <Message
              key={index}
              isFetching={isFetching}
              isLastMessage={isLastMessage}
              role={role}
              content={content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatMessages;
