import WheelComponent from '@/components/wheel';
import { useState, useEffect } from 'react';
import { Button, Input } from '@/components/base';
import { IoClose } from 'react-icons/io5';
import { SEG_COLOR } from '@/constants';
import { Dialog, DialogContent } from '@/components/base';

export default function Home() {
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [winnerCheats, setWinnerCheats] = useState([]);
  const [playTime, setPlayTime] = useState(0);
  const [showFinish, setShowFinish] = useState(false);
  const [winnerList, setWinnerList] = useState([]);
  const [currentWinner, setCurrentWinner] = useState('');

  const onAddUser = () => {
    if (!username) return;
    setUser([...users, username]);
    localStorage.setItem('users', JSON.stringify([...users, username]));
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
    const theWinner = winnerCheats[playTime] || winner;
    if (winnerList.includes(theWinner)) return;
    setCurrentWinner(theWinner);
    setTimeout(() => {
      setWinnerList([...winnerList, theWinner]);
      setPlayTime(playTime + 1);
      setShowFinish(true);
    }, 700);
  };

  return (
    <div className='relative flex justify-center items-center w-screen h-screen'>
      <div className='absolute top-10 left-10'>
        <div>Nhập tên người tham dự:</div>
        <div className='flex w-[350px] items-center gap-4'>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='my-4'
          />
          <Button onPress={onAddUser}>Thêm</Button>
        </div>
        <div className='font-bold'>Danh sách người tham dự:</div>
        <div className='max-h-[70vh] overflow-auto'>
          {users.map((user, index) => (
            <div className='flex' key={user}>
              {index + 1}. {user}
              <IoClose
                size={26}
                color='#f2994a'
                onClick={() => removeUser(user)}
                className='cursor-pointer'
              />
            </div>
          ))}
        </div>
        {users.length > 0 && (
          <Button onPress={clearAll} className='mt-5'>
            Xóa tất cả
          </Button>
        )}
      </div>
      <div className='absolute top-10 right-10'>
        <div className='font-bold'>Danh sách người chiến thắng:</div>
        <div className='max-h-[70vh] overflow-auto'>
          {winnerList.map((user, index) => (
            <div className='flex text-[#FF5F00] text-xl font-bold' key={user}>
              {index + 1}. {user}
            </div>
          ))}
        </div>
      </div>
      {!showFinish && (
        <WheelComponent
          segments={users}
          segColors={SEG_COLOR}
          winningSegment={winnerCheats[playTime]}
          onFinished={(winner) => onFinished(winner)}
          primaryColor='gray'
          contrastColor='white'
          buttonText='Spin'
          isOnlyOnce={true}
          times={10}
        />
      )}
      <Dialog open={showFinish} onOpenChange={() => setShowFinish(false)}>
        <DialogContent>
          <div>
            <div className='my-7 text-center text-xl'>
              Congratulation! The winner is:
              <div className='text-2xl font-bold'>{currentWinner}</div>
            </div>

            <div className='flex justify-center'>
              <Button onPress={() => setShowFinish(false)}>Đóng</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
