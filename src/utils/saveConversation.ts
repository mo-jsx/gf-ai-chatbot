import { MessageProps } from '../types';

export default function saveConversation(messages: MessageProps[]) {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}
