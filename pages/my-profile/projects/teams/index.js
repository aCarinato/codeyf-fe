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
  const [buddyPartakenGroups, setBuddyPartakenGroups] = useState([]);
  const [mentorPartakenGroups, setMentorPartakenGroups] = useState([]);
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

  const fetchBuddyPartakenGroups = async () => {
    try {
      setLoading(true);
      const userId = authState.userId;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/user/buddy-partaken/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res);
      setBuddyPartakenGroups(res.data.groups);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMentorPartakenGroups = async () => {
    try {
      setLoading(true);
      const userId = authState.userId;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/user/mentor-partaken/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res);
      setMentorPartakenGroups(res.data.groups);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token && authState.token.length > 0) {
      fetchMyGroups();
      fetchBuddyPartakenGroups();
      fetchMentorPartakenGroups();
    }
  }, [authState]);

  // console.log(partakenGroups);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <h4>Organised by me</h4>
          <br></br>
          {groups.length > 0 ? (
            <div className="flex">
              {groups.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
            </div>
          ) : (
            <div>No teams organised by you</div>
          )}
          <br></br>
          <h4>Teams I'm working with as a buddy</h4>
          <br></br>
          {buddyPartakenGroups.length > 0 ? (
            <div className="flex">
              {buddyPartakenGroups.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
            </div>
          ) : (
            <div>Currently not participating as a buddy to any team</div>
          )}
          <br></br>
          <h4>Teams I'm working with as a mentor</h4>
          <br></br>
          {mentorPartakenGroups.length > 0 ? (
            <div className="flex">
              {mentorPartakenGroups.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
            </div>
          ) : (
            <div>Currently not participating as a mentor to any team</div>
          )}
        </>
      )}
    </>
  );
}

export default MyGroupsPage;
