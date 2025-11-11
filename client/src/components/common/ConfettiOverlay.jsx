import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function ConfettiOverlay({ active }) {
  const { width, height } = useWindowSize();
  if (!active) return null;
  return <Confetti width={width} height={height} recycle={false} numberOfPieces={400} />;
}