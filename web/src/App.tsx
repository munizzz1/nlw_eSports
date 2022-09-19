import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { api } from './services/api';

import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

export interface GamesList {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<GamesList[]>([]);

  useEffect(() => {
    api.get('/games').then(response => {
      setGames(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {
          games.map(game => (
            <GameBanner 
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads} 
              key={game.id} 
            />
          ))
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
