import classes from './GroupCard.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import BtnCTA from '../UI/BtnCTA';

function GroupCard(props) {
  const { group } = props;

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
          {availableBuddySpots > 1 && <span>s</span>} still available!
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
          {availableMentorSpots > 1 && <span>s</span>} still available!
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
      {/* <div className="card-group-header">
        <h4>{group.name}</h4>
      </div> */}
      <div className="card-header">
        <div className="card-img-container">
          <img
            className="card-img"
            src={
              group.picture && group.picture.url && group.picture.url !== ''
                ? group.picture.url
                : '/img/default-group.png'
            }
          />
        </div>
        <div className="card-header-username-country">
          <p className="card-header-username">{group.name}</p>
          {group.headline && (
            <p className="card-header-description">{group.headline}</p>
          )}
        </div>
      </div>
      {/* <div className="card-description">{group.description}</div> */}

      <p className="card-learning">Tech stack:</p>
      <div className="tech-span-box">
        {group.learning.slice(0, 4).map((item) => (
          <div key={item._id} className={`tech-span`}>
            <div className="tag-div">o</div>
            <span>{item.label}</span>
          </div>
        ))}
        {group.learning.length > 4 && (
          <div className={`tech-span`}>
            <div className="tag-div">o</div>
            <span>more...</span>
          </div>
        )}
      </div>

      <div className={classes['div-participants']}>
        {group.mentorRequired
          ? `Up to ${
              Number(group.nBuddies) + Number(group.nMentorsRequired)
            } participants`
          : `Up to ${group.nBuddies} participants`}
      </div>

      <div className="flex">
        <div className={classes['div-45']}>
          {!group.isClosed && buddyAvailbilityDisplay}
        </div>
        <div className={classes['div-45']}>
          {!group.isClosed && group.mentorRequired
            ? mentorAvailbilityDisplay
            : !group.isClosed && 'Mentor not required'}
        </div>
      </div>

      <div className="card-footer">
        <Link href={`/projects/coding-groups/${group._id}`}>
          <div className="card-footer-cta">
            view project <Icon icon="akar-icons:people-group" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default GroupCard;
