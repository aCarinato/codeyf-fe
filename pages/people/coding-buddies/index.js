// next react
import { Fragment, useEffect, useState } from 'react';
// own functions
import { filterBuddies } from '../../../lib/helper/buddies/filterFunctions';
// own components
import BtnCTA from '../../../components/UI/BtnCTA';
import BuddyCard from '../../../components/people/BuddyCard';
import SpinningLoader from '../../../components/UI/SpinningLoader';
import BuddyFilterTop from '../../../components/people/BuddyFilterTop';
import BuddyFilterMobileTop from '../../../components/people/BuddyFilterMobileTop';
// context
import { useMainContext } from '../../../context/Context';
// packages
import axios from 'axios';

function CodingBuddiesScreen() {
  const { mobileView } = useMainContext();
  // const buddies = people.filter((buddy) => buddy.isBuddy);
  const [buddies, setBuddies] = useState([]);
  const [filteredBuddies, setFilteredBuddies] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  //   tech stack
  const [learning, setLearning] = useState([]);
  const [skills, setSkills] = useState([]);

  // MOBILE FILTER
  const [learningCheckedIndex, setLearningCheckedIndex] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);

  const fetchBuddies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/buddies`
      );
      // console.log(res.data);
      if (res.data.success) {
        // console.log('LI GHEMOOO');
        setBuddies(res.data.buddies);
        setFilteredBuddies(res.data.buddies);
        // setFilteredBuddies(res.data.buddies);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  useEffect(() => {
    if (!mobileView) {
      filterBuddies(
        buddies,
        learningCheckedIndex,
        skillsCheckedIndex,
        setFilteredBuddies
      );
    }
  }, [learningCheckedIndex, skillsCheckedIndex]);

  const mobileFilterBuddies = () => {
    filterBuddies(
      buddies,
      learningCheckedIndex,
      skillsCheckedIndex,
      setFilteredBuddies
    );
  };

  return (
    <Fragment>
      {loading ? (
        <SpinningLoader />
      ) : (
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
            <BuddyFilterMobileTop
              learningCheckedIndex={learningCheckedIndex}
              setLearningCheckedIndex={setLearningCheckedIndex}
              skillsCheckedIndex={skillsCheckedIndex}
              setSkillsCheckedIndex={setSkillsCheckedIndex}
              filterBuddies={mobileFilterBuddies}
              onClose={() => setShowFilter(false)}
            />
          )}
          <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
            {!mobileView && (
              <div>
                <BuddyFilterTop
                  learningCheckedIndex={learningCheckedIndex}
                  setLearningCheckedIndex={setLearningCheckedIndex}
                  skillsCheckedIndex={skillsCheckedIndex}
                  setSkillsCheckedIndex={setSkillsCheckedIndex}
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
              {filteredBuddies.length > 0 ? (
                filteredBuddies.map((buddy) => (
                  <BuddyCard
                    key={buddy._id}
                    username={buddy.username}
                    handle={buddy.handle}
                    description={buddy.shortDescription}
                    country={buddy.country}
                    learning={buddy.learning}
                  />
                ))
              ) : (
                <p>
                  No buddies found for the filters applied. Please select
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

export default CodingBuddiesScreen;
