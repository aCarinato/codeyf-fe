import { useEffect, useState } from 'react';
import { countries } from '../../data/countries';
import { allSkills } from '../../data/allSkills';
import { allLearning } from '../../data/allLearning';
// functions
import { checkboxSelection, arrayEquals } from '../../lib/helper/functions';

function BuddyFilter(props) {
  const { buddies, setFilteredBuddies } = props;

  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  //   tech stack
  const [learning, setLearning] = useState([]);
  const [skills, setSkills] = useState([]);

  const allLearningNames = allLearning.map((learning) => learning.name);
  const allSkillsNames = allSkills.map((skill) => skill.name);

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
        languageCondition = buddy.language !== [];
      } else {
        languageCondition = buddy.languages.includes(language);
      }
      //   console.log(buddy.name + ' language ' + languageCondition);

      //   filter learning
      let learningCondition;
      //   console.log(learning);
      learningCondition = buddy.learning.filter((learn) =>
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
      skillsCondition = buddy.skills.filter((skill) => skills.includes(skill));

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
    <div>
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
          <option value="en">English</option>
          <option value="it">Italian</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <br></br>
      <fieldset>
        <legend>WANTS TO LEARN</legend>
        {allLearning.map((learn) => (
          <div key={learn.id}>
            <input
              //   onChange={selectLearning}
              onChange={(e) =>
                checkboxSelection(e, learning, setLearning, allLearningNames)
              }
              type="checkbox"
              id={learn.name}
              name={learn.name}
              value={learn.name}
            />
            <label htmlFor={learn.name}> {learn.name}</label>
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
              onChange={(e) =>
                checkboxSelection(e, skills, setSkills, allSkillsNames)
              }
              type="checkbox"
              name={skill.name}
              value={skill.name}
            />
            <label htmlFor={skill.name}> {skill.name}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default BuddyFilter;

//   const selectLearning = (e) => {
//     let currentLearningSelection = [];

//     currentLearningSelection = learning.slice();

//     if (arrayEquals(currentLearningSelection, [])) {
//       currentLearningSelection.push(e.target.value);
//       setLearning(currentLearningSelection);
//     } else if (arrayEquals(currentLearningSelection, allLearningNames)) {
//       currentLearningSelection = [];
//       currentLearningSelection.push(e.target.value);
//       setLearning(currentLearningSelection);
//     } else {
//       if (currentLearningSelection.includes(e.target.value)) {
//         const index = currentLearningSelection.indexOf(e.target.value);
//         currentLearningSelection.splice(index, 1);
//         if (arrayEquals(currentLearningSelection, [])) {
//           setLearning(allLearningNames);
//         } else {
//           setLearning(currentLearningSelection);
//         }
//       } else {
//         currentLearningSelection.push(e.target.value);
//         setLearning(currentLearningSelection);
//       }
//     }
//   };

//   const selectSkills = (e) => {
//     let currentSkillsSelection = [];
//     currentSkillsSelection = skills.slice();

//     if (arrayEquals(currentSkillsSelection, [])) {
//       currentSkillsSelection.push(e.target.value);
//       setSkills(currentSkillsSelection);
//     } else if (arrayEquals(currentSkillsSelection, allSkillsNames)) {
//       currentSkillsSelection = [];
//       currentSkillsSelection.push(e.target.value);
//       setSkills(currentSkillsSelection);
//     } else {
//       if (currentSkillsSelection.includes(e.target.value)) {
//         const index = currentSkillsSelection.indexOf(e.target.value);
//         currentSkillsSelection.splice(index, 1);
//         if (arrayEquals(currentSkillsSelection, [])) {
//           setSkills(allSkillsNames);
//         } else {
//           setSkills(currentSkillsSelection);
//         }
//       } else {
//         currentSkillsSelection.push(e.target.value);
//         setSkills(currentSkillsSelection);
//       }
//     }
//   };
