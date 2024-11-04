export default interface SSEventProps {
  status: 'start' | 'data' | 'end' | 'error';
  data: string | null;
  message: string | null;
}
