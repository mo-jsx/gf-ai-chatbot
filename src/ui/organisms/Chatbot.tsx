import { useEffect, useRef, useState } from 'react';
import { EventProps, MessageProps } from '../../types';
import { ChatInput, ChatMessages } from '../molecules';
import { useImmer } from 'use-immer';
import loadConversation from '../../utils/loadConversation';
import saveConversation from '../../utils/saveConversation';
import { ResetChat } from '../atoms';

function Chatbot() {
  const [chatMessages, setChatMessages] = useImmer<MessageProps[] | []>([]);
  const [sse, setSse] = useState<EventSource | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [buffer, setBuffer] = useState('');
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  // Save chat to localStorage
  useEffect(() => {
    if (chatMessages.length != 0) {
      saveConversation(chatMessages);
    }
  }, [chatMessages]);

  // Load chat from localStorage if existing
  useEffect(() => {
    setChatMessages(() => loadConversation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle markdown
  const handleMarkdown = (chunk: string) => {
    // Stop processing once we hit </pre>
    if (isClosing) {
      setIsStreaming(false);
      return;
    }

    // turrn `markdown` into link directing to "https://wikipedia.com/wiki/Markdown"
    const updatedChunk = (chunk = chunk.replace(
      'markdownum',
      '<a href="https://wikipedia.com/wiki/Markdown">Markdownum</a>',
    ));

    let updatedBuffer = buffer + updatedChunk;
    console.log(chunk);

    // Step 1: If it's the first chunk, remove the opening <pre class="markdown"> tag
    if (!buffer && chunk.includes('<pre class="markdown">')) {
      const startIndex = chunk.indexOf('<pre class="markdown">');
      updatedBuffer = updatedBuffer.slice(startIndex);
      console.log(updatedBuffer);

      // setBuffer(updatedBuffer);

      setChatMessages((draft) => {
        draft[draft.length - 1].content += updatedBuffer;
      });
    }

    // Step: Check if we have encountered the closgin </pre> tag
    const closingIndex = updatedBuffer.indexOf('</pre>');
    if (closingIndex !== -1) {
      setIsClosing(true);
      setIsStreaming(false);
      const finalContent = updatedBuffer.slice(0, closingIndex);
      setChatMessages((draft) => {
        draft[draft.length - 1].content += finalContent;
      });
    } else {
      // No closing tag yet, continue appending
      setBuffer(updatedBuffer);
      setChatMessages((draft) => {
        draft[draft.length - 1].content += updatedBuffer;
      });
    }
  };

  const startSse = () => {
    if (sse) sse.close();

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
          console.log('Data coming!', newContent.data);
          setIsFetching(false);
          handleMarkdown(newContent.data!);
          if (!isStreaming && isClosing) {
            // Shut event source when hit </pre>
            eventSource.close();
          }
          break;

        case 'error':
          setIsFetching(false);
          setChatMessages((draft) => {
            draft[draft.length - 1].content =
              '<h2 className="font-bold text-red-400 text-center">An error has occurred while fetching our servers!</h2>';
          });
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
      setIsStreaming(false);
      eventSource.close();
    };
  };

  return (
    <>
      <ChatMessages
        messages={chatMessages}
        isFetching={isFetching}
        scrollContentRef={scrollContentRef}
      />

      <ChatInput
        isStreaming={isStreaming}
        setChatMessages={setChatMessages}
        startSse={startSse}
        scrollContentRef={scrollContentRef}
      />
      {!!chatMessages.length && <ResetChat setMessages={setChatMessages} />}
    </>
  );
}

export default Chatbot;
