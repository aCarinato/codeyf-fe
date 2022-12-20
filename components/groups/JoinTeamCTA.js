// react / next
import Link from 'next/link';
// own compoentns
import BtnCTA from '../UI/BtnCTA';
// styles
import classes from './JoinTeamCTA.module.css';

// if it is organsier there should be the organiser tab
// if not there should be this.

function JoinTeamCTA(props) {
  const {
    group,
    buddyAvailbility,
    buddyAvailbilityMsg,
    mentorAvailbility,
    mentorAvailbilityMsg,
    addChat,
  } = props;

  let textCTA = '';
  let sectionCTA;

  if (buddyAvailbility && mentorAvailbility) {
    textCTA = (
      <div className={classes['p-enquiry']}>
        Enquire with the organiser to join the team
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
  }
  // else if (!buddyAvailbility && !mentorAvailbility) { // i should consider if the user is already in the group
  //   textCTA = (
  //     <div className={classes['p-enquiry-complete']}>Team complete</div>
  //   );
  // }

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
              onCLickAction={addChat}
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
      {buddyAvailbilityMsg}
      {mentorAvailbilityMsg}
      {sectionCTA}
    </div>
  );
}

export default JoinTeamCTA;
