import { countries } from '../../../data/countries';
// import { allLearning } from '../../../data/allLearning';
import { allSkills } from '../../../data/allSkills';
import { allLanguages } from '../../../data/allLanguages';
import { allTechStacks } from '../../../data/allTechStacks';
import { allSkillsLevel } from '../../../data/allSkillsLevel';

function BuddyFilterMobileOptions(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    learningCheckedIndex,
    setLearningCheckedIndex,
    // learningCheckedNames,
    // setLearningCheckedNames,
    skillsCheckedIndex,
    setSkillsCheckedIndex,
  } = props;
  //   const [learningChecked, setLearningChecked] = useState([]);

  const handleToggleLearning = (id) => {
    // id
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
      {/* <div>{JSON.stringify(learningCheckedNames)}</div> */}
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

          {allLanguages.map((lang) => (
            <option key={lang._id} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <fieldset>
        <legend>WANTS TO LEARN</legend>
        {allTechStacks.map((learn) => (
          <div key={learn._id}>
            <input
              //   onChange={selectLearning}
              onChange={() => {
                handleToggleLearning(learn._id);
              }}
              type="checkbox"
              checked={
                learningCheckedIndex.indexOf(learn._id) === -1 ? false : true
              }
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
              //   onChange={selectSkills}
              onChange={() => handleToggleSkills(skill.id)}
              type="checkbox"
              checked={
                skillsCheckedIndex.indexOf(skill.id) === -1 ? false : true
              }
              name={skill.label}
              value={skill.label}
            />
            <label htmlFor={skill.label}> {skill.label}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
    </div>
  );
}

export default BuddyFilterMobileOptions;
