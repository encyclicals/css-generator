import React from 'react';
import ChatInterface from './components/ChatInterface';
import useStore from './store';

const App: React.FC = () => {
  const { settings, colorways } = useStore();
  const currentColorway = colorways.find(
    (c) => c.name === settings.selectedColorway
  );

  return (
    <>
      <style>{currentColorway?.code}</style>
      <ChatInterface />
    </>
  );
};

export default App;