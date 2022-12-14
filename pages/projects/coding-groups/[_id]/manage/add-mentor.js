// next react
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// own compoentns
import UserRoute from '../../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import MentorCard from '../../../../../components/people/MentorCard';
import BtnCTA from '../../../../../components/UI/BtnCTA';
import CardSelector from '../../../../../components/UI/CardSelector';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../../context/Context';

function AddMentorPage() {
  const { mobileView, authState, socket } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [teamMentors, setTeamMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      //   console.log(res);
      setTeamMentors(res.data.group.mentors);
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

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/mentors`
      );

      if (res.data.success) {
        if (authState && authState.email.length > 0) {
          // filter out current user
          //   const userEmail = authState.email;
          let allMentors = res.data.mentors;
          let filteredMentors = allMentors.filter((mentor) => {
            // exclude users already in the group
            let alreadyMentorCondition;
            // check if in allBuddies is included some teamBuddies
            alreadyMentorCondition = teamMentors
              .map((item) => item._id)
              .includes(mentor._id);
            // console.log(!alreadyBuddyCondition);
            return !alreadyMentorCondition;
          });
          setFilteredMentors(filteredMentors);
        } else {
          setFilteredMentors(res.data.buddies);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [teamMentors, authState && authState.email]);

  const sendReq = () => {
    if (socket.current) {
      socket.current.emit('joinGroupReq', {
        // senderId: authState.userId,
        organiserId: authState.userId,
        groupId: groupId,
        userToAddId: selectedId,
        type: 'mentor',
      });
      setSuccess(true);
      // here i need to save in my array (context) of notifications to the new notification
      // meanwhile it will be saved also in the backend
    }
  };

  const addMentor = () => {
    if (socket.current) {
      //   socket.current.emit('addMentorToGroup', {
      socket.current.emit('addUserToGroup', {
        organiserId: authState.userId,
        groupId: groupId,
        userToAddId: selectedId,
        type: 'mentor',
      });
      setSuccess(true);
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
      <p>You successfully added a new mentor!</p>
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
          <h3>Request new mentor</h3>
          <div className="flex">
            {filteredMentors && filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <CardSelector
                  key={mentor._id}
                  card={
                    <MentorCard
                      userId={mentor._id}
                      username={mentor.username}
                      handle={mentor.handle}
                      description={mentor.shortDescription}
                      country={mentor.country}
                      teaching={mentor.teaching}
                      profilePic={mentor.profilePic}
                    />
                  }
                  btn={
                    <BtnCTA
                      classname="btn-light-big"
                      label="Send request"
                      onCLickAction={addMentor}
                    />
                  }
                  itemId={mentor._id}
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

export default AddMentorPage;
