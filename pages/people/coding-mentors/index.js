import { people } from '../../../data/people';
import { allTeaching } from '../../../data/allTeaching';
import { allSkills } from '../../../data/allSkills';
// own functions
import { arrayEquals, funcFilterMentors } from '../../../lib/helper/functions';
// own components
import MentorCard from '../../../components/people/MentorCard';
import MentorFilter from '../../../components/people/MentorFilter';
import BtnCTA from '../../../components/UI/BtnCTA';
import MentorFilterMobile from '../../../components/people/mobile-filters/MentorFilterMobile';
// react
import { Fragment, useEffect, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';

function CodingMentorsScreen() {
  const { mobileView } = useMainContext();
  const mentors = people.filter((person) => person.isMentor);

  const [filteredMentors, setFilteredMentors] = useState([]);
  // FILTER
  const [showFilter, setShowFilter] = useState(false);
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  //   tech stack
  const [teaching, setTeaching] = useState([]);
  const [skills, setSkills] = useState([]);

  // MOBILE FILTER
  const [teachingCheckedIndex, setTeachingCheckedIndex] = useState([]);
  const [teachingCheckedNames, setTeachingCheckedNames] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);
  const [skillsCheckedNames, setSkillsCheckedNames] = useState([]);

  useEffect(() => {
    // setPeople(people);
    setFilteredMentors(mentors);
  }, []);

  useEffect(() => {
    // THESE FUNCTIONS ARE USED TO MAP THE INDEXES TO THE NAMES
    // teaching
    let currentTeaching;
    currentTeaching = allTeaching.filter((learn) =>
      teachingCheckedIndex.includes(learn.id)
    );
    let currentTeachingNames;
    currentTeachingNames = currentTeaching.map((item) => item.name);
    // console.log(currentLearningNames);
    setTeachingCheckedNames(currentTeachingNames);

    // skills
    let currentSkills;
    currentSkills = allSkills.filter((skill) =>
      skillsCheckedIndex.includes(skill.id)
    );
    let currentSkillsNames;
    currentSkillsNames = currentSkills.map((skill) => skill.name);
    // console.log(currentLearningNames);
    setSkillsCheckedNames(currentSkillsNames);
  }, [teachingCheckedIndex, skillsCheckedIndex]);

  const filterMentors = () => {
    funcFilterMentors(
      mentors,
      country,
      language,
      teachingCheckedNames,
      skillsCheckedNames,
      setFilteredMentors
    );
  };

  return (
    <Fragment>
      <div>
        <h1>Coding Mentors</h1>
        <h4 className="h4-header">Experienced developers willing to help</h4>
        <br></br>
      </div>
      <br></br>
      {showFilter && (
        <MentorFilterMobile
          country={country}
          setCountry={setCountry}
          language={language}
          setLanguage={setLanguage}
          teachingCheckedIndex={teachingCheckedIndex}
          setTeachingCheckedIndex={setTeachingCheckedIndex}
          teachingCheckedNames={teachingCheckedNames}
          setTeachingCheckedNames={setTeachingCheckedNames}
          skillsCheckedIndex={skillsCheckedIndex}
          setSkillsCheckedIndex={setSkillsCheckedIndex}
          filterMentors={filterMentors}
          onClose={() => setShowFilter(false)}
        />
      )}
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && (
          <div>
            <MentorFilter
              country={country}
              setCountry={setCountry}
              language={language}
              setLanguage={setLanguage}
              learning={teaching}
              setLearning={setTeaching}
              skills={skills}
              setSkills={setSkills}
              buddies={mentors}
              setFilteredBuddies={setFilteredMentors}
            />
          </div>
        )}
        <div className="flex">
          {mobileView && (
            <BtnCTA
              label="filter mentors"
              classname="btn-light-big"
              onCLickAction={() => setShowFilter(true)}
              icon={true}
              iconType="ci:filter-outline"
            />
          )}
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              username={mentor.username}
              handle={mentor.handle}
              description={mentor.shortDescription}
              country={mentor.country}
              teaching={mentor.teaching}
            />
          ))}
          <div className="white-card"></div>
          <div className="white-card"></div>
          <div className="white-card"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default CodingMentorsScreen;
