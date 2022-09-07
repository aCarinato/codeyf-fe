import classes from './MySlider.module.css';
import BuddyCard from '../people/BuddyCard';
import GroupCard from '../groups/GroupCard';
import MentorCard from '../people/MentorCard';
import AssignementCard from '../assignements/AssignementCard';

function MySlider(props) {
  const { array, type } = props;
  let items;
  if (type === 'buddy') {
    items = array.filter((item) => item.isBuddy);
  }

  if (type === 'mentor') {
    items = array.filter((item) => item.isMentor);
  }

  if (type === 'group') {
    items = array;
  }

  if (type === 'assignement') {
    items = array;
  }

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
            key={item.id}
            username={item.username}
            description={item.shortDescription}
            country={item.country}
            learning={item.learning}
          />
        ))}
      {type === 'mentor' &&
        slicedItems.map((item) => (
          <MentorCard
            key={item.id}
            username={item.username}
            description={item.shortDescription}
            country={item.country}
            teaching={item.teaching}
          />
        ))}
      {type === 'group' &&
        slicedItems.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.name}
            description={group.description}
            techStack={group.learning}
            nBuddies={group.nBuddies}
            buddies={group.buddies}
            proposedProject={group.proposedProject}
          />
        ))}
      {type === 'assignement' &&
        slicedItems.map((assignement) => (
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
        ))}
    </div>
  );
}

export default MySlider;
