// next/react
import { Fragment } from 'react';

function AssignementFilter(props) {
  const {
    allDifficulty,
    difficultyCheckedIndex,
    setDifficultyCheckedIndex,
    allParticipants,
    participantsCheckedIndex,
    setParticipantsCheckedIndex,
    allStack,
    stackCheckedIndex,
    setStackCheckedIndex,
  } = props;

  const toggleDifficulty = (id) => {
    let currentIndex;
    currentIndex = difficultyCheckedIndex.indexOf(id);
    const newCheckedIndex = [...difficultyCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setDifficultyCheckedIndex(newCheckedIndex);
  };

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

  return (
    <Fragment>
      <fieldset>
        <legend>Difficulty</legend>
        {allDifficulty.map((item) => (
          <div key={item._id}>
            <input
              type="checkbox"
              name={item.value}
              value={item.label}
              onChange={() => toggleDifficulty(item._id)}
              checked={
                difficultyCheckedIndex.indexOf(item._id) === -1 ? false : true
              }
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Max n. participants</legend>
        {allParticipants.map((item) => (
          <div key={item._id}>
            <input
              type="checkbox"
              name={item.value}
              value={item.label}
              onChange={() => toggleParticipants(item._id)}
              checked={
                participantsCheckedIndex.indexOf(item._id) === -1 ? false : true
              }
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Stack</legend>
        {allStack.map((item) => (
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
    </Fragment>
  );
}

export default AssignementFilter;
