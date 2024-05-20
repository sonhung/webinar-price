import { useEffect } from 'react';
import Layout from '@/layout/Layout';
import { useAuth } from '@/contexts';
import { ROUTER } from '@/constants';

export default function Home() {
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) window.location = ROUTER.HOME;
  }, [isLogged]);

  return (
    <Layout isPrivate={false}>
      <div className='flex justify-center pt-10'>Vui lòng đăng nhập</div>
    </Layout>
  );
}
