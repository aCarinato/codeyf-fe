// react / next
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// libs
import axios from 'axios';
// own components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import BuddyCard from '../../../../components/people/BuddyCard';
import MentorCard from '../../../../components/people/MentorCard';
import BtnCTA from '../../../../components/UI/BtnCTA';
// helper funcs
// import getUserInfo from '../../../../lib/helper/chats/getUserInfo';
// context
import { useMainContext } from '../../../../context/Context';
import Link from 'next/link';

function GroupPage() {
  const { authState, chats, setChats } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  //   people
  const [organiser, setOrganiser] = useState({});
  const [buddies, setBuddies] = useState([]);
  const [mentor, setMentor] = useState({});

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      // console.log(res);
      setGroup(res.data.group);
      setOrganiser(res.data.group.organiser);
      setBuddies(res.data.group.buddies);
      setMentor(res.data.group.mentors[0]);
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

  const addChat = async () => {
    if (authState && authState.email.length > 0) {
      // console.log(user);
      const alreadyInChat =
        chats.length > 0 &&
        chats.filter((chat) => chat.messagesWith === group.organiser).length >
          0;

      if (alreadyInChat) {
        return router.push(`/my-profile/chats?message=${group.organiser}`);
      }
      //
      else {
        const newChat = {
          messagesWith: group.organiser,
          username: organiser.username,
          profilePicUrl:
            profilePic && profilePic.url && profilePic.url !== ''
              ? profilePic.url
              : '/img/default-pic.png',
          lastMessage: '',
          date: Date.now(),
        };

        setChats((prev) => [newChat, ...prev]);

        return router.push(
          `/my-profile/chats?message=${group.organiser}`,
          undefined,
          {
            shallow: true,
          }
        );

        //   return router.push(`/messages?message=${user._id}`);
      }
    } else {
      router.push('/login');
    }
  };

  let availabilityStatus;
  let availableSpots;
  if (group && group !== {} && group.buddies) {
    availableSpots = group.nBuddies - group.buddies.length;

    if (availableSpots > 0) {
      //   console.log(`availableSpots: ${availableSpots}`);
      availabilityStatus = (
        <div>
          <p className="card-group-available">
            {availableSpots} more spots available!
          </p>
          {organiser._id !== authState.userId && (
            <>
              {' '}
              <p>Message the organiser to enquire or for a join request</p>
              <BtnCTA
                classname="btn-dark"
                label="Message"
                onCLickAction={addChat}
              />
            </>
          )}
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
              {availableSpots > 0 && availabilityStatus}

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

          <h4>Organiser:</h4>
          <br></br>
          {group.organiser && organiser !== {} && organiser.username && (
            <div className="grid grid--2cols">
              <div>
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
              <div>
                {organiser._id === authState.userId && (
                  <p>
                    <Link href={`/projects/coding-groups/${groupId}/manage`}>
                      Manage group
                    </Link>
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <br></br>
            <h4>Coding buddies</h4>
            <br></br>
            {buddies && buddies.length > 0 ? (
              <div className="flex flex-justify-flex-start">
                {' '}
                {buddies.map((buddy) => (
                  <BuddyCard
                    key={buddy._id}
                    userId={buddy._id}
                    username={buddy.username}
                    handle={buddy.handle}
                    description={buddy.shortDescription}
                    country={buddy.country}
                    learning={buddy.learning}
                    profilePic={buddy.profilePic}
                  />
                ))}
                {/* <div>{availabilityStatus}</div> */}
              </div>
            ) : (
              <div>
                <p>No buddies yet</p>
              </div>
            )}
          </div>
          <br></br>

          <h4>Mentor</h4>
          <br></br>
          {group.mentorRequired && mentor && mentor !== {} ? (
            <div>
              <MentorCard
                key={mentor._id}
                userId={mentor._id}
                username={mentor.username}
                handle={mentor.handle}
                description={mentor.shortDescription}
                country={mentor.country}
                teaching={mentor.teaching}
                profilePic={mentor.profilePic}
              />
            </div>
          ) : (
            <div>No mentor required for this team</div>
          )}

          <div className="grid grid---2cols-20-80">
            <div>
              <br></br>
              {group.mentorRequired === 'yes' && (
                <div>
                  <h4>Mentor</h4>
                  <br></br>
                  {group.mentors && group.mentors.length > 0 ? (
                    <div>
                      {group.mentors.map((mentor) => (
                        <MentorCard
                          key={mentor._id}
                          userId={mentor._id}
                          username={mentor.username}
                          handle={mentor.handle}
                          description={mentor.shortDescription}
                          country={mentor.country}
                          teaching={mentor.teaching}
                          profilePic={mentor.profilePic}
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
              )}
            </div>
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

// http://localhost:3000/projects/coding-groups/636b5bf80f7fa60c9716fa6e
