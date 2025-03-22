import React from 'react';
import Spline from '@splinetool/react-spline';
import { styled } from '@mui/system';

const BackgroundContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: 'hidden',
  pointerEvents: 'none', // This allows clicks to pass through to elements underneath
  background: 'linear-gradient(to bottom right, #0f0f1e, #1a0b2e, #271042)', // Dark purple gradient
});

const SplineWrapper = styled('div')({
  width: '100%',
  height: '100%',
  '& > div': {
    width: '100%',
    height: '100%'
  },
  opacity: 0.85, // Slightly transparent to blend with background
});

// Gradient overlay for bottom fade
const BottomGradient = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50vh', // Increased to cover half the screen
  background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)',
  pointerEvents: 'none',
  zIndex: 0,
});

const SplineBackground = () => {
  return (
    <BackgroundContainer>
      <SplineWrapper>
        <Spline scene="https://prod.spline.design/8t6pPtCzHQjIqG4i/scene.splinecode" />
      </SplineWrapper>
      <BottomGradient />
    </BackgroundContainer>
  );
};

export default SplineBackground;