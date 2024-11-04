import { BaseLayout } from './ui/layouts';
import Chatbot from './ui/organisms/Chatbot';

function App() {
  return (
    <BaseLayout data-testid="app">
      <Chatbot />
    </BaseLayout>
  );
}

export default App;
