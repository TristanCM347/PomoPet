import { useEffect, useRef, useState } from 'react'
import { LoginPage } from './login-page/LoginPage';
import { GameInterface } from './game-interface/GameInterface';
import MainMenu from './main-menu/MainMenu';
import { Game } from './game/Game';

function App() {
  const [playing, setPlaying] = useState<boolean>(false);

  return (
    <>
      {playing ? <Game></Game> : <MainMenu setPlaying={setPlaying}></MainMenu>}
    </>
  )
}

export default App
