import classes from './TeamNotification.module.css';
// next  /react
import Link from 'next/link';
// context
import { useMainContext } from '../../../context/Context';

function TeamNotification(props) {
  const { notification } = props;

  const {
    socket,
    authState,
    groupNotifications,
    setGroupNotifications,
    // groupNotificationsFrom,
    // setGroupNotificationsFrom,
  } = useMainContext();

  // READ A NOTIFICATION
  const readNotification = () => {
    // router.push(`/my-profile/chats?message=${msgFrom}`, undefined, {
    //   // shallow: true,
    // });

    // remove notifications from frontend
    // setNotifications find the index of the current notification
    const index = groupNotifications
      .map((item) => item._id)
      .indexOf(notification._id);

    // console.log(index);
    if (index !== -1) {
      // READ NOTIFICATION
      setGroupNotifications((prev) => {
        const previousNotification = prev.find(
          (item) => item._id === notification._id
        );
        previousNotification.isRead = true;

        return [...prev];
      });
    }

    // const userToAddId = authState.userId;
    socket.current.emit('readGroupJoinedNotification', {
      notificationId: notification._id,
      // userToAddId: userToAddId,
      // groupId: notification.groupId,
      // type: 'buddy',
    });

    if (notification.type === 'groupJoinedAsBuddy') {
      // console.log(
      //   `FROM TeamNotification.js => (notification.type === 'groupJoinedAsBuddy')`
      // );
      // emit event to remove notification from backend
      const buddyId = authState.userId;
      socket.current.emit('readGroupJoinedNotification', {
        notificationId: notification._id,
        userToAddId: buddyId,
        groupId: notification.groupId,
        type: 'buddy',
      });
    }

    if (notification.type === 'groupJoinedAsMentor') {
      // console.log(
      //   `FROM TeamNotification.js => (notification.type === 'groupJoinedAsMentor')`
      // );
      // emit event to remove notification from backend
      const mentorId = authState.userId;
      socket.current.emit('readGroupJoinedNotification', {
        notificationId: notification._id,
        userToAddId: mentorId,
        groupId: notification.groupId,
        type: 'mentor',
      });
    }
  };

  // const readNotification = () => {
  //   // router.push(`/my-profile/chats?message=${msgFrom}`, undefined, {
  //   //   // shallow: true,
  //   // });

  //   // remove notifications from frontend
  //   // setNotifications find the index of the current notification
  //   const index = groupNotificationsFrom
  //     .map((item) => item._id)
  //     .indexOf(notification._id);

  //   if (index !== -1) {
  //     // READ NOTIFICATION
  //     setGroupNotificationsFrom((prev) => {
  //       const previousNotification = prev.find(
  //         (item) => item._id === notification._id
  //       );
  //       previousNotification.isRead = true;

  //       return [...prev];
  //     });
  //   }

  //   // emit event to remove notification from backend
  //   const receiverId = authState.userId;
  //   socket.current.emit('readJoinReqNotification', {
  //     senderId: notification.from,
  //     receiverId,
  //     groupId: notification.groupId,
  //   });
  // };

  return (
    <Link href={`/my-profile/projects/notifications/${notification._id}`}>
      <div
        className={
          notification.isRead ? classes['box-0'] : classes['box-0-unread']
        }
        onClick={readNotification}
        // onClick={() => console.log(`notification._id: ${notification._id}`)}
      >
        {/* <p>{notification.from}</p> */}
        <p>{notification.text}</p>
      </div>
    </Link>
  );
}

export default TeamNotification;
