import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/base';
import { Button, Input } from '@/components/base';
import { IoClose } from 'react-icons/io5';
import { getNewUser } from '@/utils';

const Winner = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [winner, setWinner] = useState([]);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (name === 'hieuphan') {
      setName('');
      setIsLogged(true);
      setShow(false);
    }
  };

  useEffect(() => {
    const winnerData = JSON.parse(localStorage.getItem('winners') || '[]');
    setWinner(winnerData);
  }, []);

  const onAddWinner = () => {
    if (!username) return;
    const userAdded = getNewUser(username);
    const newWinner = [...winner, ...userAdded];
    setWinner(newWinner);
    localStorage.setItem('winners', JSON.stringify(newWinner));
    setUsername('');
  };

  const removeWinner = (user) => {
    const newWinner = winner.filter((w) => w !== user);
    setWinner(newWinner);
    localStorage.setItem('winners', JSON.stringify(newWinner));
  };

  const clearAll = () => {
    setWinner([]);
    localStorage.removeItem('winners');
  };

  return (
    <div className='p-10'>
      {!isLogged ? (
        <div className='flex justify-center py-20'>
          <Button onPress={() => setShow(true)}>Login</Button>
        </div>
      ) : (
        <div>
          <div>Nhập tên người chiến thắng:</div>
          <div className='flex w-[350px] items-center gap-4'>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='my-4'
            />
            <Button onPress={onAddWinner}>Thêm</Button>
          </div>
          <div className='mt-10'>
            <div>Danh sách người chiến thắng:</div>
            {winner.map((user, index) => (
              <div className='flex' key={user}>
                {index + 1}. {user}
                <IoClose
                  size={26}
                  color='#f2994a'
                  onClick={() => removeWinner(user)}
                  className='cursor-pointer'
                />
              </div>
            ))}
            {winner.length > 0 && (
              <Button onPress={clearAll} className='mt-5'>
                Xóa tất cả
              </Button>
            )}
          </div>
        </div>
      )}
      <Dialog open={show}>
        <DialogContent>
          <div>
            <div className='font-semibold'>Nhập tên admin để tiếp tục</div>
            <Input
              placeholder='Admin name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='my-4'
            />
            <Button onPress={handleLogin}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Winner;
