import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// styles
import classes from './ChatName.module.css';
// packages
import { Icon } from '@iconify/react';

function ChatName(props) {
  const { chat, connectedUsers, notifications, readNotification } = props;

  const router = useRouter();
  //   console.log(notifications);
  const [notificationFromSender, setNotificationFromSender] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (router.query.message === chat.messagesWith) {
      setIsActive(true);
    }
  }, [router.query.message]);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (router.query.message !== chat.messagesWith) {
        setIsActive(false);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    setNotificationFromSender(
      notifications.filter(
        (notification) => notification.from === chat.messagesWith
      )
    );
  }, [notifications]);

  //   console.log(router.query.message);

  //   console.log(chat.messagesWith);
  //   console.log(notificationFromSender);

  return (
    <div
      className={
        isActive
          ? classes['chat-card-active']
          : notificationFromSender &&
            notificationFromSender.length > 0 &&
            !notificationFromSender[0].isRead
          ? classes['chat-card-notified']
          : classes['chat-card']
      }
      key={chat.messagesWith}
      onClick={() => {
        if (
          notificationFromSender &&
          notificationFromSender.length > 0 &&
          !notificationFromSender[0].isRead
        ) {
          readNotification(chat.messagesWith);
        } else {
          router.push(
            `/my-profile/messages?message=${chat.messagesWith}`,
            undefined,
            {
              shallow: true,
            }
          );
        }
      }}
    >
      <div className={classes['flex-item']}>
        {/* <p className={classes['p-username']}>
          {chat.username}{' '} */}
        {notificationFromSender &&
        notificationFromSender.length > 0 &&
        !notificationFromSender[0].isRead ? (
          <p className={classes['p-username-notified']}>
            {chat.username}{' '}
            <sup>
              {/* <Icon icon="ci:notification" /> */}
              <Icon icon="eva:message-circle-fill" />
            </sup>
          </p>
        ) : (
          <p className={classes['p-username']}>{chat.username} </p>
        )}

        <div className={classes['p-user-status']}>
          {connectedUsers
            .map((item) => item.userId)
            .includes(chat.messagesWith) ? (
            <>
              <p className={classes['div-online']}></p> online
            </>
          ) : (
            <>
              <p className={classes['div-offline']}></p> offline
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatName;
