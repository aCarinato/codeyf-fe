// own components
import TeamNotification from '../../../../components/message/teams/TeamNotification';
// context
import { useMainContext } from '../../../../context/Context';

function ProjectNotificationsPage() {
  const { groupNotificationsFrom } = useMainContext();

  return (
    <div>
      {groupNotificationsFrom.map((notification) => (
        <TeamNotification key={notification._id} notification={notification} />
      ))}
    </div>
  );
}

export default ProjectNotificationsPage;
