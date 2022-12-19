// react / next
import Link from 'next/link';
// own compoentns
import BtnCTA from '../UI/BtnCTA';
// styles
import classes from './JoinTeamCTA.module.css';
// context
// import { useMainContext } from '../../context/Context';

// if it is organsier there should be the organiser tab
// if not there should be this.

function JoinTeamCTA(props) {
  const {
    group,
    buddyAvailbility,
    buddyAvailbilityMsg,
    mentorAvailbility,
    mentorAvailbilityMsg,
  } = props;

  let textCTA = '';
  let sectionCTA;

  if (buddyAvailbility && mentorAvailbility) {
    textCTA = (
      <div className={classes['p-enquiry']}>
        Enquire with the organiser to join as a buddy or as a mentor
      </div>
    );
  } else if (buddyAvailbility && !mentorAvailbility) {
    textCTA = (
      <div className={classes['p-enquiry']}>
        Enquire with the organiser to join as a buddy
      </div>
    );
  } else if (!buddyAvailbility && mentorAvailbility) {
    textCTA = (
      <div className={classes['p-enquiry']}>
        Enquire with the organiser to join as a mentor
      </div>
    );
  } else if (!buddyAvailbility && !mentorAvailbility) {
    textCTA = (
      <div className={classes['p-enquiry-complete']}>Team complete</div>
    );
  }

  sectionCTA = (
    <>
      {textCTA}
      {!(!buddyAvailbility && !mentorAvailbility) && (
        <>
          {' '}
          <br></br>
          <div className="width-50">
            <BtnCTA
              classname="btn-dark"
              label="Message"
              onCLickAction={() => {}}
            />
          </div>
        </>
      )}
    </>
  );

  return (
    <div className={classes['box-0']}>
      <div className={classes['card-header']}>
        <div>
          Organised by:{' '}
          <Link href={`/people/coding-buddies/${group.organiser.username}`}>
            {group.organiser.username}
          </Link>
        </div>
        <div>
          <div className="card-img-container">
            <img
              className="card-img"
              src={
                group.organiser.profilePic &&
                group.organiser.profilePic.url &&
                group.organiser.profilePic.url !== ''
                  ? group.organiser.profilePic.url
                  : '/img/default-pic.png'
              }
            />
          </div>
        </div>
      </div>
      <br></br>
      {buddyAvailbilityMsg}
      <br></br>
      {mentorAvailbilityMsg}
      <br></br>
      {sectionCTA}
    </div>
  );
}

export default JoinTeamCTA;

// Hi Melani, I'm wondering if:
// You're still deciding / planning
// My last message made you change your mind from yes to no
// Your mind was always no
// You lost your phone
