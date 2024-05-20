import { FaHome } from 'react-icons/fa';
import cn from 'classnames';
import Link from 'next/link';
import { Button } from '@/components/base';
import Login from '@/components/Login';
import { useAuth } from '@/contexts';
import { ROUTER } from '@/constants';

const Header = () => {
  const { isLogged, email, doLogout } = useAuth();

  return (
    <header className='border-b-cyan-300 border-b-2'>
      <div
        className={cn(
          'max-w-[1400px] mx-auto pt-4 md:pt-8 px-2 md:flex justify-between items-start',
          isLogged ? 'h-32 md:h-28' : 'h-56 md:h-24'
        )}
      >
        <Link href={ROUTER.HOME}>
          <div className='flex items-start mb-4 md:mb-0'>
            <FaHome size={36} />
            <div className='text-[36px] leading-9 font-bold ml-3'>
              Arrange Seat
            </div>
          </div>
        </Link>

        {!isLogged && <Login />}
        {isLogged && (
          <div className='flex items-center'>
            <div className='pr-4'>Hi {email}</div>
            <Button onPress={doLogout} variant='outline'>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
