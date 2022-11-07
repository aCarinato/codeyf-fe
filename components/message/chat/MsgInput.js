// packages
import { Icon } from '@iconify/react';
// style
import classes from './MsgInput.module.css';

function MsgInput(props) {
  const { msgToSend, setMsgToSend, sendMsg } = props;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMsg();
    }
  };
  return (
    <div className={classes['box-0']}>
      <input
        placeholder="Message to"
        className={classes['text-input']}
        type="text"
        autoFocus
        value={msgToSend}
        onChange={(e) => setMsgToSend(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <button className={classes.btn} onClick={sendMsg}>
        <Icon icon="ic:baseline-send" />
      </button>
    </div>
  );
}

export default MsgInput;
