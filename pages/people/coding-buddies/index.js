import { people } from '../../../data/people';
import { allLearning } from '../../../data/allLearning';
import { allSkills } from '../../../data/allSkills';
// own functions
import { arrayEquals } from '../../../lib/helper/functions';
// own components
import BtnCTA from '../../../components/UI/BtnCTA';
import BuddyCard from '../../../components/people/BuddyCard';
import BuddyFilter from '../../../components/people/BuddyFilter';
import BuddyFilterMobile from '../../../components/people/mobile-filters/BuddyFilterMobile';
import { Fragment, useEffect, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';

function CodingBuddiesScreen() {
  const { mobileView } = useMainContext();
  const buddies = people.filter((buddy) => buddy.isBuddy);
  const [filteredBuddies, setFilteredBuddies] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // FILTER
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  //   tech stack
  const [learning, setLearning] = useState([]);
  const [skills, setSkills] = useState([]);

  // MOBILE FILTER
  const [learningCheckedIndex, setLearningCheckedIndex] = useState([]);
  const [learningCheckedNames, setLearningCheckedNames] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);
  const [skillsCheckedNames, setSkillsCheckedNames] = useState([]);

  // console.log(learningChecked);
  useEffect(() => {
    setFilteredBuddies(buddies);
  }, []);

  useEffect(() => {
    // THESE FUNCTIONS ARE USED TO MAP THE INDEXES TO THE NAMES
    let currentLearning;
    currentLearning = allLearning.filter((learn) =>
      learningCheckedIndex.includes(learn.id)
    );
    let currentLearningNames;
    currentLearningNames = currentLearning.map((item) => item.name);
    // console.log(currentLearningNames);
    setLearningCheckedNames(currentLearningNames);

    let currentSkills;
    currentSkills = allSkills.filter((skill) =>
      skillsCheckedIndex.includes(skill.id)
    );
    let currentSkillsNames;
    currentSkillsNames = currentSkills.map((skill) => skill.name);
    // console.log(currentLearningNames);
    setSkillsCheckedNames(currentSkillsNames);
  }, [learningCheckedIndex, skillsCheckedIndex]);

  const filterBuddies = () => {
    let remainingBuddies;
    remainingBuddies = buddies.filter((buddy) => {
      // filter on country
      let countryCondition;
      if (country === 'all') {
        countryCondition = buddy.country !== '';
      } else {
        countryCondition = buddy.country === country;
      }

      // filter on language
      let languageCondition;
      if (language === 'all') {
        languageCondition = buddy.languages !== [];
      } else {
        languageCondition = buddy.languages.includes(language);
      }

      //   filter learning
      let learningCondition;
      learningCondition = buddy.learning.filter((learn) =>
        learningCheckedNames.includes(learn)
      );

      if (arrayEquals(learningCheckedNames, [])) {
        learningCondition = true;
      } else if (!arrayEquals(learningCondition, [])) {
        learningCondition = true;
      } else {
        learningCondition = false;
      }

      // filter skills
      let skillsCondition;
      skillsCondition = buddy.skills.filter((skill) =>
        skillsCheckedNames.includes(skill)
      );

      if (arrayEquals(skillsCheckedNames, [])) {
        skillsCondition = true;
      } else if (!arrayEquals(skillsCondition, [])) {
        skillsCondition = true;
      } else {
        skillsCondition = false;
      }

      return (
        countryCondition &&
        languageCondition &&
        learningCondition &&
        skillsCondition
      );
    });
    // console.log(remainingBuddies);
    setFilteredBuddies(remainingBuddies);
  };

  return (
    <Fragment>
      <div>
        <h1>Coding Buddies</h1>
        <h4 className="h4-header">
          Friendly learners on their way to coding mastery
        </h4>
        <br></br>
      </div>
      <br></br>
      {showFilter && (
        <BuddyFilterMobile
          country={country}
          setCountry={setCountry}
          language={language}
          setLanguage={setLanguage}
          learningCheckedIndex={learningCheckedIndex}
          setLearningCheckedIndex={setLearningCheckedIndex}
          learningCheckedNames={learningCheckedNames}
          setLearningCheckedNames={setLearningCheckedNames}
          skillsCheckedIndex={skillsCheckedIndex}
          setSkillsCheckedIndex={setSkillsCheckedIndex}
          filterBuddies={filterBuddies}
          onClose={() => setShowFilter(false)}
        />
      )}
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && (
          <div>
            <BuddyFilter
              country={country}
              setCountry={setCountry}
              language={language}
              setLanguage={setLanguage}
              learning={learning}
              setLearning={setLearning}
              skills={skills}
              setSkills={setSkills}
              buddies={buddies}
              setFilteredBuddies={setFilteredBuddies}
            />
          </div>
        )}

        <div className="flex">
          {mobileView && (
            <BtnCTA
              label="filter buddies"
              classname="btn-light-big"
              onCLickAction={() => setShowFilter(true)}
              icon={true}
              iconType="ci:filter-outline"
            />
          )}
          {filteredBuddies.map((buddy) => (
            <BuddyCard
              key={buddy.id}
              username={buddy.username}
              handle={buddy.handle}
              description={buddy.shortDescription}
              country={buddy.country}
              learning={buddy.learning}
            />
          ))}{' '}
          <div className="white-card"></div>
          <div className="white-card"></div>
          <div className="white-card"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default CodingBuddiesScreen;
