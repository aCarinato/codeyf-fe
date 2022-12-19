import classes from './IndividualCard.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
// import BtnCTA from '../UI/BtnCTA';

function IndividualCard({ group, type, status }) {
  // const { group, type = 'team', mode = 'viewer', status } = props;

  // buddies availability
  let availableBuddySpots;
  let buddyAvailbilityStatus;
  let buddyAvailbilityDisplay;
  if (type === 'mentor') {
    if (group && group !== {} && group.buddiesFilled) {
      buddyAvailbilityStatus = 'filled';
      buddyAvailbilityDisplay = (
        <p className="card-group-unavailable">Mentee position filled</p>
      );
    } else if (group && group !== {} && !group.buddiesFilled) {
      buddyAvailbilityStatus = 'available';
      if (group.buddies) {
        availableBuddySpots = group.nBuddies - group.buddies.length;

        buddyAvailbilityDisplay = (
          <p className="card-group-available">
            {/* {availableBuddySpots} mentee position
            {availableBuddySpots > 1 && <span>s</span>} still available! */}
            mentee position still available!
          </p>
        );
      }
    }
  }

  let availableMentorSpots;
  let mentorAvailbilityStatus;
  let mentorAvailbilityDisplay;
  // mentor availability
  if (type === 'mentee') {
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
            {/* {availableMentorSpots} mentor position
            {availableMentorSpots > 1 && <span>s</span>} still available! */}
            mentor position still available!
          </p>
        );
      }
    }
  }

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
      <div className="flex">
        {type === 'mentor' ? (
          <div className={classes['div-45']}>
            {!group.isClosed && buddyAvailbilityDisplay}
          </div>
        ) : (
          <div className={classes['div-45']}>
            {!group.isClosed && mentorAvailbilityDisplay}
            {/* {!group.isClosed && group.mentorRequired
              ? mentorAvailbilityDisplay
              : !group.isClosed && 'Mentor not required'} */}
          </div>
        )}
      </div>
      <div className="card-footer">
        <Link href={`/projects/individual/${group._id}`}>
          <div className="card-footer-cta">
            view project <Icon icon="octicon:project-roadmap-16" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default IndividualCard;
