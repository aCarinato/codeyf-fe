import { countries } from '../../../data/countries';
import { allTeaching } from '../../../data/allTeaching';
import { allSkills } from '../../../data/allSkills';

function MentorFilterMobileOptions(props) {
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

  const handleToggleTeaching = (id) => {
    // id
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

  const handleToggleSkills = (id) => {
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
    <div>
      <div className="filter-select-container">
        <div>
          <label htmlFor="country">COUNTRY</label>
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
      <div className="filter-select-container">
        <div>
          <label htmlFor="language">LANGUAGE</label>
        </div>
        <select
          name="language"
          id="language"
          onChange={(e) => setLanguage(e.target.value)}
          defaultValue={language}
        >
          <option value="all">All</option>
          <option value="en">English</option>
          <option value="it">Italian</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <br></br>
      <fieldset>
        <legend>AVAILABLE TO TEACH</legend>
        {allTeaching.map((teach) => (
          <div key={teach.id}>
            <input
              //   onChange={selectLearning}
              onChange={() => {
                handleToggleTeaching(teach.id);
              }}
              type="checkbox"
              checked={
                teachingCheckedIndex.indexOf(teach.id) === -1 ? false : true
              }
              id={teach.name}
              name={teach.name}
              value={teach.name}
            />
            <label htmlFor={teach.name}> {teach.name}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>SKILLS</legend>
        {allSkills.map((skill) => (
          <div key={skill.id}>
            <input
              //   onChange={selectSkills}
              onChange={() => handleToggleSkills(skill.id)}
              type="checkbox"
              checked={
                skillsCheckedIndex.indexOf(skill.id) === -1 ? false : true
              }
              name={skill.name}
              value={skill.name}
            />
            <label htmlFor={skill.name}> {skill.name}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
    </div>
  );
}

export default MentorFilterMobileOptions;
