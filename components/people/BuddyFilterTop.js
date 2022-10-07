import { allTechStacks } from '../../data/allTechStacks';
import { allSkillsLevel } from '../../data/allSkillsLevel';

function BuddyFilterTop(props) {
  const {
    learningCheckedIndex,
    setLearningCheckedIndex,
    skillsCheckedIndex,
    setSkillsCheckedIndex,
  } = props;

  //   TOGGLE FUNCTIONS: used to store the indices of the select options

  //   difficulty
  const toggleLearning = (id) => {
    let currentIndex;
    currentIndex = learningCheckedIndex.indexOf(id);
    const newCheckedIndex = [...learningCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setLearningCheckedIndex(newCheckedIndex);
  };

  const toggleSkills = (id) => {
    let currentIndex;
    currentIndex = skillsCheckedIndex.indexOf(id);
    const newCheckedIndex = [...skillsCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setSkillsCheckedIndex(newCheckedIndex);
  };

  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <fieldset>
        <legend>WANTS TO LEARN</legend>
        {allTechStacks.map((learn) => (
          <div key={learn._id}>
            <input
              //   onChange={selectLearning}
              onChange={() => toggleLearning(learn._id)}
              checked={
                learningCheckedIndex.indexOf(learn._id) === -1 ? false : true
              }
              type="checkbox"
              id={learn._id}
              name={learn.label}
              value={learn.label}
            />
            <label htmlFor={learn.label}> {learn.label}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>SKILLS</legend>
        {allSkillsLevel.map((skill) => (
          <div key={skill._id}>
            <input
              onChange={() => toggleSkills(skill._id)}
              checked={
                skillsCheckedIndex.indexOf(skill._id) === -1 ? false : true
              }
              type="checkbox"
              name={skill.label}
              value={skill.label}
            />
            <label htmlFor={skill.label}> {skill.label}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default BuddyFilterTop;
