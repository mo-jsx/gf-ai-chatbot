import sendIcon from '../../../assets/send.webp';

interface SendButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasText: boolean;
}

function SendButton({ handleClick, hasText }: SendButtonProps) {
  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={hasText}
      data-testid="submit-button"
      title="Send prompt"
      className="ml-4"
    >
      <img
        src={sendIcon}
        width={28}
        alt="send icon"
        className={`${!!hasText && 'grayscale'}`}
      />
    </button>
  );
}

export default SendButton;
