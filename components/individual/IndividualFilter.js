import { allTechStacks } from '../../data/allTechStacks';
import { allTopics } from '../../data/allTopics';

function IndividualFilter(props) {
  const {
    stackCheckedIndex,
    setStackCheckedIndex,
    topicsCheckedIndex,
    setTopicsCheckedIndex,
  } = props;

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

  return (
    <>
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

export default IndividualFilter;
