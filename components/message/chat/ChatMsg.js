import { useEffect, useState } from 'react';
import classes from './ChatMsg.module.css';

function ChatMsg(props) {
  const { divRef, msg, userId } = props;

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    const date = new Date(msg.date);
    setMinutes(date.getMinutes());
    setHours(date.getHours());

    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1); // beware: January = 0; February = 1, etc.
    setDay(date.getDate());
  }, [msg]);

  useEffect(() => {
    if (minutes < 10) {
      setMinutes((prev) => String('0' + prev.toString()));
    }
  }, []);

  return (
    <div
      className={
        msg.sender === userId ? classes['own-msg-div'] : classes['msg-div']
      }
      ref={divRef}
    >
      <div
        className={
          msg.sender === userId ? classes['p-msg-own'] : classes['p-msg']
        }
      >
        <p>{msg.msg}</p>
        {/* <span onClick={() => {}}>X</span> */}
        <p className={classes['msg-time']}>
          {day}/{month}/{year} {hours}:{minutes}
        </p>
      </div>
    </div>
  );
}

// Thank you for the info!
// Yes indeed, before deciding to invest my time in this project and see if I can actually be of help for the team I would like to go over it a bit more if that's ok for you.
// We can DM here, on Discord or even have a 30 min video call to discuss.
// Just let me know what you're more comfortable with.
// cheers
export default ChatMsg;
