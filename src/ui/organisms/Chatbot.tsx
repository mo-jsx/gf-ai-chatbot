import { useState } from 'react';
import { EventProps, MessageProps } from '../../types';
import { ChatInput, ChatMessages } from '../molecules';
import { useImmer } from 'use-immer';

function Chatbot() {
  const [chatMessages, setChatMessages] = useImmer<MessageProps[] | []>([]);
  const [sse, setSse] = useState<EventSource | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Handle markdown
  const handleMarkdown = (i: number, string: string) => {
    let chunk = i == 0 ? string.substring(22) : string;

    chunk = chunk.replace(
      'markdownum',
      '<a href="https://wikipedia.com/wiki/Markdown">Markdownum</a>',
    );

    setChatMessages((draft) => {
      draft[draft.length - 1].content += chunk;
    });
  };

  const startSse = () => {
    // Close any existing SSE connection
    if (sse) sse.close();
    let i = 0;

    const eventSource = new EventSource('http://localhost:1994/stream');
    setSse(eventSource);

    eventSource.onmessage = (event) => {
      const newContent = JSON.parse(event.data) as EventProps;

      switch (newContent.status) {
        case 'start':
          console.log('Streaming started..');
          setIsStreaming(true);
          setIsFetching(true);
          break;

        case 'data':
          setIsFetching(false);
          handleMarkdown(i, newContent.data!);
          i++;
          break;

        case 'error':
          setIsFetching(false);
          eventSource.close();
          console.error('SSE error');
          throw Error('SSE error');
          break;

        case 'end':
          console.log('Streaming ended');
          setIsStreaming(false);
          eventSource.close();
          break;

        default:
          return 0;
      }
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      setChatMessages((draft) => {
        draft[draft.length - 1].content =
          '<h2 className="font-bold text-red-400 text-center">An error has occurred while fetching our servers!</h2>';
      });
      eventSource.close();
    };
  };

  return (
    <>
      <ChatMessages messages={chatMessages} isFetching={isFetching} />

      <ChatInput
        isStreaming={isStreaming}
        setChatMessages={setChatMessages}
        startSse={startSse}
      />
    </>
  );
}

export default Chatbot;
