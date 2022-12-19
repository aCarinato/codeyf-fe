// react / next
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import AssignementCard from '../../../../components/assignements/AssignementCard';
import BuddyCard from '../../../../components/people/BuddyCard';
import MentorCard from '../../../../components/people/MentorCard';
import BtnCTA from '../../../../components/UI/BtnCTA';
import JoinTeamCTA from '../../../../components/groups/JoinTeamCTA';
// own functions
import { calcCompletionStatus } from '../../../../lib/helper/groups/completion';
import {
  calcBuddyAvailabilityMsg,
  calcBuddyAvailabilityCTA,
  calcMentorAvailabilityMsg,
  calcMentorAvailabilityCTA,
} from '../../../../lib/helper/groups/availability';
// libs
import axios from 'axios';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../../../context/Context';

function GroupPage() {
  const { authState, currentUser, chats, setChats, mobileView } =
    useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  //   people
  // const [organiser, setOrganiser] = useState({});
  const [buddies, setBuddies] = useState([]);
  const [mentor, setMentor] = useState({});

  const [buddyAvailbilityMsg, setBuddyAvailabilityMsg] = useState('');
  const [buddyAvailbility, setBuddyAvailability] = useState('');
  const [mentorAvailbilityMsg, setMentorAvailabilityMsg] = useState('');
  const [mentorAvailbility, setMentorAvailability] = useState('');
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
  // console.log(group);
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

  useEffect(() => {
    if (group && group !== {}) {
      setBuddyAvailabilityMsg(calcBuddyAvailabilityMsg(group));
      setBuddyAvailability(calcBuddyAvailabilityCTA(group, currentUser));
      setMentorAvailabilityMsg(calcMentorAvailabilityMsg(group));
      // const temp = calcMentorAvailabilityCTA(group, currentUser);
      setMentorAvailability(calcMentorAvailabilityCTA(group, currentUser));
    }
  }, [group, currentUser]);
  // console.log(`mentorAvailbility: ${mentorAvailbility}`);
  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <Fragment>
          <div className="flex flex-justify-space-between">
            <div>
              <div className="flex">
                {group && (
                  <div className="id-img-container">
                    <img
                      className="card-img"
                      src={
                        group.picture &&
                        group.picture.url &&
                        group.picture.url !== ''
                          ? group.picture.url
                          : '/img/default-group.png'
                      }
                    />
                  </div>
                )}
                <h2 className={mobileView ? 'padding-2rem-tb' : 'padding-2rem'}>
                  {group.name}
                </h2>
              </div>
            </div>

            <Link href={`/projects/coding-groups`}>
              <p className="link-text font-12">
                <Icon icon="material-symbols:arrow-back" /> back to teams
              </p>
            </Link>
          </div>
          <br></br>
          <div className="flex flex-justify-space-between"></div>
          <br></br>
          <div className="grid grid---2cols-70-30">
            <div>
              {group.description && (
                <div>
                  <h4 className="headers">Description:</h4>
                  <p>{group.description}</p>
                  <br></br>
                </div>
              )}
              {group.requirements && group.requirements.length > 0 && (
                <div>
                  <h4 className="headers">
                    Functionalities required for successful completion
                  </h4>
                  <ul>
                    {group.requirements.map((requirement) => (
                      <li key={requirement.idx} className="list-completion">
                        <Icon icon="material-symbols:check-circle" />{' '}
                        {requirement.label}
                      </li>
                    ))}
                  </ul>
                  <br></br>
                </div>
              )}
            </div>
            <div>
              {!group.isClosed &&
                group.organiser &&
                group.organiser._id !== authState.userId && (
                  <JoinTeamCTA
                    group={group}
                    buddyAvailbility={buddyAvailbility}
                    buddyAvailbilityMsg={buddyAvailbilityMsg}
                    mentorAvailbility={mentorAvailbility}
                    mentorAvailbilityMsg={mentorAvailbilityMsg}
                  />
                )}
            </div>
          </div>
          <br></br>
          <div className="flex">
            <div className={!mobileView && 'width-50'}>
              {!group.isClosed && group.deadline && (
                <>
                  <h4 className="headers">
                    Deadline <Icon icon="mdi:clipboard-text-date-outline" />
                  </h4>
                  <p>
                    {new Date(group.deadline).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </>
              )}
            </div>
            <div className={!mobileView && 'width-50'}>
              {group.isClosed ? (
                <div>
                  <Link href={`/projects/coding-groups/${groupId}/status`}>
                    Achieved project goals
                  </Link>
                </div>
              ) : (
                <>
                  <h4 className="headers">
                    Completion status{' '}
                    <Icon icon="ic:baseline-incomplete-circle" />
                  </h4>
                  <div className="flex flex-justify-flex-start">
                    <span>
                      {group.requirements && group.requirements.length > 0
                        ? calcCompletionStatus(group) * 100 + '%'
                        : 'Not applicable'}{' '}
                    </span>
                    <span className="invisible">s</span>
                    <span>
                      {' '}
                      <Link href={`/projects/coding-groups/${groupId}/status`}>
                        <p className="link-text font-12">
                          {' '}
                          view{' '}
                          <Icon icon="material-symbols:arrow-forward-rounded" />
                        </p>
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <br></br>

          <br></br>
          <div className="flex">
            <div className={!mobileView && 'width-50'}>
              <h4 className="headers">
                Main topics <Icon icon="icon-park-outline:topic" />
              </h4>
              <div className="flex flex-justify-flex-start">
                {group &&
                  group.topics &&
                  group.topics.map((item) => (
                    <div key={item._id} className={`tech-span`}>
                      <div className="tag-div">o</div>
                      <span>{item.label}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className={!mobileView && 'width-50'}>
              <h4 className="headers">
                Tech stack <Icon icon="bi:stack" />
              </h4>
              <div className="flex flex-justify-flex-start">
                {group &&
                  group.learning &&
                  group.learning.map((item) => (
                    <div key={item._id} className={`tech-span`}>
                      <div className="tag-div">o</div>
                      <span>{item.label}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {group.hasProposedAssignment && (
            <>
              <br></br>
              <h4 className="headers">Assignment:</h4>
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
                picture={group.proposedAssignment.picture}
              />
            </>
          )}
          <br></br>

          {group.organiser && group.organiser.username && (
            <>
              {/* <h4>Organiser:</h4>
              <br></br> */}
              <div className="grid grid--2cols">
                {/* <div>
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
                </div> */}

                {!group.isClosed &&
                  group.organiser._id === authState.userId && (
                    <div>
                      <p>
                        <Link
                          href={`/projects/coding-groups/${groupId}/manage`}
                        >
                          Manage group
                        </Link>
                      </p>
                    </div>
                  )}
              </div>
            </>
          )}
          <div className="flex flex-justify-flex-start">
            <h4 className="headers">Maximum number of buddies: </h4>
            <span className="invisible">0</span>
            <span>{group.nBuddies}</span>
            <span className="invisible">0</span>
            <span>
              <Icon icon="material-symbols:arrow-forward-rounded" />
            </span>
            <span className="invisible">0</span>
            <span>{buddyAvailbilityMsg}</span>
          </div>
          <div>
            <br></br>
            <h4 className="headers">Coding buddies</h4>
            {/* <br></br> */}
            {buddies && buddies.length > 0 ? (
              <div className="flex flex-justify-flex-start gap-12">
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

          {/* {group.mentorRequired && (
            <>
              <h4>Mentor</h4>
              <br></br>
            </>
          )} */}
          <h4 className="headers">Mentor</h4>
          <br></br>
          {group.isClosed ? (
            group.mentorRequired ? (
              group.mentorsFilled === 'filled' ? (
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
                <div>No mentor for this team project</div>
              )
            ) : (
              ''
            )
          ) : (
            ''
          )}

          {
            !group.isClosed &&
              (group.mentorRequired ? (
                group.mentorsFilled ? (
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
                  <div className="card-group-available">
                    Mentor position available!
                  </div>
                )
              ) : (
                <div>No mentor required for this project</div>
              ))
            // (group.mentorRequired ? (
            //   mentorAvailbilityStatus === 'filled' ? (
            //     <div>
            //       <MentorCard
            //         key={mentor._id}
            //         userId={mentor._id}
            //         username={mentor.username}
            //         handle={mentor.handle}
            //         description={mentor.shortDescription}
            //         country={mentor.country}
            //         teaching={mentor.teaching}
            //         profilePic={mentor.profilePic}
            //       />
            //     </div>
            //   ) : mentorAvailbilityStatus === 'available' ? (
            //     <div className="card-group-available">
            //       Mentor position available!
            //     </div>
            //   ) : (
            //     <div>No mentor required for this project</div>
            //   )
            // ) : (
            //   ''
            // ))
          }
        </Fragment>
      )}
    </>
  );
}

export default GroupPage;

// http://localhost:3000/projects/coding-groups/636b5bf80f7fa60c9716fa6e
