import { Fragment, useState, useEffect } from 'react';
// import ReactDom from 'react-dom';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Modal(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // return () => setMounted(false);
  }, []);

  //   const handleClose = (e) => {
  //     e.preventDefault();
  //     onClose();
  //   };

  if (mounted) {
    return (
      <Fragment>
        {/* THIS IS THE BACKGROUND, THAT WHEN CLICKED IS CLOSED */}
        {ReactDOM.createPortal(
          <div onClick={props.onClose} className={classes.backdrop}></div>,
          document.getElementById('overlays')
        )}
        {ReactDOM.createPortal(
          <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
          </div>,
          document.getElementById('overlays')
        )}
      </Fragment>
    );
  } else {
    return null;
  }
}

export default Modal;
