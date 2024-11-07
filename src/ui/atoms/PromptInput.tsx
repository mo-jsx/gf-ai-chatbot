interface PromptInputProps {
  textareaRef: any;
  newPrompt: string;
  setNewPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: any;
}

function PromptInput(props: PromptInputProps) {
  const { textareaRef, newPrompt, setNewPrompt, handleKeyDown } = props;

  return (
    <textarea
      ref={textareaRef}
      className="h-12 px-4 py-2 overflow-y-hidden resize-none w-[100%] border-2 border-blue-400 rounded-full"
      rows={1}
      value={newPrompt}
      onChange={(e) => setNewPrompt(e.target.value)}
      onKeyDown={handleKeyDown}
      name="chat_input"
      id="chat_input"
      placeholder="Start typing to interact with Geppetto.."
    />
  );
}

export default PromptInput;
