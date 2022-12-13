// next/react
import { Fragment } from 'react';
// own components
import { allDifficulty } from '../../data/assignements/allDifficulty';
import { allNumbersOfParticipants } from '../../data/allNumbersOfParticipants';
import { allTechStacks } from '../../data/allTechStacks';
import { allTopics } from '../../data/allTopics';

function AssignementFilter(props) {
  const {
    difficultyCheckedIndex,
    setDifficultyCheckedIndex,
    participantsCheckedIndex,
    setParticipantsCheckedIndex,
    stackCheckedIndex,
    setStackCheckedIndex,
    topicsCheckedIndex,
    setTopicsCheckedIndex,
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

  // console.log(topicsCheckedIndex);
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
              // onChange={() =>
              //   setTopicsCheckedIndex((prev) => {
              //     let currentIndex;
              //     currentIndex = prev.indexOf(item._id);
              //     // console.log(`currentIndex: ${currentIndex}`);
              //     if (currentIndex === -1) {
              //       return [...prev, item._id];
              //     } else {
              //       // let upd = prev.filter(
              //       //   (index) => index !== currentIndex.toString()
              //       // );
              //       // console.log(
              //       //   `prev.includes(currentIndex): ${prev.includes(
              //       //     currentIndex.toString()
              //       //   )}`
              //       // );
              //       return prev.filter(
              //         (index) => index !== currentIndex.toString()
              //       );
              //     }
              //   })
              // }
              checked={
                topicsCheckedIndex.indexOf(item._id) === -1 ? false : true
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
