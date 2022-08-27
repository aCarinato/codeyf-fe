import classes from './MySlider.module.css';
import BuddyCard from '../people/BuddyCard';
import GroupCard from '../groups/GroupCard';
import MentorCard from '../people/MentorCard';

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
        slicedItems.map((item) => (
          <GroupCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            techStack={item.learning}
            nBuddies={item.nBuddies}
            buddies={item.buddies}
            proposedProject={item.proposedProject}
          />
        ))}
    </div>
  );
}

export default MySlider;
