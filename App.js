import React from 'react';
import { AppProvider } from './src/js/components/AppProvider/AppProvider';
import Scenes from './src/js/constants/Scenes';
import Title from './src/js/scenes/Title/Title';
import Game from './src/js/scenes/Game/Game';

const engine = {
  fps: 50
}

// app acts as an orchestrator component and should only have knowledge of scenes and which child components to render
const App = () => {
  const [scene, setScene] = React.useState(Scenes.TITLE);

  const handleSceneChange = newScene => {
    setScene(newScene)
  };

  return (
      <AppProvider engine={engine}>
        {scene === Scenes.TITLE && <Title handleSceneChange={handleSceneChange} />}
        {scene === Scenes.GAME && <Game handleSceneChange={handleSceneChange}/>}
      </AppProvider>
  );
};

export default App;
