import { useRef, useState } from 'react';
import { MessageProps } from '../../types';
import { SendButton, PromptInput, Loader } from '../atoms';

interface ChatInputProps {
  setChatMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
  startSse: () => void;
  isStreaming: boolean;
}

export default function ChatInput(props: ChatInputProps) {
  const { setChatMessages, isStreaming, startSse } = props;

  const [newPrompt, setNewPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Add new prompt and start SSE
  function submitNewPrompt(prompt: string) {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) return;

    const newPrompt: MessageProps = {
      role: 'user',
      content: prompt,
    };
    const newGeppettoMessage: MessageProps = {
      role: 'geppetto',
      content: '',
    };

    setChatMessages((draft) => [...draft, newPrompt, newGeppettoMessage]);
    setNewPrompt('');
    startSse();
  }

  // Send prompt on Enter keydown
  function handleKeyDown(e: KeyboardEvent) {
    if (
      (e.keyCode == 13 || e.key == 'Enter') &&
      !isStreaming &&
      !!newPrompt.length
    ) {
      e.preventDefault();
      textareaRef.current?.focus;
      submitNewPrompt(newPrompt);
    }
  }

  // Send prompt on submit button click
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isStreaming && !!newPrompt.length) {
      e.preventDefault();
      textareaRef.current?.focus;
      submitNewPrompt(newPrompt);
    }
  }

  return (
    <div className="sticky bottom-0 w-full px-2 md:w-5/6 h-[100px] mx-auto xl:w-1/2 items-center">
      <div className="flex flex-row py-5">
        <PromptInput
          textareaRef={textareaRef}
          newPrompt={newPrompt}
          setNewPrompt={setNewPrompt}
          handleKeyDown={handleKeyDown}
        />

        {isStreaming ? (
          <Loader />
        ) : (
          <SendButton handleClick={handleClick} hasText={!newPrompt.length} />
        )}
      </div>
    </div>
  );
}
