// next react
import { Fragment, useEffect, useState } from 'react';
// own components
import SpinningLoader from '../../../components/UI/SpinningLoader';
import MentorCard from '../../../components/people/MentorCard';
import MentorFilter from '../../../components/people/MentorFilter';
import MentorFilterMobile from '../../../components/people/MentorFilterMobile';
import BtnCTA from '../../../components/UI/BtnCTA';
// own functions
import { filterMentors } from '../../../lib/helper/mentors/filterMentors';
// context
import { useMainContext } from '../../../context/Context';
// packages
import axios from 'axios';

function MentorsPage() {
  const { mobileView } = useMainContext();
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  const [teachingCheckedIndex, setTeachingCheckedIndex] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/mentors`
      );
      //   console.log(res.data);
      if (res.data.success) {
        setMentors(res.data.mentors);
        setFilteredMentors(res.data.mentors);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    if (!mobileView) {
      filterMentors(
        mentors,
        country,
        language,
        teachingCheckedIndex,
        skillsCheckedIndex,
        setFilteredMentors
      );
    }
  }, [country, language, teachingCheckedIndex, skillsCheckedIndex]);

  const mobileFilterMentors = () => {
    filterMentors(
      mentors,
      country,
      language,
      teachingCheckedIndex,
      skillsCheckedIndex,
      setFilteredMentors
    );
  };

  return (
    <Fragment>
      {loading ? (
        <SpinningLoader />
      ) : (
        <Fragment>
          <div>
            <h1>Coding Mentors</h1>
            <h4 className="h4-header">
              Experienced developers willing to help
            </h4>
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
              skillsCheckedIndex={skillsCheckedIndex}
              setSkillsCheckedIndex={setSkillsCheckedIndex}
              filterMentors={mobileFilterMentors}
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
                  teachingCheckedIndex={teachingCheckedIndex}
                  setTeachingCheckedIndex={setTeachingCheckedIndex}
                  skillsCheckedIndex={skillsCheckedIndex}
                  setSkillsCheckedIndex={setSkillsCheckedIndex}
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
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor._id}
                    username={mentor.username}
                    handle={mentor.handle}
                    description={mentor.shortDescription}
                    country={mentor.country}
                    teaching={mentor.teaching}
                    profilePic={mentor.profilePic}
                  />
                ))
              ) : (
                <p>
                  No mentors found for the filters applied. Please select
                  different search parameters.
                </p>
              )}{' '}
              <div className="white-card"></div>
              <div className="white-card"></div>
              <div className="white-card"></div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default MentorsPage;
