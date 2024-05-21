import Head from 'next/head';
import WheelComponent from '@/components/wheel';
import { useState, useEffect } from 'react';
import { Button, Input } from '@/components/base';
import { IoClose } from 'react-icons/io5';
import { SEG_COLOR } from '@/constants';
import { Dialog, DialogContent } from '@/components/base';
import Congratulation from '@/components/congratulation';
import { getNewUser } from '@/utils';

export default function Home() {
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [winnerCheats, setWinnerCheats] = useState([]);
  const [playTime, setPlayTime] = useState(0);
  const [showFinish, setShowFinish] = useState(false);
  const [winnerList, setWinnerList] = useState([]);
  const [currentWinner, setCurrentWinner] = useState('');
  const [showCongrat, setShowCongrat] = useState(false);

  const onAddUser = () => {
    if (!username) return;
    const userAdded = getNewUser(username);
    setUser([...users, ...userAdded]);
    localStorage.setItem('users', JSON.stringify([...users, ...userAdded]));
    setUsername('');
  };

  const removeUser = (user) => {
    const newUsers = users.filter((u) => u !== user);
    setUser(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const clearAll = () => {
    window.location.reload();

    localStorage.removeItem('users');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('users') || '[]');
    const winnerData = JSON.parse(localStorage.getItem('winners') || '[]');
    setWinnerCheats(winnerData);
    setUser(userData);
  }, []);

  const onFinished = (winner) => {
    if (!winner) return;
    setShowCongrat(true);
    const theWinner = winnerCheats[playTime] || winner;
    if (winnerList.includes(theWinner)) {
      setShowCongrat(false);
      setPlayTime(playTime + 1);
      return;
    }
    setCurrentWinner(theWinner);
    setTimeout(() => {
      setWinnerList([...winnerList, theWinner]);
      setPlayTime(playTime + 1);
      setShowFinish(true);
    }, 1000);
  };

  const onClose = () => {
    setShowCongrat(false);
    setShowFinish(false);
  };

  return (
    <div
      className={`relative flex justify-center items-center w-screen h-screen overflow-hidden bg-[url('/images/background.png')] bg-no-repeat bg-cover`}
    >
      <Head>
        <title>Wheel wheel</title>
        <meta name='description' content='Wheel wheel' />
        <link rel='icon' type='image/svg+xml' href='/public/favicon.ico' />
      </Head>
      <div className='absolute top-10 left-10'>
        <div className='text-[#FF7F3E]'>Input:</div>
        <div className='flex w-[350px] items-center gap-4'>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='my-4'
          />
          <Button onPress={onAddUser}>Add</Button>
        </div>
        <div className='font-bold text-[#FF7F3E]'>Attendee list:</div>
        <div className='max-h-[70vh] overflow-auto'>
          {users.map((user, index) => (
            <div className='flex text-[#FF7F3E] font-semibold' key={user}>
              {index + 1}. {user}
              <IoClose
                size={26}
                color='#40A578'
                onClick={() => removeUser(user)}
                className='cursor-pointer'
              />
            </div>
          ))}
        </div>
        {users.length > 0 && (
          <Button onPress={clearAll} className='mt-5'>
            Clear all
          </Button>
        )}
      </div>
      <div className='absolute top-10 right-10'>
        <div className='font-bold text-right text-[#FF7F3E]  text-xl'>
          Winner List:
        </div>
        <div className='max-h-[70vh] overflow-auto'>
          {winnerList.map((user, index) => (
            <div className='flex text-[#FC4100] text-2xl font-bold' key={user}>
              {index + 1}. {user}
            </div>
          ))}
        </div>
      </div>
      <div className='z-[9999]'>
        {!showFinish && (
          <WheelComponent
            segments={users}
            segColors={SEG_COLOR}
            winningSegment={winnerCheats[playTime] || ''}
            onFinished={(winner) => onFinished(winner)}
            primaryColor='gray'
            contrastColor='white'
            buttonText='Spin'
            isOnlyOnce={true}
            times={10}
          />
        )}
      </div>
      <Dialog open={showFinish} onOpenChange={onClose}>
        <DialogContent className='bg-white'>
          <div>
            <div className='my-7 text-center text-xl'>
              Congratulation! The winner is:
              <div className='text-2xl font-bold'>{currentWinner}</div>
            </div>

            <div className='flex justify-center'>
              <Button onPress={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {showCongrat && (
        <div className='absolute inset-0 z-[9998]'>
          <Congratulation />
        </div>
      )}
    </div>
  );
}
