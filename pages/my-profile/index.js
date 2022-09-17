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
  const [draftGroups, setDraftGroups] = useState([]);
  const [activeGroups, setActiveGroups] = useState([]);
  const [participatedGroups, setParticipatedGroups] = useState([]);

  const fetchUser = () => {
    setLoading(true);
    const selectedUser = people.filter((person) => person.id === '1')[0];
    setUser(selectedUser);
    setLoading(false);
  };

  const fecthOrganisedGroups = () => {
    if (user !== undefined && user !== {} && user.id) {
      const filteredDraftGroups = groups.filter(
        (group) => group.organiser === user.id && group.status === 'draft'
      );
      setDraftGroups(filteredDraftGroups);

      const filteredActiveGroups = groups.filter(
        (group) => group.organiser === user.id && group.status === 'active'
      );
      setActiveGroups(filteredActiveGroups);
    }
  };

  const fetchParticipatedGroups = () => {
    if (user !== undefined && user !== {} && user.id) {
      const filteredParticipatedGroups = groups.filter(
        (group) =>
          group.organiser !== user.id && group.buddies.includes(user.id)
      );
      setParticipatedGroups(filteredParticipatedGroups);
    }
  };

  useEffect(() => {
    fetchUser();
    fecthOrganisedGroups();
    fetchParticipatedGroups();
  }, [user]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          {user !== {} && user.id && <div>{user.username}</div>}
          <div>
            <h3>MY GROUPS</h3>
            <br></br>
            <h4>Organized by me</h4>
            <br></br>
            {draftGroups.length > 0 && (
              <Fragment>
                <h5>Draft groups</h5>
                <div className="flex">
                  {draftGroups.map((group) => (
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
                      status="draft"
                    />
                  ))}
                  <div className="white-card"></div>
                  <div className="white-card"></div>
                </div>
                <br></br>
              </Fragment>
            )}
            {activeGroups.length > 0 && (
              <Fragment>
                <h5>Active groups</h5>
                <div className="flex">
                  {activeGroups.map((group) => (
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
                      status="active"
                    />
                  ))}
                  <div className="white-card"></div>
                  <div className="white-card"></div>
                </div>
                <br></br>
              </Fragment>
            )}
            {participatedGroups.length > 0 && (
              <Fragment>
                <h5>Participated groups</h5>
                <div className="flex">
                  {participatedGroups.map((group) => (
                    <GroupCard
                      key={group._id}
                      id={group._id}
                      name={group.name}
                      description={group.description}
                      techStack={group.learning}
                      nBuddies={group.nBuddies}
                      buddies={group.buddies}
                      proposedProject={group.proposedProject}
                      mode="viewer"
                    />
                  ))}
                  <div className="white-card"></div>
                  <div className="white-card"></div>
                </div>
                <br></br>
              </Fragment>
            )}
            {/* SETTINGS (signout, edit, delete, etc.) - NOTIFICATIONS (messages, review requests, etc.) */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default MyProfilePage;
