import classes from './GroupCard.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import BtnCTA from '../UI/BtnCTA';

function GroupCard(props) {
  const {
    group,
    // id,
    // name,
    // techStack,
    // nBuddies,
    // buddies,
    mode = 'viewer',
    status,
  } = props;
  //   const techStack = group.techStack;
  // let availabilityStatus;

  // const availableSpots = nBuddies - buddies.length;

  // if (availableSpots > 0) {
  //   availabilityStatus = (
  //     <p className="card-group-available">
  //       {availableSpots} more spots available!
  //     </p>
  //   );
  // } else {
  //   availabilityStatus = <p className="card-group-unavailable">Group filled</p>;
  // }

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
  // else if (group && group !== {} && !group.mentorRequired) {
  //   mentorAvailbilityStatus = 'unrequired';
  //   mentorAvailbilityDisplay = <p>No mentor required for this team</p>;
  // }

  return (
    <div className="main-card-container">
      <div className="card-group-header">
        <h4>{group.name}</h4>
      </div>

      {/* <p>{description}</p> */}
      <p className="card-learning">Group topics:</p>
      <div className="tech-span-box">
        {group.learning.slice(0, 7).map((item) => (
          <span key={item._id} className={`tech-span tech-span---${item}`}>
            {item.label}
          </span>
        ))}
      </div>
      <p>Max {group.nBuddies} buddies</p>
      {!group.isClosed && buddyAvailbilityDisplay}
      {!group.isClosed && mentorAvailbilityDisplay}
      <div className="card-footer">
        {mode === 'viewer' ? (
          <>
            <div className="card-footer-profile">
              <Link href={`/projects/coding-groups/${group._id}`}>
                <a className="main-link">
                  View Team <Icon icon="akar-icons:people-group" />
                </a>
              </Link>
            </div>
            {/* <div className="card-footer-message">
              <BtnCTA
                label="Message"
                onCLickAction={() => {}}
                icon={true}
                iconType="ant-design:message-outlined"
              />
            </div> */}
          </>
        ) : (
          <>
            {status === 'draft' && (
              <div className="card-footer-profile">
                <Link href={`/projects/coding-groups/${group._id}/edit`}>
                  <a className="main-link">
                    Edit <Icon icon="akar-icons:edit" />
                  </a>
                </Link>
              </div>
            )}
            {status === 'active' && (
              <div className="card-footer-profile">
                <Link href={`/projects/coding-groups/${group._id}/manage`}>
                  <a className="main-link">
                    Mark completion <Icon icon="fa6-solid:trophy" />
                  </a>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GroupCard;
