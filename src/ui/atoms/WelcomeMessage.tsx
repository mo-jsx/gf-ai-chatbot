export default function WelcomeMessage() {
  return (
    <div
      className="bg-green-py-4 mt-[300px]  xl:mt-[400px]  text-center"
      data-testid="new-welcome-message"
    >
      <h1>
        Hi 👋! I'm <span className="text-purple-400 italic">Geppetto</span>
      </h1>
      <p>
        I'm basically a lorem ipsum poet – I write gibberish that sounds almost
        profound. Almost.
      </p>
    </div>
  );
}
