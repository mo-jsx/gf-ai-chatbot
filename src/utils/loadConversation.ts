import { MessageProps } from '../types';

export default function loadConversation(): MessageProps[] {
  const savedMessages = localStorage.getItem('chatHistory');
  return savedMessages ? JSON.parse(savedMessages) : [];
}
