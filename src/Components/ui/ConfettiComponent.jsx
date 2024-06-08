import Confetti from 'react-confetti';
import React from 'react';
import { useViewportSize } from '@mantine/hooks';

const ConfettiComponent = () => {
  const { height, width } = useViewportSize();

  return (
    <Confetti recycle={false} gravity={0.15} numberOfPieces={1000} width={width} height={height} />
  );
};

export default ConfettiComponent;
