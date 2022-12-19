import classes from './MySlider.module.css';
import BuddyCard from '../people/BuddyCard';
import GroupCard from '../groups/GroupCard';
import MentorCard from '../people/MentorCard';
import AssignementCard from '../assignements/AssignementCard';
import IndividualCard from '../individual/IndividualCard';

function MySlider(props) {
  const { array, type, setShowMsgForm, setRecipient, setSuccessMsg } = props;
  let items;
  if (type === 'buddy') {
    items = array.filter((item) => item.isBuddy);
  }

  if (type === 'mentor') {
    items = array.filter((item) => item.isMentor);
  }

  if (
    type === 'group' ||
    type === 'assignement' ||
    type === 'mentee' ||
    type === 'mentoring'
  ) {
    items = array;
  }

  // if (type === 'assignement') {
  //   items = array;
  // }

  // if (type === 'mentee') {
  //   items = array;
  // }

  // if (type === 'mentor') {
  //   items = array;
  // }

  let slicedItems;

  if (items.length > 7) {
    slicedItems = items.slice(0, 7);
  } else {
    slicedItems = items;
  }

  return (
    <div className={classes.container}>
      {' '}
      {type === 'buddy' &&
        slicedItems.map((item) => (
          <BuddyCard
            key={item._id}
            userId={item._id}
            username={item.username}
            handle={item.handle}
            description={item.shortDescription}
            country={item.country}
            learning={item.learning}
            profilePic={item.profilePic}
            // setShowMsgForm={setShowMsgForm}
            // setRecipient={setRecipient}
            // setSuccessMsg={setSuccessMsg}
          />
        ))}
      {type === 'mentor' &&
        slicedItems.map((item) => (
          <MentorCard
            key={item._id}
            userId={item._id}
            username={item.username}
            handle={item.handle}
            description={item.shortDescription}
            country={item.country}
            teaching={item.teaching}
            profilePic={item.profilePic}
            // setShowMsgForm={setShowMsgForm}
            // setRecipient={setRecipient}
            // setSuccessMsg={setSuccessMsg}
          />
        ))}
      {type === 'group' &&
        slicedItems.map((group) => (
          <GroupCard
            key={group._id}
            group={group}
            // id={group._id}
            // name={group.name}
            // description={group.description}
            // techStack={group.learning}
            // nBuddies={group.nBuddies}
            // buddies={group.buddies}
            // proposedProject={group.proposedProject}
          />
        ))}
      {type === 'assignement' &&
        slicedItems.map((assignement) => (
          <AssignementCard
            key={assignement._id}
            id={assignement._id}
            title={assignement.name}
            description={assignement.headline}
            difficulty={assignement.difficulty}
            maxParticipants={assignement.maxTeamMemebers}
            stack={assignement.learning}
            picture={assignement.picture}
            reviews={assignement.reviews}
          />
        ))}
      {type === 'mentee' &&
        slicedItems.map((individual) => (
          <IndividualCard
            key={individual._id}
            group={individual}
            type="mentee"
          />
        ))}
      {type === 'mentoring' &&
        slicedItems.map((individual) => (
          <IndividualCard
            key={individual._id}
            group={individual}
            type="mentor"
          />
        ))}
    </div>
  );
}

export default MySlider;
