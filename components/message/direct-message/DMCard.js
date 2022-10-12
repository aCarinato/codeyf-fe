// next / react
import Link from 'next/link';
// context
// import { useMainContext } from '../../../context/Context';
// styles
import classes from './DMCard.module.css';
// packages

function DMCard(props) {
  const {
    _id,
    conversationUser,
    messages,
    lastMsgSender,
    lastMsgText,
    lastMessageIsRead,
    readLastMsg,
    toHighlight,
  } = props;

  //   const { currentUser } = useMainContext();

  return (
    <Link href={`/my-profile/notifications/conversations/${_id}`}>
      <div
        onClick={() => readLastMsg(_id, messages, lastMessageIsRead)}
        className={toHighlight ? classes.containerUnread : classes.container}
      >
        <p>
          Conversation with: <span className="bold">{conversationUser}</span>
        </p>
        <br></br>
        <div>
          <p>from: {lastMsgSender}</p>
          <p>{lastMsgText}</p>
          <p>...</p>
        </div>
      </div>
    </Link>
  );
}

export default DMCard;
