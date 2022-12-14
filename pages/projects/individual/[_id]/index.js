// react / next
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// own components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import AssignementCard from '../../../../components/assignements/AssignementCard';
import MentorCard from '../../../../components/people/MentorCard';
import BuddyCard from '../../../../components/people/BuddyCard';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function IndividualProjectPage() {
  const { authState, chats, setChats } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  const [mentee, setMentee] = useState([]);
  const [mentor, setMentor] = useState({});

  const fetchIndividual = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      // console.log(res);
      setGroup(res.data.group);
      // setOrganiser(res.data.group.organiser);
      setMentee(res.data.group.buddies);
      setMentor(res.data.group.mentors[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (groupId !== undefined && groupId.length > 0) {
      fetchIndividual();
    }
  }, [groupId]);

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
  }

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <div className="flex flex-justify-space-between">
            <h2>{group.name}</h2>
            <p>
              <Link href={`/projects/individual`}>Back</Link>
            </p>
          </div>
          <br></br>
          <div className="flex flex-justify-space-between">
            {group.organiser && group.organiser.username && (
              <div>
                Organised by:{' '}
                <Link
                  href={`/people/coding-buddies/${group.organiser.username}`}
                >
                  {group.organiser.username}
                </Link>
              </div>
            )}
            {/* {!group.isClosed && (
              <div className="flex">
                <div>
                  {buddyAvailbilityDisplay}
                  {mentorAvailbilityDisplay}
                  {sectionCTA}
                </div>

                {group.mentorRequired === 'yes' &&
                  group.mentors.length === 0 && (
                    <BtnCTA classname="btn-light-big" label="Mentor Group" />
                  )}
              </div>
            )} */}
          </div>
          <br></br>
          {group.description && (
            <div>
              <h4>Description:</h4>
              <p>{group.description}</p>
            </div>
          )}
          <br></br>
          {group.requirements && group.requirements.length > 0 && (
            <div>
              <h4>Project requirements:</h4>
              <ul>
                {group.requirements.map((requirement) => (
                  <li key={requirement.idx}>{requirement.label}</li>
                ))}
              </ul>
              <br></br>
            </div>
          )}
          <br></br>
          {!group.isClosed && group.deadline && (
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
          <h4>Tech stack:</h4>
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
          <br></br>
          <h4>Main topics:</h4>
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
          <br></br>
          {group.isClosed ? (
            <div>
              <Link href={`/projects/coding-groups/${groupId}/status`}>
                Achieved project goals
              </Link>
            </div>
          ) : (
            <div>
              <Link href={`/projects/coding-groups/${groupId}/status`}>
                View completion status
              </Link>
            </div>
          )}
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

          <div>
            <br></br>
            <h4>Mentee</h4>
            <br></br>
            {mentee && mentee.length > 0 ? (
              <div className="flex flex-justify-flex-start">
                {' '}
                {mentee.map((buddy) => (
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
              <div className="card-group-available">
                Mentee position available!
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
          <h4>Mentor</h4>
          <br></br>
          {group.isClosed ? (
            group.mentorRequired ? (
              mentorAvailbilityStatus === 'filled' ? (
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

          {!group.isClosed &&
            (group.mentorRequired ? (
              mentorAvailbilityStatus === 'filled' ? (
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
            ))}
        </>
      )}
    </>
  );
}

export default IndividualProjectPage;
