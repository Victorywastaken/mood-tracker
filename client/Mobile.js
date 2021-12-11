import React from 'react';
import { useMediaQuery } from 'react-responsive';

const MobileDiv = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const textStyle = isMobile ? 'text-mobile' : 'text-desktop';

  return (
    <div className={textStyle}>
     {props.children}
    </div>
  )
}

export default MobileDiv
