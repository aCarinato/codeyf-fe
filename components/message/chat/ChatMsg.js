import { useEffect, useState } from 'react';
import classes from './ChatMsg.module.css';
// context
import { useMainContext } from '../../../context/Context';

function ChatMsg(props) {
  const { divRef, msg, userId } = props;
  const { mobileView } = useMainContext();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    const date = new Date(msg.date);
    if (Number(date.getMinutes()) < 10) {
      setMinutes(String('0' + date.getMinutes().toString()));
    } else {
      setMinutes(date.getMinutes());
    }

    // console.log(typeof minutes);
    setHours(date.getHours());

    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1); // beware: January = 0; February = 1, etc.
    setDay(date.getDate());
  }, [msg]);

  return (
    <div
      className={
        msg.sender === userId ? classes['own-msg-div'] : classes['msg-div']
      }
      ref={divRef}
    >
      <div
        className={
          msg.sender === userId
            ? mobileView
              ? classes['p-msg-own-mobile']
              : classes['p-msg-own']
            : mobileView
            ? classes['p-msg-mobile']
            : classes['p-msg']
          // msg.sender === userId && mobileView
          //   ? classes['p-msg-own-mobile']
          //   : classes['p-msg']
        }
      >
        <div
          className={
            mobileView ? classes['msg-text-mobile'] : classes['msg-text']
          }
        >
          {msg.msg}
        </div>
        {/* <span onClick={() => {}}>X</span> */}
        <p className={classes['msg-time']}>
          {day}/{month}/{year} {hours}:{minutes}
        </p>
      </div>
    </div>
  );
}

export default ChatMsg;
