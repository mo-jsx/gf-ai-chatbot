import { MessageProps } from '../../types';
import { Message, WelcomeMessage } from '../atoms';
import { useEffect, useState } from 'react';

interface ChatMessagesProps {
  messages: MessageProps[];
  isFetching: boolean;
  scrollContentRef: React.RefObject<HTMLDivElement>;
}

function ChatMessages({
  messages,
  isFetching,
  scrollContentRef,
}: ChatMessagesProps) {
  const [stickToBottom, setStickToBottom] = useState(true);

  useEffect(() => {
    if (stickToBottom && scrollContentRef.current) {
      scrollContentRef.current.scrollTop =
        scrollContentRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, stickToBottom]);

  const handleScroll = () => {
    if (scrollContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContentRef.current;

      const isAtBottom = scrollHeight - scrollTop === clientHeight;
      setStickToBottom(isAtBottom);
    }
  };

  return (
    <div
      className="flex-1 overflow-y-auto py-5 px-2"
      ref={scrollContentRef}
      onScroll={handleScroll}
    >
      <div
        className="w-full md:w-5/6 mx-auto xl:w-1/2"
        data-testid="chat-messages"
      >
        {messages.length == 0 ? (
          <WelcomeMessage />
        ) : (
          <h1 className="pb-12 text-center" data-testid="chat-heading-message">
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
