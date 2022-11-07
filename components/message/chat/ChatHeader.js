// react / next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// styles
import classes from './ChatHeader.module.css';
// own functions
import getUserInfo from '../../../lib/helper/chats/getUserInfo';

function ChatHeader(props) {
  const { userId } = props;
  const router = useRouter();

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUsername = async () => {
      const retrievedUser = await getUserInfo(userId);
      setUser(retrievedUser);
    };
    getUsername();
  }, [userId]);

  return (
    <div className={classes['container-0']}>
      <div
        className={classes['flex-item']}
        onClick={() => router.push(`/people/coding-buddies/${user.username}`)}
      >
        <div className={classes['chat-img-container']}>
          <img
            className={classes['chat-img']}
            src={
              user.profilePic &&
              user.profilePic.url &&
              chat.profilePic.url !== ''
                ? chat.profilePic.url
                : '/img/default-pic.png'
            }
          />
        </div>
        <div className={classes['username-container']}>{user.username}</div>{' '}
      </div>
    </div>
  );
}

export default ChatHeader;
