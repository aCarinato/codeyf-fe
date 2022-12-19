// next react
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// own functions
import { filterBuddies } from '../../../lib/helper/buddies/filterFunctions';
// own components
import BtnCTA from '../../../components/UI/BtnCTA';
import BuddyCard from '../../../components/people/BuddyCard';
import SpinningLoader from '../../../components/UI/SpinningLoader';
import BuddyFilter from '../../../components/people/BuddyFilter';
import BuddyFilterMobile from '../../../components/people/BuddyFilterMobile';
// import MessageForm from '../../../components/message/MessageForm';
// context
import { useMainContext } from '../../../context/Context';
// packages
import axios from 'axios';

function CodingBuddiesScreen() {
  const { mobileView, authState, socket } = useMainContext();

  const router = useRouter();

  const [buddies, setBuddies] = useState([]);
  const [filteredBuddies, setFilteredBuddies] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  const [learningCheckedIndex, setLearningCheckedIndex] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);

  // MESSAGING
  // const [showMsgForm, setShowMsgForm] = useState(false);
  // const [message, setMessage] = useState('');
  // const [recipient, setRecipient] = useState('');
  // const [successMsg, setSuccessMsg] = useState(false);

  const fetchBuddies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/buddies`
      );

      if (res.data.success) {
        if (authState && authState.email.length > 0) {
          // filter out current user
          const userEmail = authState.email;
          let allBuddies = res.data.buddies;
          let filteredBuddies = allBuddies.filter(
            (buddy) => buddy.email !== userEmail
          );
          setBuddies(filteredBuddies);
          setFilteredBuddies(filteredBuddies);
        } else {
          setBuddies(res.data.buddies);
          setFilteredBuddies(res.data.buddies);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuddies();
  }, [authState && authState.email]);

  useEffect(() => {
    if (!mobileView) {
      filterBuddies(
        buddies,
        country,
        language,
        learningCheckedIndex,
        skillsCheckedIndex,
        setFilteredBuddies
      );
    }
  }, [country, language, learningCheckedIndex, skillsCheckedIndex]);

  const mobileFilterBuddies = () => {
    filterBuddies(
      buddies,
      country,
      language,
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
            <BuddyFilterMobile
              country={country}
              setCountry={setCountry}
              language={language}
              setLanguage={setLanguage}
              learningCheckedIndex={learningCheckedIndex}
              setLearningCheckedIndex={setLearningCheckedIndex}
              skillsCheckedIndex={skillsCheckedIndex}
              setSkillsCheckedIndex={setSkillsCheckedIndex}
              filterBuddies={mobileFilterBuddies}
              onClose={() => setShowFilter(false)}
            />
          )}
          <div className={mobileView ? 'grid' : `grid grid---2cols-20-80`}>
            {!mobileView && (
              <div>
                <BuddyFilter
                  country={country}
                  setCountry={setCountry}
                  language={language}
                  setLanguage={setLanguage}
                  learningCheckedIndex={learningCheckedIndex}
                  setLearningCheckedIndex={setLearningCheckedIndex}
                  skillsCheckedIndex={skillsCheckedIndex}
                  setSkillsCheckedIndex={setSkillsCheckedIndex}
                />
              </div>
            )}
            <div>
              {authState && authState.token.length === 0 && (
                <div
                  className={
                    mobileView
                      ? 'flex flex-justify-center'
                      : 'flex flex-justify-space-between'
                  }
                >
                  {!mobileView && <div></div>}
                  <BtnCTA
                    label="Create Profile"
                    classname="btn-dark"
                    onCLickAction={() => router.push('/login')}
                  />
                </div>
              )}
              <div className="flex gap-12 padding-12rem">
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
                      userId={buddy._id}
                      username={buddy.username}
                      handle={buddy.handle}
                      description={buddy.shortDescription}
                      country={buddy.country}
                      learning={buddy.learning}
                      profilePic={buddy.profilePic}
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
          </div>
          {/* {showMsgForm && (
            <MessageForm
              onClose={closeModal}
              setShowMsgForm={setShowMsgForm}
              message={message}
              setMessage={setMessage}
              setRecipient={setRecipient}
              handleStartConversation={handleStartConversation}
              successMsg={successMsg}
            />
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
}

export default CodingBuddiesScreen;
