import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const Congratulation = () => {
  const [loaded, setLoaded] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className='z-[9999] w-full h-full'>
      {loaded && <Confetti width={width} height={height} />}
    </div>
  );
};

export default Congratulation;
