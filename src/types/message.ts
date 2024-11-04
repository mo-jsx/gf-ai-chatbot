export default interface MessageProps {
  loading: boolean;
  role: 'geppetto' | 'user';
  content: string;
  error: boolean;
}
