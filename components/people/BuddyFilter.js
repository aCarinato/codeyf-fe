import { useEffect, useRef, useState } from 'react';
import { countries } from '../../data/countries';
// import { allSkills } from '../../data/allSkills';
import { allSkillsLevel } from '../../data/allSkillsLevel';
// import { allLearning } from '../../data/allLearning';
import { allTechStacks } from '../../data/allTechStacks';
import { allLanguages } from '../../data/allLanguages';
// functions
import { checkboxSelection, arrayEquals } from '../../lib/helper/functions';

function BuddyFilter(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    learning,
    setLearning,
    skills,
    setSkills,
    buddies,
    setFilteredBuddies,
  } = props;

  const allLearningNames = allTechStacks.map((learning) => learning.label);
  const allSkillsNames = allSkillsLevel.map((skill) => skill.label);

  useEffect(() => {
    // console.log('***************************************');
    let remainingBuddies;
    remainingBuddies = buddies.filter((buddy) => {
      // filter on country
      let countryCondition;
      if (country === 'all') {
        countryCondition = buddy.country !== '';
      } else {
        countryCondition = buddy.country === country;
      }
      //   console.log('--------------');
      //   console.log(buddy.name + ' country ' + countryCondition);

      // filter on language
      let languageCondition;
      if (language === 'all') {
        languageCondition = buddy.languages !== [];
      } else {
        let langCodes = buddy.languages.map((lang) => lang.code);
        languageCondition = langCodes.includes(language);
      }
      //   console.log(buddy.name + ' language ' + languageCondition);

      //   filter learning
      let learningCondition;
      //   console.log(learning);
      let learningLabels = buddy.learning.map((item) => item.label);
      learningCondition = learningLabels.filter((learn) =>
        learning.includes(learn)
      );

      if (arrayEquals(learning, [])) {
        learningCondition = true;
      } else if (!arrayEquals(learningCondition, [])) {
        learningCondition = true;
      } else {
        learningCondition = false;
      }
      //   console.log(buddy.name + ' learn ' + learningCondition);

      //   filter skills
      let skillsCondition;
      let skillsLabels = buddy.skillsLevel.map((item) => item.label);
      skillsCondition = skillsLabels.filter((skill) => skills.includes(skill));

      if (arrayEquals(skills, [])) {
        skillsCondition = true;
      } else if (!arrayEquals(skillsCondition, [])) {
        skillsCondition = true;
      } else {
        skillsCondition = false;
      }

      //   console.log(buddy.name + ' skill ' + skillsCondition);

      //   console.log(
      //     buddy.name +
      //       ' country&language&learning&skill ' +
      //       (countryCondition &&
      //         languageCondition &&
      //         skillsCondition &&
      //         learningCondition)
      //   );
      //   console.log('--------------');

      return (
        countryCondition &&
        languageCondition &&
        learningCondition &&
        skillsCondition
      );
    });

    setFilteredBuddies(remainingBuddies);
  }, [country, language, learning, skills]);

  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <div className="filter-select-container">
        <div>
          <label htmlFor="country">COUNTRY</label>
        </div>
        <div>
          <select
            name="countries"
            id="countries"
            onChange={(e) => setCountry(e.target.value)}
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
              onChange={(e) =>
                checkboxSelection(e, learning, setLearning, allLearningNames)
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
              //   onChange={selectSkills}
              onChange={(e) =>
                checkboxSelection(e, skills, setSkills, allSkillsNames)
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

export default BuddyFilter;
