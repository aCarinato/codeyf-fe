// react / next
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
// libs
import axios from 'axios';
// own components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import AssignementCard from '../../../../components/assignements/AssignementCard';
import BuddyCard from '../../../../components/people/BuddyCard';
import MentorCard from '../../../../components/people/MentorCard';
import BtnCTA from '../../../../components/UI/BtnCTA';
// context
import { useMainContext } from '../../../../context/Context';

function GroupPage() {
  const { authState, chats, setChats } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  //   people
  // const [organiser, setOrganiser] = useState({});
  const [buddies, setBuddies] = useState([]);
  const [mentor, setMentor] = useState({});

  // console.log(group);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      // console.log(res);
      setGroup(res.data.group);
      // setOrganiser(res.data.group.organiser);
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
        chats.filter((chat) => chat.messagesWith === group.organiser._id)
          .length > 0;

      if (alreadyInChat) {
        return router.push(`/my-profile/chats?message=${group.organiser._id}`);
      }
      //
      else {
        const newChat = {
          messagesWith: group.organiser._id,
          username: group.organiser.username,
          profilePicUrl:
            group.organiser.profilePic &&
            group.organiser.profilePic.url &&
            group.organiser.profilePic.url !== ''
              ? group.organiser.profilePic.url
              : '/img/default-pic.png',
          lastMessage: '',
          date: Date.now(),
        };

        setChats((prev) => [newChat, ...prev]);

        return router.push(
          `/my-profile/chats?message=${group.organiser._id}`,
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

  // buddies availability
  let availableBuddySpots;
  let buddyAvailbilityStatus;
  let buddyAvailbilityDisplay;
  if (group && group !== {} && group.buddiesFilled) {
    buddyAvailbilityStatus = 'filled';
    buddyAvailbilityDisplay = (
      <p className="card-group-unavailable">Buddy positions filled</p>
    );
  } else if (group && group !== {} && !group.buddiesFilled) {
    buddyAvailbilityStatus = 'available';
    if (group.buddies) {
      availableBuddySpots = group.nBuddies - group.buddies.length;

      buddyAvailbilityDisplay = (
        <p className="card-group-available">
          {availableBuddySpots} buddy position
          {availableBuddySpots > 1 && <span>s</span>} available!
        </p>
      );
    }
  }
  // console.log(buddyAvailbilityStatus);
  // console.log(group);

  // mentor availability
  let availableMentorSpots;
  let mentorAvailbilityStatus;
  let mentorAvailbilityDisplay;
  if (group && group !== {} && group.mentorsFilled) {
    mentorAvailbilityStatus = 'filled';
    mentorAvailbilityDisplay = (
      <p className="card-group-unavailable">Mentor position filled</p>
    );
  } else if (
    group &&
    group !== {} &&
    group.mentorRequired &&
    !group.mentorsFilled
  ) {
    mentorAvailbilityStatus = 'available';
    if (group.mentors) {
      availableMentorSpots = group.nMentorsRequired - group.mentors.length;

      mentorAvailbilityDisplay = (
        <p className="card-group-available">
          {availableMentorSpots} mentor position
          {availableMentorSpots > 1 && <span>s</span>} available!
        </p>
      );
    }
  } else if (group && group !== {} && !group.mentorRequired) {
    mentorAvailbilityStatus = 'unrequired';
    mentorAvailbilityDisplay = <p>No mentor required for this project</p>;
  }

  // CTA
  let sectionCTA;
  if (group && group.organiser && group.organiser._id !== authState.userId) {
    if (
      buddyAvailbilityStatus === 'filled' &&
      mentorAvailbilityStatus === 'available'
    ) {
      sectionCTA = (
        <>
          <p>
            Message the organiser to enquire or to request joining as a mentor
          </p>
          <BtnCTA
            classname="btn-dark"
            label="Message"
            onCLickAction={addChat}
          />
        </>
      );
    } else if (
      buddyAvailbilityStatus === 'available' &&
      (mentorAvailbilityStatus === 'filled' ||
        mentorAvailbilityStatus === 'unrequired')
    ) {
      sectionCTA = (
        <>
          <p>
            Message the organiser to enquire or to request joining as a buddy
          </p>
          <BtnCTA
            classname="btn-dark"
            label="Message"
            onCLickAction={addChat}
          />
        </>
      );
    } else if (
      buddyAvailbilityStatus === 'available' &&
      mentorAvailbilityStatus === 'available'
    ) {
      sectionCTA = (
        <>
          <p>
            Message the organiser to enquire or to request joining as a mentor
            or buddy (yes, you can be both!)
          </p>
          <BtnCTA
            classname="btn-dark"
            label="Message"
            onCLickAction={addChat}
          />
        </>
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
              <div>
                {buddyAvailbilityDisplay}
                {mentorAvailbilityDisplay}
                {sectionCTA}
              </div>

              {group.mentorRequired === 'yes' && group.mentors.length === 0 && (
                <BtnCTA classname="btn-light-big" label="Mentor Group" />
              )}
            </div>
          </div>
          <br></br>
          {group.description && (
            <div>
              <h4>Description:</h4>
              <p>{group.description}</p>
            </div>
          )}
          <br></br>
          <div>
            <h4>Maximum number of participants (buddies):</h4>
            <p>{group.nBuddies}</p>
          </div>
          <br></br>
          {group.deadline && (
            <div>
              <h4>Deadline</h4>
              <p>
                {new Date(group.deadline).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}
          <br></br>
          <div>
            <Link href={`/projects/coding-groups/${groupId}/status`}>
              View completion status
            </Link>
          </div>
          <br></br>

          {group.hasProposedAssignment && (
            <>
              <h4>Assignment:</h4>
              <br></br>
              <AssignementCard
                key={group.proposedAssignment._id}
                id={group.proposedAssignment._id}
                title={group.proposedAssignment.name}
                description={group.proposedAssignment.headline}
                difficulty={group.proposedAssignment.difficulty}
                maxParticipants={group.proposedAssignment.maxTeamMemebers}
                stack={group.proposedAssignment.learning}
                reviews={group.proposedAssignment.reviews}
              />
            </>
          )}
          <br></br>
          <h4>Organiser:</h4>
          <br></br>
          {group.organiser && group.organiser.username && (
            <div className="grid grid--2cols">
              <div>
                <BuddyCard
                  key={group.organiser._id}
                  userId={group.organiser._id}
                  username={group.organiser.username}
                  handle={group.organiser.handle}
                  description={group.organiser.shortDescription}
                  country={group.organiser.country}
                  learning={group.organiser.learning}
                  profilePic={group.organiser.profilePic}
                />
              </div>
              <div>
                {group.organiser._id === authState.userId && (
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
          {mentorAvailbilityStatus === 'filled' ? (
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
          ) : mentorAvailbilityStatus === 'available' ? (
            <div className="card-group-available">
              Mentor position available!
            </div>
          ) : (
            <div>No mentor required for this project</div>
          )}

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
