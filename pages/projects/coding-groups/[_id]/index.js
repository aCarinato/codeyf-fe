// react / next
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// libs
import axios from 'axios';
// own components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import BuddyCard from '../../../../components/people/BuddyCard';
import BtnCTA from '../../../../components/UI/BtnCTA';
// helper funcs
import getUserInfo from '../../../../lib/helper/chats/getUserInfo';

function GroupPage() {
  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  //   people
  const [organiser, setOrganiser] = useState({});

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      //   console.log(res);
      setGroup(res.data.group);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrganiser = async () => {
    const fetchedOrganiser = await getUserInfo(group.organiser);
    setOrganiser(fetchedOrganiser);
  };

  useEffect(() => {
    if (groupId !== undefined && groupId.length > 0) {
      fetchGroup();
    }
  }, [groupId]);

  useEffect(() => {
    if (group !== {} && group.organiser && group.organiser.length > 0) {
      fetchOrganiser();
    }
  }, [group]);

  //   console.log(group);

  let availabilityStatus;
  let availableSpots;
  if (group && group !== {} && group.buddies) {
    availableSpots = group.nBuddies - group.buddies.length - 1;

    if (availableSpots > 0) {
      availabilityStatus = (
        <div>
          <p className="card-group-available">
            {availableSpots} more spots available!
          </p>
          <BtnCTA classname="btn-dark" label="Join Group" />
        </div>
      );
      //   console.log(availabilityStatus);
    } else {
      availabilityStatus = (
        <p className="card-group-unavailable">Group filled</p>
      );
    }
  }

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <Fragment>
          <div className="flex flex-justify-space-between">
            <h2>{group.name}</h2>
            <div className="flex">
              {availableSpots > 0 ? (
                <BtnCTA classname="btn-dark" label="Join Group" />
              ) : (
                availabilityStatus
              )}
              {group.mentorRequired === 'yes' && group.mentors.length === 0 && (
                <BtnCTA classname="btn-light-big" label="Mentor Group" />
              )}
            </div>
          </div>
          <br></br>
          <div>
            <h4>Description:</h4>
            <p>{group.description}</p>
          </div>
          <br></br>
          <div>
            <h4>Maximum number of participants (buddies):</h4>
            <p>{group.nBuddies}</p>
          </div>

          <br></br>

          <div className="grid grid---2cols-20-80">
            <div>
              <h4>Organiser:</h4>
              <br></br>
              {group.organiser && organiser !== {} && organiser.username && (
                <div className="grid grid---4cols">
                  {/* {JSON.stringify(organiser)} */}
                  <BuddyCard
                    key={organiser._id}
                    userId={organiser._id}
                    username={organiser.username}
                    handle={organiser.handle}
                    description={organiser.shortDescription}
                    country={organiser.country}
                    learning={organiser.learning}
                    profilePic={organiser.profilePic}
                  />
                </div>
              )}
              <br></br>
              {/* {group.mentorRequired === 'yes' && (
                <div>
                  <h4>Mentor</h4>
                  <br></br>
                  {mentors && mentors.length > 0 ? (
                    <div>
                      {mentors.map((mentor, index) => (
                        <MentorCard
                          key={index}
                          username={mentor.username}
                          description={mentor.shortDescription}
                          country={mentor.country}
                          teaching={mentor.teaching}
                        />
                      ))}
                      <br></br>
                      <p className="card-group-unavailable">
                        Mentor position filled
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="card-group-available">
                        Mentor position available!
                      </p>
                      <br></br>
                      <BtnCTA classname="btn-light-big" label="Mentor Group" />
                    </div>
                  )}
                </div>
              )} */}
            </div>
            {/* <div>
              {participants && participants.length > 0 && (
                <div>
                  <h4>Coding buddies</h4>
                  <br></br>
                  <div className="flex flex-justify-flex-start">
                    {' '}
                    {participants.map((participant, index) => (
                      <BuddyCard
                        key={index}
                        username={participant.username}
                        description={participant.shortDescription}
                        country={participant.country}
                        learning={participant.learning}
                      />
                    ))}
                    <div>{availabilityStatus}</div>
                  </div>
                </div>
              )}
            </div> */}
          </div>
          {/* <div>
        {assignement && (
          <>
            <h4>Assignment</h4>
            <br></br>
            <AssignementCard
              key={assignement._id}
              id={assignement._id}
              title={assignement.title}
              description={assignement.description}
              difficulty={assignement.difficulty.label}
              maxParticipants={assignement.maxParticipants.label}
              stack={assignement.stack}
              reviews={assignement.reviews}
            />
          </>
        )}
      </div> */}
        </Fragment>
      )}
    </>
  );
}

export default GroupPage;
