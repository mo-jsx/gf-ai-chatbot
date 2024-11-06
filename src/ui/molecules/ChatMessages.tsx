import { MessageProps } from '../../types';
import { Loader, WelcomeMessage } from '../atoms';
import { useEffect, useRef } from 'react';

import geppettoIcon from '../../assets/bot.webp';
import userIcon from '../../assets/user.webp';

import ReactMarkdown from 'react-markdown';
import { nanoid } from 'nanoid';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';

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

        {messages.map(({ role, content }, index) => (
          <div
            key={index}
            className={`${
              role == 'user'
                ? 'bg-white md:ml-[150px] lg:ml-[200px] xl:ml-40 border-2 border-slate-100'
                : 'bg-blue-50 border-2 border-blue-100'
            } px-2 py-8 mb-4 md:w-[80%] xl:w-[80%] rounded-xl`}
            data-testid="chat-message"
          >
            <header
              className={`flex flex-row ${
                role == 'geppetto' ? 'justify-start' : 'justify-end'
              }`}
              data-testid="chat-message-header"
            >
              <img
                src={role == 'geppetto' ? geppettoIcon : userIcon}
                width={36}
                alt={`${role} icon`}
                data-testid="chat-message-avatar"
              />
              <h3 className="mt-2 ml-2">
                {role == 'geppetto' ? 'Geppetto' : ''}
              </h3>
            </header>

            {role == 'geppetto' &&
            isFetching &&
            messages.length == index + 1 ? (
              <Loader />
            ) : role == 'geppetto' ? (
              <ReactMarkdown
                key={nanoid()}
                remarkPlugins={[remarkBreaks, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                components={{
                  a: (a, ...props) => (
                    <a
                      href={a.href}
                      className="text-white bg-blue-400 underline visited:bg-purple-400"
                      rel="noopener noreferrer"
                      target="_blank"
                      {...props}
                    >
                      {a.children}
                    </a>
                  ),
                }}
                className="text-wrap"
                data-testid="geppetto-message-content"
              >
                {content}
              </ReactMarkdown>
            ) : (
              <div
                className="text-wrap whitespace-pre-line"
                data-testid="user-message-content"
              >
                {content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatMessages;
