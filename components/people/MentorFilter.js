import { allTechStacks } from '../../data/allTechStacks';
import { allSkillsLevel } from '../../data/allSkillsLevel';
import { countries } from '../../data/countries';
import { allLanguages } from '../../data/allLanguages';

function MentorFilter(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    teachingCheckedIndex,
    setTeachingCheckedIndex,
    skillsCheckedIndex,
    setSkillsCheckedIndex,
  } = props;

  //   TOGGLE FUNCTIONS: used to store the indices of the select options

  const toggleTeaching = (id) => {
    let currentIndex;
    currentIndex = teachingCheckedIndex.indexOf(id);
    const newCheckedIndex = [...teachingCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setTeachingCheckedIndex(newCheckedIndex);
  };

  // const toggleSkills = (id) => {
  //   let currentIndex;
  //   currentIndex = skillsCheckedIndex.indexOf(id);
  //   const newCheckedIndex = [...skillsCheckedIndex];

  //   if (currentIndex === -1) {
  //     newCheckedIndex.push(id);
  //   } else {
  //     newCheckedIndex.splice(currentIndex, 1);
  //   }

  //   setSkillsCheckedIndex(newCheckedIndex);
  // };

  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <div className="filter-select-container">
        <br></br>
        <div>
          <label className="bold" htmlFor="country">
            COUNTRY
          </label>
        </div>
        <div>
          <select
            name="countries"
            id="countries"
            onChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
          >
            <option value="all">All</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br></br>
      <div className="filter-select-container">
        <div>
          <label className="bold" htmlFor="country">
            LANGUAGE
          </label>
        </div>
        <div>
          <select
            name="countries"
            id="countries"
            onChange={(e) => setLanguage(e.target.value)}
            defaultValue={language}
          >
            <option value="all">All</option>
            {allLanguages.map((lang) => (
              <option key={lang._id} value={lang._id}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br></br>
      <fieldset>
        <legend>AVAILABLE TO TEACH</legend>
        {allTechStacks.map((learn) => (
          <div key={learn._id}>
            <input
              //   onChange={selectLearning}
              onChange={() => toggleTeaching(learn._id)}
              checked={
                teachingCheckedIndex.indexOf(learn._id) === -1 ? false : true
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
      {/* <fieldset>
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
      </fieldset> */}
    </div>
  );
}

export default MentorFilter;
