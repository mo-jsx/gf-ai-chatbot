import { nanoid } from 'nanoid';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import geppettoIcon from '../../assets/bot.webp';
import userIcon from '../../assets/user.webp';
import { MessageProps } from '../../types';
import Loader from './Loader';

interface IMessage extends MessageProps {
  isGeppettoLastMessage?: boolean;
  isFetching: boolean;
  isLastMessage: boolean;
}

export default function Message(props: IMessage) {
  const { content, role, isFetching, isLastMessage } = props;

  return (
    <div
      className={`${
        role == 'user'
          ? 'bg-white md:ml-[150px] lg:ml-[200px] xl:ml-40 border-2 border-slate-200'
          : 'bg-blue-50 border-2 border-blue-100'
      } px-2 py-4 mb-4 md:w-[80%] xl:w-[80%] rounded-xl`}
      data-testid="chat-message"
    >
      <header
        className={`flex flex-row mb-2 ${
          role == 'geppetto' ? 'justify-start' : 'justify-end'
        }`}
        data-testid="chat-message-header"
      >
        <img
          src={role == 'geppetto' ? geppettoIcon : userIcon}
          width={42}
          alt={`${role} icon`}
          data-testid="chat-message-avatar"
        />
        <h3 className="mt-2 ml-2">{role == 'geppetto' ? 'Geppetto' : ''}</h3>
      </header>

      {role == 'geppetto' && isFetching && isLastMessage ? (
        <Loader />
      ) : role == 'geppetto' ? (
        <ReactMarkdown
          key={nanoid()}
          remarkPlugins={[remarkBreaks, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
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
            h1: (h1, ...props) => (
              <h1 className="font-bold text-4xl py-4" {...props}>
                {h1.children}
              </h1>
            ),
            h2: (h2, ...props) => (
              <h2 className="font-bold text-2xl py-3" {...props}>
                {h2.children}
              </h2>
            ),
            h3: (h3, ...props) => (
              <h3 className="font-bold text-lg py-2" {...props}>
                {h3.children}
              </h3>
            ),
            p: (p, ...props) => (
              <p className="pb-4" {...props}>
                {p.children}
              </p>
            ),
            pre: (pre, ...props) => (
              <pre
                className="bg-blue-200 text-[12px] text-wrap p-2 border-2 border-blue-800 rounded-lg"
                {...props}
              >
                {pre.children}
              </pre>
            ),
            code: (code, ...props) => (
              <code className="my-1" {...props}>
                {code.children}
              </code>
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
  );
}
