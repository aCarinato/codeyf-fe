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

  const [groupsCompleted, setGroupsCompleted] = useState([]);
  const [groupsOrganised, setGroupsOrganised] = useState([]);
  const [buddyPartakenGroups, setBuddyPartakenGroups] = useState([]);
  const [mentorPartakenGroups, setMentorPartakenGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompletedGroups = async () => {
    try {
      setLoading(true);
      const userId = authState.userId;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/user/completed/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res);
      if (res.data.success) {
        setGroupsCompleted(res.data.groups);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      setGroupsOrganised(res.data.groups);
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
      fetchCompletedGroups();
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
          <h4>Team projects completed</h4>
          <br></br>
          {groupsCompleted.length > 0 ? (
            <div className="flex">
              {groupsCompleted.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
            </div>
          ) : (
            <div>Not yet completed any team project</div>
          )}
          <br></br>
          <h4>Team projects organised and managed by me</h4>
          <br></br>
          {groupsOrganised.length > 0 ? (
            <div className="flex">
              {groupsOrganised.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
            </div>
          ) : (
            <div>No teams organised by you</div>
          )}
          <br></br>
          <h4>Team projects I'm working on as a buddy</h4>
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
          <h4>Team projects I'm working on as a mentor</h4>
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
