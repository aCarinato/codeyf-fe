// react / next
import { useEffect, useState } from 'react';
// components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import GroupCard from '../../../../components/groups/GroupCard';
// context
import { useMainContext } from '../../../../context/Context';
// libs
import axios from 'axios';

function MyGroupsPage() {
  const { authState } = useMainContext();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyGroups = async () => {
    try {
      setLoading(true);
      const userId = authState.userId;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res);
      setGroups(res.data.groups);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token && authState.token.length > 0) {
      fetchMyGroups();
    }
  }, [authState]);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <h4>Organised by me</h4>
          <br></br>
          <div className="flex">
            {groups.map((group) => (
              <GroupCard
                key={group._id}
                id={group._id}
                name={group.name}
                description={group.description}
                techStack={group.learning}
                nBuddies={group.nBuddies}
                buddies={group.buddies}
                // proposedProject={group.proposedProject}
              />
            ))}
          </div>
          <br></br>
          <h4>Groups I'm working on</h4>
          <br></br>
        </>
      )}
    </>
  );
}

export default MyGroupsPage;
