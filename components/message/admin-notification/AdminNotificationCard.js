// styles
import classes from './AdminNotificationCard.module.css';
// next / react
import Link from 'next/link';

function AdminNotificationCard(props) {
  const { notificationId, createdAt, isRead, message, readAdminNotification } =
    props;

  const humanReadableReceivedTime = new Date(createdAt).toLocaleDateString(
    'en-EN',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  const hour = new Date(createdAt).getHours();
  const minutes = new Date(createdAt).getMinutes();

  return (
    <Link href={`/my-profile/notifications/admin/${notificationId}`}>
      <div
        onClick={() => readAdminNotification(notificationId, isRead)}
        className={!isRead ? classes.containerUnread : classes.container}
      >
        <p>
          Received on: {humanReadableReceivedTime} at {hour}:{minutes}
        </p>
        <br></br>
        <p>{message}</p>
      </div>
    </Link>
  );
}

export default AdminNotificationCard;
