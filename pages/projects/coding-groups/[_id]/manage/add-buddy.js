// next react
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// own compoentns
import UserRoute from '../../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import BuddyCard from '../../../../../components/people/BuddyCard';
import BtnCTA from '../../../../../components/UI/BtnCTA';
import CardSelector from '../../../../../components/UI/CardSelector';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../../context/Context';

// !!!!!!!!!!!!!!!!!!!!!!!
// SHOULD SHOW ONLY BUDDIES THAT WANT TO LEARN WHAT THE GROUP / ASSIGNMENT IS ABOUT
// ALREADY FILTERED

function AddBuddyPage() {
  const { mobileView, authState, socket } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  // const [buddies, setBuddies] = useState([]);
  const [teamBuddies, setTeamBuddies] = useState([]);
  const [filteredBuddies, setFilteredBuddies] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [selectedId, setSelectedId] = useState('');

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      // console.log(res);
      // setGroup(res.data.group);
      // setOrganiser(res.data.group.organiser);
      setTeamBuddies(res.data.group.buddies);

      // setMentor(res.data.group.mentors[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(teamBuddies);

  const fetchBuddies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/buddies`
      );

      if (res.data.success) {
        if (authState && authState.email.length > 0) {
          // filter out current user
          const userEmail = authState.email;
          let allBuddies = res.data.buddies;
          let filteredBuddies = allBuddies.filter((buddy) => {
            // exclude organiser
            let isNotOrganiserCondition;
            isNotOrganiserCondition = buddy.email !== userEmail;

            // exclude users already in the group
            let alreadyBuddyCondition;
            // check if in allBuddies is included some teamBuddies
            alreadyBuddyCondition = teamBuddies
              .map((item) => item._id)
              .includes(buddy._id);
            // console.log(!alreadyBuddyCondition);
            return !alreadyBuddyCondition;
          });
          // setBuddies(filteredBuddies);
          setFilteredBuddies(filteredBuddies);
        } else {
          // setBuddies(res.data.buddies);
          setFilteredBuddies(res.data.buddies);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (groupId !== undefined && groupId.length > 0) {
      fetchGroup();
    }
  }, [groupId]);

  useEffect(() => {
    fetchBuddies();
  }, [teamBuddies, authState && authState.email]);

  const sendReq = () => {
    if (socket.current) {
      socket.current.emit('joinGroupReq', {
        // senderId: authState.userId,
        organiserId: authState.userId,
        groupId: groupId,
        userToAddId: selectedId,
        type: 'buddy',
      });
      setSuccess(true);
      // here i need to save in my array (context) of notifications to the new notification
      // meanwhile it will be saved also in the backend
    }
  };

  const addBuddy = () => {
    if (socket.current) {
      socket.current.emit('addUserToGroup', {
        // senderId: authState.userId,
        organiserId: authState.userId,
        groupId: groupId,
        userToAddId: selectedId,
        type: 'buddy',
      });
      setSuccess(true);
      // here i need to save in my array (context) of notifications to the new notification
      // meanwhile it will be saved also in the backend
    }
  };

  // in theory this shouldn't occur because the page doesn't show users already in the group
  useEffect(() => {
    if (socket.current) {
      socket.current.on('userToAddAlreadyJoined', ({ msg }) => {
        // console.log(msg);
        setSuccess(false);
        // open a modal that inform the user is already in the group
      });
    }
  }, []);

  const successMsg = (
    <div>
      <p>Your successfully added a new buddy!</p>
      <br></br>
      <Link href={`/projects/coding-groups/${groupId}`}>
        Back to the group page
      </Link>
    </div>
  );

  const unSuccessMsg = (
    <div>
      <p>The user is already in the group</p>
      <br></br>
      <Link href={`/projects/coding-groups/${groupId}/manage`}>
        Back to the group page
      </Link>
    </div>
  );

  return (
    <UserRoute>
      {loading ? (
        <SpinningLoader />
      ) : success ? (
        successMsg
      ) : success === false ? (
        unSuccessMsg
      ) : (
        <>
          <h3>Request new buddy</h3>
          <div className="flex">
            {filteredBuddies.length > 0 ? (
              filteredBuddies.map((buddy) => (
                <CardSelector
                  key={buddy._id}
                  card={
                    <BuddyCard
                      // key={buddy._id}
                      userId={buddy._id}
                      username={buddy.username}
                      handle={buddy.handle}
                      description={buddy.shortDescription}
                      country={buddy.country}
                      learning={buddy.learning}
                      profilePic={buddy.profilePic}
                    />
                  }
                  btn={
                    <BtnCTA
                      classname="btn-light-big"
                      label="Send request"
                      onCLickAction={addBuddy}
                    />
                  }
                  itemId={buddy._id}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              ))
            ) : (
              <p>
                No buddies found for the filters applied. Please select
                different search parameters.
              </p>
            )}
          </div>
        </>
      )}
    </UserRoute>
  );
}

export default AddBuddyPage;

// http://localhost:3000/projects/coding-groups/636b5bf80f7fa60c9716fa6e
