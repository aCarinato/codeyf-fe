// react / next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// styles
import classes from './ChatHeader.module.css';
// own functions
import getUserInfo from '../../../lib/helper/chats/getUserInfo';
// context
import { useMainContext } from '../../../context/Context';
// libr
import { Icon } from '@iconify/react';

function ChatHeader(props) {
  const { userId } = props;
  const { mobileView, openChatId } = useMainContext();

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
    <div
      className={
        mobileView ? classes['container-0-mobile'] : classes['container-0']
      }
    >
      {mobileView && (
        <div
          className={classes['go-back']}
          onClick={() => {
            openChatId.current = '';
            router.push(`/my-profile/messages`);
          }}
        >
          <Icon icon="akar-icons:arrow-back-thick-fill" />
        </div>
      )}
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
