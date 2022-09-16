import { Fragment, useEffect, useState } from 'react';
// data
import { people } from '../../data/people';
import { groups } from '../../data/groups';
// own components
import GroupCard from '../../components/groups/GroupCard';

function MyProfilePage() {
  // FOR NOW THIS IS DONE FOR A FIXED USER
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [organisedGroups, setOrganisedGroups] = useState([]);

  const fetchUser = () => {
    setLoading(true);
    const selectedUser = people.filter((person) => person.id === '1')[0];
    setUser(selectedUser);
    setLoading(false);
  };

  const fecthOrganisedGroups = () => {
    if (user !== {} && user.id) {
      const filteredGroups = groups.filter(
        (group) => group.organiser === user.id
      );
      setOrganisedGroups(filteredGroups);
    }
  };

  useEffect(() => {
    fetchUser();
    fecthOrganisedGroups();
  }, [user]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          {user !== {} && user.id && <div>{user.username}</div>}
          <div>
            <h3>My Groups</h3>
            <br></br>
            <h4>Organized</h4>
            {organisedGroups.map((group) => (
              <GroupCard
                key={group._id}
                id={group._id}
                name={group.name}
                description={group.description}
                techStack={group.learning}
                nBuddies={group.nBuddies}
                buddies={group.buddies}
                proposedProject={group.proposedProject}
                mode="organiser"
              />
            ))}
            {/* SETTINGS (signout, edit, delete, etc.) - NOTIFICATIONS (messages, review requests, etc.) */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default MyProfilePage;
