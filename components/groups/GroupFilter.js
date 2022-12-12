import { allNumbersOfParticipants } from '../../data/allNumbersOfParticipants';
import { allTechStacks } from '../../data/allTechStacks';
import { allTopics } from '../../data/allTopics';
import { allMentorWanted } from '../../data/allMentorWanted';

function GroupFilter(props) {
  const {
    mentorCheckedIndex,
    setMentorCheckedIndex,
    participantsCheckedIndex,
    setParticipantsCheckedIndex,
    stackCheckedIndex,
    setStackCheckedIndex,
    topicsCheckedIndex,
    setTopicsCheckedIndex,
  } = props;

  const toggleParticipants = (id) => {
    let currentIndex;
    currentIndex = participantsCheckedIndex.indexOf(id);
    const newCheckedIndex = [...participantsCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setParticipantsCheckedIndex(newCheckedIndex);
  };

  const toggleStack = (id) => {
    let currentIndex;
    currentIndex = stackCheckedIndex.indexOf(id);
    const newCheckedIndex = [...stackCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setStackCheckedIndex(newCheckedIndex);
  };

  const toggleTopics = (id) => {
    let currentIndex;
    currentIndex = topicsCheckedIndex.indexOf(id);
    const newCheckedIndex = [...topicsCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setTopicsCheckedIndex(newCheckedIndex);
  };

  const toggleMentorWanted = (value) => {
    let currentIndex;
    currentIndex = mentorCheckedIndex.indexOf(value);
    const newCheckedIndex = [...mentorCheckedIndex];
    // console.log(`currentIndex === -1: ${currentIndex === -1}`);
    if (currentIndex === -1) {
      newCheckedIndex.push(value);
    } else {
      //   const mentorIdx = allMentorWanted
      //     .map((item) => item.value)
      //     .indexOf(value);
      //   console.log(`mentorIdx: ${mentorIdx}`);
      newCheckedIndex.splice(currentIndex, 1);
      //   newCheckedIndex.splice(allMentorWanted[mentorIdx].value, 1);
    }

    setMentorCheckedIndex(newCheckedIndex);
  };

  return (
    <>
      <fieldset>
        <legend>Mentor wanted?</legend>
        {allMentorWanted.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              name={item.label}
              value={item.label}
              onChange={() => toggleMentorWanted(item.value)}
              checked={
                mentorCheckedIndex.indexOf(item.value) === -1 ? false : true
              }
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Max n. participants</legend>
        {allNumbersOfParticipants.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              name={item.value}
              value={item.value}
              onChange={() => toggleParticipants(item.id)}
              checked={
                participantsCheckedIndex.indexOf(item.id) === -1 ? false : true
              }
            />
            <label htmlFor={item.value}>{item.value}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Tech Stack</legend>
        {allTechStacks.map((item) => (
          <div key={item._id}>
            <input
              type="checkbox"
              name={item.value}
              value={item.label}
              onChange={() => toggleStack(item._id)}
              checked={
                stackCheckedIndex.indexOf(item._id) === -1 ? false : true
              }
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Topics</legend>
        {allTopics.map((item) => (
          <div key={item._id}>
            <input
              type="checkbox"
              name={item.label}
              value={item.label}
              onChange={() => toggleTopics(item._id)}
              checked={
                topicsCheckedIndex.indexOf(item._id) === -1 ? false : true
              }
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </fieldset>
    </>
  );
}

export default GroupFilter;
