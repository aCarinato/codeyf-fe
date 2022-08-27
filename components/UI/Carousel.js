import React from 'react';
import classes from './Carousel.module.css';

function Carousel({ children }) {
  return (
    <div className={classes.carousel}>
      <div className={classes.inner} style={{ transform: 'translateX(-0%' }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
    </div>
  );
}

export default Carousel;
