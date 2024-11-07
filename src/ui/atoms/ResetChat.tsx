import clearIcon from '../../assets/delete.webp';
import { MessageProps } from '../../types';

interface RestartChatProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
}

function RestartChat(props: RestartChatProps) {
  const { setMessages } = props;

  // Clear localStorage and current conversation
  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <button
      className="absolute bottom-20 md:bottom-11 right-1 md:right-5 xl:right-10"
      title="Clear chat"
      onClick={clearChatHistory}
    >
      <img id="clear_chat" src={clearIcon} width={32} alt="clear chat icon" />
    </button>
  );
}

export default RestartChat;
